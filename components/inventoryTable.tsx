"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heading } from '@/components/heading';
import { SubHeading } from '@/components/subHeading';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Product {
    barcode: string;
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    category: string;
    inventory: {
        quantity: number;
        unit: string;
        total: number;
    };
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

const InventoryTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const productsPerPage = 10;
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/proxy?path=all/products');
            const data = await response.json();
            console.log(data)
            
            const formattedProducts = data.map((item: any) => ({
                id: item._id,
                name: item.name,
                price: `₦${item.price}`,
                imageUrl: item.mainImage,
                category: item.category,
                inventory: {
                    quantity: 0,
                    unit: "Pieces",
                    total: 0,
                },
            }));
            
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, quantity } } : product
            )
        );
    };

    const handleUnitChange = (id: string, unit: string) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, unit } } : product
            )
        );
    };

    const handleTotalChange = (id: string, total: number) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, inventory: { ...product.inventory, total } } : product
            )
        );
    };

    const handleRefresh = () => {
        fetchProducts();
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleDelete = async (productId: string) => {
        // Assuming you have the adminId stored somewhere, replace 'YOUR_ADMIN_ID' with the actual admin ID 

        if (status !== "authenticated" || !session?.user?._id) {
            console.error("User is not authenticated or user ID is missing");
            toast.error("Authentication error");
            return;
        }

        const adminId = session.user._id;       
        try {
            const response = await fetch(`/api/proxy?path=product/${adminId}/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the deleted product from the state
                setProducts(products.filter(product => product.id !== productId));
                toast.success("Product deleted successfully"); 
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Pagination logic
    const indexOfLastVendor = currentPage * productsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - productsPerPage;

    const { filteredOrders, displayedProducts, totalPages } = useMemo(() => {
        const filtered: Product[] = products.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const displayed: Product[] = filtered.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
        );
        const total = Math.ceil(filtered.length / productsPerPage);
        return { filteredOrders: filtered, displayedProducts: displayed, totalPages: total };
    }, [products, searchTerm, currentPage, productsPerPage]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = (currentPage: number, totalPages: number, maxVisible: number): (number | 'ellipsis')[] => {
        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - maxVisible + 1, 1);
        }

        const pages: (number | 'ellipsis')[] = Array.from({ length: end - start + 1 }, (_, i) => start + i);

        if (start > 1) {
            pages.unshift(1);
            if (start > 2) pages.splice(1, 0, 'ellipsis' as const);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('ellipsis' as const);
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div>
            <div className='flex items-center mb-4'>
                <div>
                    <Heading>Inventory</Heading>
                    <SubHeading className='flex items-center gap-1 mt-3'>
                        Category
                        <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                        Inventory
                    </SubHeading>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center my-4 md:mt-0">
                <h2 className="text-xl font-semibold">List Of All Products</h2>
                <div className="flex gap-2 items-center">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-64"
                    />
                    <h2 className="text-lg text-gray-400">Recently Update</h2>
                    <Icon icon="bx:refresh" className="cursor-pointer" onClick={handleRefresh} fontSize={24} />
                </div>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-center">Inventory</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className="flex items-center pr-6">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="mr-2 w-10 h-10"
                                        />
                                        <div>
                                            <p className="text-sm line-clamp-1 md:text-base">{product.name}</p>
                                            <span className="text-gray-400 line-clamp-1 text-xs">{product.category}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs md:text-base">{product.price}</TableCell>
                                <TableCell className="flex justify-center items-center gap-2">
                                    <div className="flex items-center border pr-2 rounded-md h-10">
                                        <Input
                                            type="number"
                                            value={product.inventory.quantity}
                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                            className="w-10 pr-0 border-none h-9 text-xs md:text-base"
                                        />
                                        <Select
                                            value={product.inventory.unit}
                                            onValueChange={(value: string) => handleUnitChange(product.id, value)}
                                        >
                                            <SelectTrigger className="w-20 border-none h-9 pr-0 text-xs md:text-base">
                                                <SelectValue>{product.inventory.unit}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pieces">Pieces</SelectItem>
                                                <SelectItem value="Bottles">Bottles</SelectItem>
                                                <SelectItem value="Cans">Cans</SelectItem>
                                                <SelectItem value="Kg">Kg</SelectItem>
                                                <SelectItem value="Grams">Grams</SelectItem>
                                                <SelectItem value="Tubes">Tubes</SelectItem>
                                                <SelectItem value="Cartons">Cartons</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-center border pr-2 rounded-md h-10">
                                        <Input
                                            type="number"
                                            value={product.inventory.total}
                                            onChange={(e) => handleTotalChange(product.id, parseInt(e.target.value))}
                                            className="w-10 pr-0 border-none h-9 text-xs md:text-base"
                                        />
                                        <span className="text-xs md:text-base">Total</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center justify-center">
                                        <Button
                                            onClick={() => router.push(`/dashboard/edit-product/${product.id}`)}
                                            className='bg-[#3B9BCE] text-xs md:text-base'
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(product.id)}
                                            className='bg-[#3B9BCE] text-xs md:text-base'
                                        >
                                            delete
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/dashboard/inventory/layer-with/${product.id}`)}
                                            className='bg-[#3B9BCE] text-xs md:text-base'
                                        >
                                            Layer With
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <div className="overflow-x-auto">
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                aria-disabled={currentPage === 1}
                            />
                        </PaginationItem>
                        {getPageNumbers(currentPage, totalPages, 5).map((page, index) => (
                            <PaginationItem key={index}>
                                {page === 'ellipsis' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink href="#" onClick={() => handlePageChange(page as number)}>
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                aria-disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default InventoryTable;
