"use client"

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';

interface Product {
    id: string;
    name: string;
    category: string;
    stock: 'In Stock' | 'Out of stock';
    totalSale: number;
}

const initialProducts: Product[] = [
    { id: '1', name: 'Nivea Perfume', category: 'Perfume', stock: 'In Stock', totalSale: 540 },
    { id: '2', name: 'Nivea Roll On', category: 'Roll on', stock: 'Out of stock', totalSale: 680 },
    { id: '3', name: 'Nivea Body Spray', category: 'Body spray', stock: 'In Stock', totalSale: 980 },
];

const FrequentlyBoughtSlide = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [frequentlyBought, setFrequentlyBought] = useState<string[]>([]);

    const addFrequentlyBought = (value: string) => {
        if (!frequentlyBought.includes(value)) {
            setFrequentlyBought([...frequentlyBought, value]);
        }
    };

    const removeFrequentlyBought  = (value: string) => {
        setFrequentlyBought(frequentlyBought.filter(seller => seller !== value));
    };

    return (
        <>
            <div className="mb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Similar Items</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Total sale</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className={product.stock === 'In Stock' ? 'text-green-500' : 'text-red-500'}>
                                    {product.stock}
                                </TableCell>
                                <TableCell>{product.totalSale} pieces</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Button className="w-full mb-6 rounded-none bg-black">Save & Continue</Button>

            <div>
                <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add Frequently Bought Together</h2>
                <form className="w-full md:flex-grow lg:max-w-80 relative mb-4 lg:mt-0">
                    <Input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Search By Name"
                        className="w-full px-6 py-2 rounded-full outline-none border-none bg-gray-50"
                    />
                    <button
                        aria-label="search for product"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        type="submit"
                    >
                        <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                    </button>
                </form>
                <ul className="space-y-2 lg:w-[28%]">
                    {['Taskane Marina', 'Oud Zafran', 'Supremacy Noir'].map((item) => (
                        <li key={item} className="flex justify-between items-center">
                            <span>{item}</span>
                            <div>
                                <Button size="sm" variant="outline" className='hover:bg-black hover:text-white rounded-none' onClick={() => addFrequentlyBought(item)}>+</Button>
                                <Button size="sm" variant="outline" onClick={() => removeFrequentlyBought(item)} className="ml-5 hover:bg-black hover:text-white rounded-none">-</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default FrequentlyBoughtSlide;
