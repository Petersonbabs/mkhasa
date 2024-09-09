"use client"

import React, { useEffect, useState } from 'react';
import { Wrapper } from '@/components/wrapper';
import { Heading } from '@/components/heading';
import { SubHeading } from '@/components/subHeading';
import { Icon } from "@iconify/react";
import CustomerManagement from '@/components/customerManagement';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
    </div>
);

const CustomersPage = () => {
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

    return (
        <Wrapper>
            <Heading>Customers</Heading>
            <SubHeading className='flex items-center gap-1 mt-3'>
                Category
                <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                Customers
            </SubHeading>
            <CustomerManagement />
        </Wrapper>
    );
};

export default CustomersPage;
