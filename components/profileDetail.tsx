"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Icon } from '@iconify/react';

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    city: string;
    state: string;
    zipCode: string;
    address?: string;
}

const ProfileDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();
    const [avatarSrc, setAvatarSrc] = useState("https://via.placeholder.com/150");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState({
        firstName: "Emeka",
        lastName: "Okoli",
        email: "Mkhasa@Gmail.Com",
        phoneNumber: "090101614594",
        password: "********",
        country: "NIGERIA",
        city: "LAGOS",
        state: "LAGOS",
        zipCode: "101112",
        address: "",
    });

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarSrc(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: any) => {
        console.log(data);
        // Implement your update logic here
    };

    return (
        <div className="mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                <Card className="md:w-1/3 h-96 bg-gray-50 border-none">
                    <CardContent className="flex flex-col items-center p-4">
                        <div className="relative">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src={avatarSrc} alt="Profile Picture" />
                                <AvatarFallback>EO</AvatarFallback>
                            </Avatar>
                            <div
                                className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
                                onClick={handleAvatarClick}
                            >
                                <Icon icon="mdi:camera" className="text-gray-600" width="24" height="24" />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <div className="flex flex-col gap-3 mt-4 justify-center items-center">
                            <h2 className="font-medium text-2xl">{profile.firstName} {profile.lastName}</h2>
                            <Button variant="outline" className="bg-app-red text-white rounded-2xl py-1 px-10">Admin</Button>
                            <span className="text-sm">Last Visit 02/08/2024</span>
                            <Button className="bg-[#3B9BCE] rounded-2xl py-1 px-16">Logout</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 bg-gray-50 border-none">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Profile Details</h2>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="firstName"
                                    {...register("firstName", { required: "First Name is required" })}
                                    defaultValue={profile.firstName}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="lastName"
                                    {...register("lastName", { required: "Last Name is required" })}
                                    defaultValue={profile.lastName}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="email"
                                    {...register("email", { required: "Email is required" })}
                                    defaultValue={profile.email}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="phoneNumber"
                                    {...register("phoneNumber", { required: "Phone Number is required" })}
                                    defaultValue={profile.phoneNumber}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="zipCode">Zip Code</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="zipCode"
                                    {...register("zipCode", { required: "Zip Code is required" })}
                                    defaultValue={profile.zipCode}
                                />
                                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Select
                                    defaultValue={profile.country}
                                    onValueChange={(value) => setProfile({ ...profile, country: value })}
                                >
                                    <SelectTrigger className="w-full border-gray-500 bg-transparent rounded-lg">
                                        <SelectValue placeholder="Select a country">{profile.country}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NIGERIA">NIGERIA</SelectItem>
                                        <SelectItem value="OTHER">OTHER</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="city"
                                    {...register("city", { required: "City is required" })}
                                    defaultValue={profile.city}
                                />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="state"
                                    {...register("state", { required: "State is required" })}
                                    defaultValue={profile.state}
                                />
                                {errors.state && <p className="text-red-500 text-sm">{errors.state.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="password"
                                    type="password"
                                    {...register("password", { required: "Password is required" })}
                                    defaultValue={profile.password}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    className="rounded-lg border-gray-500"
                                    id="address"
                                    {...register("address")}
                                    defaultValue={profile.address}
                                />
                            </div>
                            {/* <Button type="submit" className="col-span-1 md:col-span-2 bg-blue-500">Update Profile</Button> */}
                        </form>
                        {/* <Separator className="my-4" /> */}
                        <Button variant="link" className="text-[#3B9BCE] font-semibold pl-0">Change Password</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfileDetails;
