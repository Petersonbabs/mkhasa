"use client"

import React, {useEffect, useState} from 'react';
import { Wrapper } from '@/components/wrapper';
import InventoryTable from '@/components/inventoryTable';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
    </div>
);

const InventoryPage = () => {
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
            <InventoryTable/>
        </Wrapper>
    );
};

export default InventoryPage;
