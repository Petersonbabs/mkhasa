"use client"

import AdminNavbar from '@/components/navbar'; 
import { ReactNode, useState } from 'react';
import MobileSidebar from '@/components/mobileSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <div className="flex flex-col">
            <AdminNavbar toggleMobileSidebar={toggleMobileSidebar} />
            <div className="flex-1 overflow-hidden">
                <MobileSidebar isOpen={isMobileSidebarOpen} />
                <main className="w-full overflow-x-hidden overflow-y-auto">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
            {isMobileSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
                    onClick={toggleMobileSidebar}
                ></div>
            )}
        </div>
    );
}