"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Icon } from "@iconify/react";
import OrderStatistics from '@/components/orderStat';
import { Heading } from '@/components/heading';
import { SubHeading } from './subHeading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import Image from 'next/image';

interface Order {
    _id: string;
    code: string;
    name: string;
    email: string;
    date?: string; 
    total: number;
    status: string;
    items: Array<{
        _id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
    payment: boolean;
    item: number; 
    delivery: string;
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
    </div>
);

const OrderTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            if (session?.user?._id) {
                fetchOrders(session.user._id);
            } else {
                console.error("Session user ID is undefined");
                setIsLoading(false);
            }
        }
    }, [status, router, session]);

    const fetchOrders = async (adminId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/proxy?path=all/order/system&adminId=${adminId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            
            console.log('API Response:', data); // Debug: Log the entire response

            // Check if data is an array
            if (!Array.isArray(data)) {
                console.error('Expected an array of orders, but received:', typeof data);
                setOrders([]);
                return;
            }

            // Transform the data to match our Order interface
            const transformedOrders = data.map((order: any) => ({
                _id: order._id,
                code: order.code,
                name: order.name,
                email: order.email,
                date: new Date(order.date).toLocaleDateString(),
                total: order.total,
                status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
                items: order.items,
                payment: order.payment,
                item: order.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
                delivery: order.total > 100000 ? 'Free Shipping' : 'Paid Shipping'
            }));
            
            console.log('Transformed Orders:', transformedOrders); // Debug: Log the transformed orders
            
            setOrders(transformedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFilter]);

    const { filteredOrders, displayedOrders, totalPages } = useMemo(() => {
        let filtered: Order[] = orders.filter(order =>
            order.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedFilter && selectedFilter !== 'all') {
            filtered = filtered.filter(order => order.status === selectedFilter);
        }

        const displayed: Order[] = filtered.slice(
            (currentPage - 1) * ordersPerPage,
            currentPage * ordersPerPage
        );
        const total = Math.ceil(filtered.length / ordersPerPage);
        return { filteredOrders: filtered, displayedOrders: displayed, totalPages: total };
    }, [orders, searchTerm, currentPage, ordersPerPage, selectedFilter]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
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

    if (isLoading || status === "loading") {
        return <LoadingSpinner />;
    }
    
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    return (
        <div key={windowWidth}>
            <div className='flex justify-between items-center'>
                <div>
                    <Heading>Order</Heading>
                    <SubHeading className='flex items-center gap-1 mt-3'>
                        Category
                        <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                        Order
                    </SubHeading>
                </div>
                <div>
                    <Select onValueChange={(value) => setSelectedFilter(value)}>
                        <SelectTrigger className='bg-[#3B9BCE] text-white rounded-none gap-2'>
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <OrderStatistics />
            <form className="w-full items-center justify-center flex relative mt-3 lg:mt-0">
                <input
                    type="text"
                    placeholder="Search By Customer Name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2 mb-4 rounded w-full px-6 py-2 outline-none"
                />
                <button
                    aria-label="search for product"
                    className="absolute right-3 top-5 -translate-y-1/2"
                    type="submit"
                >
                    <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                </button>
            </form>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-black font-semibold'>ORDER</TableHead>
                        <TableHead className='text-black font-semibold'>CUSTOMER</TableHead>
                        <TableHead className='text-black font-semibold'>DATE</TableHead>
                        <TableHead className='text-black font-semibold'>TOTAL</TableHead>
                        <TableHead className='text-black font-semibold'>PAYMENT STATUS</TableHead>
                        <TableHead className='text-black font-semibold'>ITEM</TableHead>
                        <TableHead className='text-black font-semibold'>DELIVERY METHOD</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedOrders.map((order) => (
                        <TableRow key={order._id} className='bg-gray-100'>
                            <TableCell className='pr-10 lg:pr-0'>
                                <div className="flex items-center">
                                    {/* <Image
                                        src={order.productImage}
                                        alt={order.productName}
                                        className="mr-2"
                                        width={40}
                                        height={40}
                                    /> */}
                                    <div>
                                        <div className='text-xs line-clamp-1 lg:text-base'>{order.items[0].name}</div>
                                        <div className="text-xs lg:text-sm text-gray-500">{order.code}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.name}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.date}</TableCell>
                            <TableCell className='text-xs lg:text-base'>₦{order.total.toLocaleString()}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.status}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.item}</TableCell>
                            <TableCell className='text-xs lg:text-base'>{order.delivery}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="overflow-x-auto">
                <Pagination className="flex justify-center mt-4 min-w-max">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                aria-disabled={currentPage === 1}
                            />
                        </PaginationItem>

                        {getPageNumbers(currentPage, totalPages, windowWidth < 640 ? 2 : 5).map((page, index) => (
                            <PaginationItem key={index}>
                                {page === 'ellipsis' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        href="#"
                                        className={currentPage === page ? 'bg-black text-white' : 'border'}
                                        onClick={() => handlePageChange(page)}
                                    >
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

export default OrderTable;
