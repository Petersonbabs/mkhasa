"use client"

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import CustomerDetail from '@/components/customerDetail';
import { customers, Customer } from '@/data/customers';

interface Params {
    name: string;
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
    </div>
);

export default function CustomerDetailPage({ params }: { params: Params }) {
    const customerName = params.name.replace(/-/g, ' ');
    const customer = customers.find(c => c.name.toLowerCase() === customerName.toLowerCase());

    if (!customer) {
        notFound();
    }
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust this value as needed

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return <CustomerDetail customer={customer} />;
}