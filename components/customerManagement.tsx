"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Icon } from "@iconify/react";
import CustomerMetric from "./customerMetric";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Customer {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address?: string;
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;
    const [orders, setOrders] = useState<Customer[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [dailyUsers, setDailyUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            if (session?.user?._id) {
                fetchCustomers(session.user._id);
                fetchTotalUsers(session.user._id);
                fetchDailyUsers(session.user._id);
            } else {
                console.error("Session user ID is undefined");
                setIsLoading(false);
            }
        }
    }, [status, router, session]);

    const fetchCustomers = async (adminId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/proxy?path=all/user&adminId=${adminId}`);
            const data: Customer[] = await response.json();

            // Check and map fields to avoid undefined errors
            const mappedCustomers = data.map((customer) => ({
                _id: customer._id,
                name: customer.name || 'N/A',
                email: customer.email,
                phoneNumber: customer.phoneNumber || 'N/A', // Provide a default value if phone is missing
                address: customer.address || 'N/A', // Provide a default value if address is missing
            }));

            setOrders(mappedCustomers);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTotalUsers = async (adminId: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/proxy?path=total/user&adminId=${adminId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch total users');
            }
            const data = await response.json();
            setTotalUsers(data);
        } catch (error) {
            console.error('Error fetching total users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDailyUsers = async (adminId: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/proxy?path=daily/user&adminId=${adminId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch daily users');
            }
            const data = await response.json();
            setDailyUsers(data);
        } catch (error) {
            console.error('Error fetching daily users:', error);
        } finally {
            setIsLoading(false);
        }
    };



    // Filtering vendors based on search term
    // const filteredVendors = orders.filter(customer =>
    //     customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // Pagination logic
    const indexOfLastVendor = currentPage * customersPerPage;
    const indexOfFirstVendor = indexOfLastVendor - customersPerPage;

    const { filteredOrders, currentVendors, totalPages } = useMemo(() => {
        const filtered: Customer[] = orders.filter(customer =>
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const displayed: Customer[] = filtered.slice(
            (currentPage - 1) * customersPerPage,
            currentPage * customersPerPage
        );
        const total = Math.ceil(filtered.length / customersPerPage);
        return { filteredOrders: filtered, currentVendors: displayed, totalPages: total };
    }, [orders, searchTerm, currentPage, customersPerPage]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <CustomerMetric title="Total Customers" count={totalUsers} icon="iconamoon:profile-fill" backgroundColor="#ED7620" />
                <CustomerMetric title="New Customers" count={dailyUsers} icon="lets-icons:user-add-alt-fill" backgroundColor="#3B9BCE" />
            </div>
            <form className="w-72 relative my-5">
                <input
                    id="search"
                    name="search"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search By Email For Now.."
                    className="w-full px-6 py-2 rounded-full outline-none bg-gray-100"
                />
                <button
                    aria-label="search for product"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    type="submit"
                >
                    <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                </button>
            </form>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <input type="checkbox" />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="flex justify-center items-center">Edit User</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentVendors.map((customer, index) => (
                            <TableRow key={index}>
                                <TableCell><input type="checkbox" /></TableCell>
                                <TableCell>
                                    <Link href={`/dashboard/customers/${customer._id}`}>
                                        {customer.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phoneNumber}</TableCell>
                                <TableCell className="flex justify-center items-center">
                                    <Icon icon="tabler:trash" width="20" height="20" className="text-gray-300 hover:text-gray-500 cursor-pointer" />
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

export default CustomerManagement;