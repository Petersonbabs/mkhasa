"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from '@iconify/react';

interface User {
    id: number;
    userName: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    avatar: string;
}

const users: User[] = [
    { id: 1, userName: "Anthony Daniels", email: "AnthonyDaniels@gmail.com", role: "Admin", status: "active", avatar: "https://via.placeholder.com/150" },
    { id: 2, userName: "Olawale Adewale", email: "olawaleade@gmail.com", role: "Admin", status: "active", avatar: "https://via.placeholder.com/150" },
    { id: 3, userName: "James Emmanuel", email: "jamesemmanuel@gmail.com", role: "Guest User", status: "inactive", avatar: "https://via.placeholder.com/150" },
    { id: 4, userName: "Anthony Daniels", email: "AnthonyDaniels@gmail.com", role: "Manager", status: "active", avatar: "https://via.placeholder.com/150" },
];

const UserManagement = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const onSubmit = (data: any) => {
        console.log(data);
        // Handle adding new user logic here
    };

    return (
        <div className="mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
                <Card className="lg:w-[45%] h-auto bg-gray-50 border-none">
                    <CardHeader className="pb-3">
                        <h2 className="text-xl font-bold">Users</h2>
                    </CardHeader>
                    <CardContent>
                        <form className="w-full md:flex-grow mb-6 lg:max-w-xl relative">
                            <input
                                id="search"
                                name="search"
                                type="text"
                                placeholder="Search User"
                                className="w-full px-6 py-2 rounded-sm outline-none"
                            />
                            <button
                                aria-label="search for product"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                type="submit"
                            >
                                <Icon icon="mynaui:search" style={{ fontSize: 20 }} />
                            </button>
                        </form>
                        {users.map(user => (
                            <div key={user.id} className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <Avatar className="w-10 h-10 mr-2">
                                            <AvatarImage src={user.avatar} alt={user.userName} />
                                            <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-white ${user.status === 'active' ? 'bg-green-500' : 'bg-red-600'}`}></div>
                                    </div>
                                    <div>
                                        <p className="font-bold">{user.userName}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center">
                                    <Select defaultValue={user.role}>
                                        <SelectTrigger className="w-32 bg-black text-white rounded-none">
                                            <SelectValue>{user.role}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Guest User">Guest User</SelectItem>
                                            <SelectItem value="Manager">Manager</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button variant="outline" className="ml-2 p-2 border-none bg-transparent">
                                        <Icon icon="mdi:trash-can-outline" width={25} className="text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="flex-1 bg-gray-50 border-none">
                    <CardHeader className="gap-3">
                        <h2 className="text-xl font-bold">User Management</h2>
                        <p className="text-[#3B9BCE] font-semibold">Add New User</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                            <div>
                                <Label htmlFor="userName">User Name</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="userName"
                                    {...register("userName", { required: "User Name is required" })}
                                />
                                {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="email"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select {...register("role", { required: "Role is required" })}>
                                    <SelectTrigger className="w-full bg-transparent rounded-lg border-gray-500">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Guest User">Guest User</SelectItem>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select {...register("status", { required: "Status is required" })}>
                                    <SelectTrigger className="w-full bg-transparent rounded-lg border-gray-500">
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                            </div>
                            <Button type="submit" className="bg-black text-white">Add User</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserManagement;
