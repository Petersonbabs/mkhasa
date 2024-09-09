"use client"

import React, { useEffect, useState } from 'react';
import { Wrapper } from '@/components/wrapper';
import { Heading } from '@/components/heading';
import { SubHeading } from '@/components/subHeading';
import { Icon } from "@iconify/react";
import ProfileDetails from '@/components/profileDetail';
import UserManagement from '@/components/userManagement';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
    </div>
);

const SettingsPage = () => {
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
            <Heading>Settings</Heading>
            <SubHeading className='flex items-center gap-1 mt-3'>
                Dashboard
                <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                Settings
            </SubHeading>
            <div className='mt-7'>
                <ProfileDetails />
            </div>
            <div className='mt-7'>
                <UserManagement />
            </div>
        </Wrapper>
    );
};

export default SettingsPage;
