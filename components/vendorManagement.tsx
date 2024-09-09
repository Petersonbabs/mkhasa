"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Icon } from "@iconify/react";
import { Heading } from '@/components/heading';
import { VendorModal } from "./vendorModal";

interface Vendor {
    name: string;
    email: string;
    phone: string;
    status: string;
}

const vendors: Vendor[] = [
    { name: "Chinedu Okafor", email: "ChineduOkafor@gmail.com", phone: "09011542273", status: "Active" },
    { name: "Amaka Umeh", email: "AmakaUmeh@gmail.com", phone: "07065432109", status: "Active" },
    { name: "Tochukwu Nwosu", email: "TochukwuNwosu@gmail.com", phone: "08098765432", status: "Inactive" },
    { name: "Adaora Okpala", email: "AdaoraOkpala@gmail.com", phone: "09087654321", status: "Active" },
    { name: "Emeka Nnamani", email: "EmekaNnamani@gmail.com", phone: "07012345678", status: "Inactive" },
    { name: "Ngozi Eze", email: "NgoziEze@gmail.com", phone: "08054321098", status: "Pending" },
    { name: "Ikechukwu Okorie", email: "IkechukwuOkorie@gmail.com", phone: "09021098765", status: "Active" },
    { name: "Nneka Okafor", email: "NnekaOkafor@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Kelechi Nwosu", email: "KelechiNwosu@gmail.com", phone: "08076543210", status: "Active" },
    { name: "Chioma Eze", email: "ChiomaEze@gmail.com", phone: "09023456789", status: "Active" },
    { name: "Obinna Umeh", email: "ObinnaUmeh@gmail.com", phone: "07054321098", status: "Pending" },
    { name: "Amara Okorie", email: "AmaraOkorie@gmail.com", phone: "08098765432", status: "Pending" },
    { name: "Nnamdi Nwosu", email: "NnamdiNwosu@gmail.com", phone: "09012345678", status: "Active" },
    { name: "Onyinye Okpala", email: "OnyinyeOkpala@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Ugochukwu Eze", email: "UgochukwuEze@gmail.com", phone: "08054321098", status: "Active" },
    { name: "Nkechi Okafor", email: "NkechiOkafor@gmail.com", phone: "09021098765", status: "Active" },
    { name: "Chinonso Nnamani", email: "ChinonsoNnamani@gmail.com", phone: "07076543210", status: "Inactive" },
    { name: "Ebube Okorie", email: "EbubeOkorie@gmail.com", phone: "08023456789", status: "Pending" },
    { name: "Uche Umeh", email: "UcheUmeh@gmail.com", phone: "09054321098", status: "Active" },
    { name: "Chidiebere Nwosu", email: "ChidiebereNwosu@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Chinedu Okafor", email: "ChineduOkafor@gmail.com", phone: "09011542273", status: "Active" },
    { name: "Amaka Umeh", email: "AmakaUmeh@gmail.com", phone: "07065432109", status: "Active" },
    { name: "Tochukwu Nwosu", email: "TochukwuNwosu@gmail.com", phone: "08098765432", status: "Inactive" },
    { name: "Adaora Okpala", email: "AdaoraOkpala@gmail.com", phone: "09087654321", status: "Active" },
    { name: "Emeka Nnamani", email: "EmekaNnamani@gmail.com", phone: "07012345678", status: "Inactive" },
    { name: "Ngozi Eze", email: "NgoziEze@gmail.com", phone: "08054321098", status: "Pending" },
    { name: "Ikechukwu Okorie", email: "IkechukwuOkorie@gmail.com", phone: "09021098765", status: "Active" },
    { name: "Nneka Okafor", email: "NnekaOkafor@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Kelechi Nwosu", email: "KelechiNwosu@gmail.com", phone: "08076543210", status: "Active" },
    { name: "Chioma Eze", email: "ChiomaEze@gmail.com", phone: "09023456789", status: "Active" },
    { name: "Obinna Umeh", email: "ObinnaUmeh@gmail.com", phone: "07054321098", status: "Pending" },
    { name: "Amara Okorie", email: "AmaraOkorie@gmail.com", phone: "08098765432", status: "Pending" },
    { name: "Nnamdi Nwosu", email: "NnamdiNwosu@gmail.com", phone: "09012345678", status: "Active" },
    { name: "Onyinye Okpala", email: "OnyinyeOkpala@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Ugochukwu Eze", email: "UgochukwuEze@gmail.com", phone: "08054321098", status: "Active" },
    { name: "Nkechi Okafor", email: "NkechiOkafor@gmail.com", phone: "09021098765", status: "Active" },
    { name: "Chinonso Nnamani", email: "ChinonsoNnamani@gmail.com", phone: "07076543210", status: "Inactive" },
    { name: "Ebube Okorie", email: "EbubeOkorie@gmail.com", phone: "08023456789", status: "Pending" },
    { name: "Uche Umeh", email: "UcheUmeh@gmail.com", phone: "09054321098", status: "Active" },
    { name: "Chidiebere Nwosu", email: "ChidiebereNwosu@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Chinedu Okafor", email: "ChineduOkafor@gmail.com", phone: "09011542273", status: "Active" },
    { name: "Amaka Umeh", email: "AmakaUmeh@gmail.com", phone: "07065432109", status: "Active" },
    { name: "Tochukwu Nwosu", email: "TochukwuNwosu@gmail.com", phone: "08098765432", status: "Inactive" },
    { name: "Adaora Okpala", email: "AdaoraOkpala@gmail.com", phone: "09087654321", status: "Active" },
    { name: "Emeka Nnamani", email: "EmekaNnamani@gmail.com", phone: "07012345678", status: "Inactive" },
    { name: "Ngozi Eze", email: "NgoziEze@gmail.com", phone: "08054321098", status: "Pending" },
    { name: "Ikechukwu Okorie", email: "IkechukwuOkorie@gmail.com", phone: "09021098765", status: "Active" },
    { name: "Nneka Okafor", email: "NnekaOkafor@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Kelechi Nwosu", email: "KelechiNwosu@gmail.com", phone: "08076543210", status: "Active" },
    { name: "Chioma Eze", email: "ChiomaEze@gmail.com", phone: "09023456789", status: "Active" },
    { name: "Obinna Umeh", email: "ObinnaUmeh@gmail.com", phone: "07054321098", status: "Pending" },
    { name: "Amara Okorie", email: "AmaraOkorie@gmail.com", phone: "08098765432", status: "Pending" },
    { name: "Nnamdi Nwosu", email: "NnamdiNwosu@gmail.com", phone: "09012345678", status: "Active" },
    { name: "Onyinye Okpala", email: "OnyinyeOkpala@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Ugochukwu Eze", email: "UgochukwuEze@gmail.com", phone: "08054321098", status: "Active" },
    { name: "Nkechi Okafor", email: "NkechiOkafor@gmail.com", phone: "09021098765", status: "Active" },
    { name: "Chinonso Nnamani", email: "ChinonsoNnamani@gmail.com", phone: "07076543210", status: "Inactive" },
    { name: "Ebube Okorie", email: "EbubeOkorie@gmail.com", phone: "08023456789", status: "Pending" },
    { name: "Uche Umeh", email: "UcheUmeh@gmail.com", phone: "09054321098", status: "Active" },
    { name: "Chidiebere Nwosu", email: "ChidiebereNwosu@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Chidiebere Nwosu", email: "ChidiebereNwosu@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Chinedu Okafor", email: "ChineduOkafor@gmail.com", phone: "09011542273", status: "Active" },
    { name: "Amaka Umeh", email: "AmakaUmeh@gmail.com", phone: "07065432109", status: "Active" },
    { name: "Tochukwu Nwosu", email: "TochukwuNwosu@gmail.com", phone: "08098765432", status: "Inactive" },
    { name: "Adaora Okpala", email: "AdaoraOkpala@gmail.com", phone: "09087654321", status: "Active" },
    { name: "Emeka Nnamani", email: "EmekaNnamani@gmail.com", phone: "07012345678", status: "Inactive" },
    { name: "Ngozi Eze", email: "NgoziEze@gmail.com", phone: "08054321098", status: "Pending" },
    { name: "Ikechukwu Okorie", email: "IkechukwuOkorie@gmail.com", phone: "09021098765", status: "Active" },
    { name: "Nneka Okafor", email: "NnekaOkafor@gmail.com", phone: "07098765432", status: "Inactive" },
    { name: "Kelechi Nwosu", email: "KelechiNwosu@gmail.com", phone: "08076543210", status: "Active" },
    { name: "Chioma Eze", email: "ChiomaEze@gmail.com", phone: "09023456789", status: "Active" },
    { name: "Obinna Umeh", email: "ObinnaUmeh@gmail.com", phone: "07054321098", status: "Pending" },
    { name: "Amara Okorie", email: "AmaraOkorie@gmail.com", phone: "08098765432", status: "Pending" },
    { name: "Nnamdi Nwosu", email: "NnamdiNwosu@gmail.com", phone: "09012345678", status: "Active" },
    { name: "Onyinye Okpala", email: "OnyinyeOkpala@gmail.com", phone: "07098765432", status: "Inactive" },
];

const VendorManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const vendorsPerPage = 10;
    const [orders, setOrders] = useState<Vendor[]>(vendors);
    const [isVendorModalOpen, setVendorModalOpen] = useState(false);
    const openModal = () => setVendorModalOpen(true);
    const closeModal = () => setVendorModalOpen(false);

    // Filtering vendors based on search term
    const filteredVendors = orders.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastVendor = currentPage * vendorsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;

    const { filteredOrders, currentVendors, totalPages } = useMemo(() => {
        const filtered: Vendor[] = orders.filter(vendor =>
            vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const displayed: Vendor[] = filtered.slice(
            (currentPage - 1) * vendorsPerPage,
            currentPage * vendorsPerPage
        );
        const total = Math.ceil(filtered.length / vendorsPerPage);
        return { filteredOrders: filtered, currentVendors: displayed, totalPages: total };
    }, [orders, searchTerm, currentPage, vendorsPerPage]);

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
            <div className="flex justify-between items-center mb-4">
                <Heading>Vendors</Heading>
                <Button
                    onClick={openModal}
                    className='rounded-none bg-[#3B9BCE] text-xs md:text-base'
                >
                    Add New Vendor
                </Button>
                <VendorModal isOpen={isVendorModalOpen} onClose={closeModal} />
            </div>
            <form className="w-72 relative my-5">
                <input
                    id="search"
                    name="search"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search By Name"
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <input type="checkbox" />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentVendors.map((vendor, index) => (
                        <TableRow key={index}>
                            <TableCell><input type="checkbox" /></TableCell>
                            <TableCell>{vendor.name}</TableCell>
                            <TableCell>{vendor.email}</TableCell>
                            <TableCell>{vendor.phone}</TableCell>
                            <TableCell className="flex gap-3 items-center">
                                <Button
                                    className={`status-${vendor.status.toLowerCase()} inline-flex items-center w-28 h-8 border ${vendor.status === "Active"
                                        ? "border-green-500 bg-green-100 text-black font-medium"
                                        : vendor.status === "Inactive"
                                            ? "border-gray-500 bg-gray-100 text-black font-medium"
                                            : "border-orange-500 bg-orange-100 text-black font-medium"
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${vendor.status === "Active"
                                            ? "bg-green-500"
                                            : vendor.status === "Inactive"
                                                ? "bg-gray-500"
                                                : "bg-orange-500"
                                            }`}
                                    />
                                    {vendor.status}
                                </Button>
                                <div className="text-right flex justify-end">
                                    <Button variant="ghost" className="text-red-500 ml-2">
                                        <Icon icon="tabler:trash" width="20" height="20" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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

export default VendorManagement;