"use client";

import { Customer, Order } from '@/data/customers';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { Heading } from './heading';
import { SubHeading } from './subHeading';
import { Wrapper } from './wrapper';
import DetailMetric from './detailMetric';
import Image from 'next/image';

interface CustomerDetailProps {
    customer: Customer;
}

const CustomerDetail = ({ customer }: CustomerDetailProps) => {
    return (
        <Wrapper>
            <Heading>Customer page</Heading>
            <SubHeading className='flex items-center gap-1 mt-3'>
                Customers
                <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                Customer page
            </SubHeading>

            <div className="flex flex-col md:flex-row mt-5">
                {/* Left side: Customer Info */}
                <div className="lg:w-1/4 mb-6 md:mb-0 bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-4 pb-10 gap-3 mb-6">
                        <Image 
                        src={customer.avatarUrl || '/default-avatar.png'} 
                        alt={customer.name} 
                        className="h-[100px] rounded-full"
                        width={100}
                        height={10}    
                        />
                        <h2 className="text-xl font-semibold">{customer.name}</h2>
                        <div className='w-full mt-3'>
                            <hr />
                            <p className="text-gray-600 flex items-center py-2 px-4"><Icon icon="ic:baseline-email" className="mr-2" /> {customer.email}</p>
                            <hr />
                            <p className="text-gray-600 flex items-center py-2 px-4"><Icon icon="ic:baseline-phone" className="mr-2" /> {customer.phone}</p>
                            <hr />
                            <p className="text-gray-600 flex items-center py-2 px-4"><Icon icon="fluent:street-sign-20-filled" className="mr-2" /> {customer.address1}</p>
                            <hr />
                            <p className="text-gray-600 flex items-center py-2 px-4"><Icon icon="fluent:street-sign-20-filled" className="mr-2" /> {customer.address2}</p>
                            <hr />
                            <p className="text-gray-600 flex items-center py-2 px-4"><Icon icon="mdi:location" className="mr-2" />{customer.city}, {customer.country}</p>
                            <hr />
                            <p className="text-gray-600 flex items-center pt-2 px-4"><Icon icon="radix-icons:dot-filled" className="mr-2 text-[#4ECB71]" /> Last Activity: {customer.lastActivity}</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Order Summary and Orders Table */}
                <div className="lg:w-9/12 md:pl-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <DetailMetric title="Total Order" count={225} icon="lets-icons:order-fill" backgroundColor="
#ED7620" />
                        <DetailMetric title="Completed Order" count={200} icon="material-symbols-light:order-approve-sharp" backgroundColor="#3B9BCE" />
                        <DetailMetric title="Cancelled Order" count={25} icon="fluent-mdl2:deactivate-orders" backgroundColor="#D00607" />
                    </div>

                    {customer.orders && customer.orders.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow className='bg-gray-50'>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>No of items</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Date Delivered</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customer.orders.map((order: Order, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.items}</TableCell>
                                        <TableCell>{order.price}</TableCell>
                                        <TableCell>{order.dateDelivered}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-sm ${order.status === "Completed" ? "text-[#4ECB71]" :
                                                order.status === "Cancelled" ? "text-app-red" :
                                                    "text-[#ED7620]"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No orders found for this customer.</p>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default CustomerDetail;
