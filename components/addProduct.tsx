"use client"

import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heading } from '@/components/heading';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

type FormData = {
    name: string;
    description: string;
    price: string;
    type: string;
    brand: string;
    topNotes: string;
    middleNotes: string;
    baseNotes: string;
    volume: string;
    mainImage: File | string | null;
    firstImage: File | string | null;
    secondImage: File | string | null;
    thirdImage: File | string | null;
    category: string;
    serialBarcode: string;
    barcode: string;
    sku: string;
    quantity: string; 
    discountPercentage: string;
    appeal: string;
    manufacturer: string;
    serialName: string;
    // addSeries: boolean;
    thumbnailDescription: string;
};

type Category = {
    _id: string;
    name: string;
};

export const AddProduct = () => {
    const initialFormData: FormData = {
        name: '',
        description: '',
        price: '',
        type: '',
        brand: '',
        topNotes: '',
        middleNotes: '',
        baseNotes: '',
        volume: '',
        mainImage: null,
        firstImage: null,
        secondImage: null,
        thirdImage: null,
        category: '',
        serialBarcode: '',
        barcode: '',
        sku: '',
        quantity: '',
        discountPercentage: '',
        appeal: '',
        manufacturer: '',
        serialName: '',
        // addSeries: false,
        thumbnailDescription: '',
    };
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const { data: session, status } = useSession();
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false); 

    const handleDiscardChanges = () => {
        setFormData(initialFormData);
        // Also clear any error states if you have them
        setErrors({});
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
        if (errors[name as keyof FormData]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
        }
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>, fieldName: keyof FormData) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [fieldName]: file,
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "Valid price is required";        

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/proxy?path=all/category');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!validateForm()) {
            toast.error("Please correct the errors in the form");
            return;
        }
    
        if (status !== "authenticated" || !session?.user?._id) {
            console.error("User is not authenticated or user ID is missing");
            toast.error("Authentication error");
            return;
        }
    
        setIsLoading(true);
        const token = localStorage.getItem('token');
    
        const adminId = session.user._id;
    
        try {
            const formDataToSend = new FormData();
    
            // Append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                    formDataToSend.append(key, value.toString());
                }
            });
    
            // Append file fields
            ['mainImage', 'firstImage', 'secondImage', 'thirdImage'].forEach((field) => {
                const file = formData[field as keyof FormData] as File | null;
                if (file) {
                    formDataToSend.append(field, file);
                }
            });
    
            const response = await fetch(`https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/add/product/${adminId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Remove 'Content-Type': 'application/json' header
                },
                body: formDataToSend, // Use formDataToSend instead of JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }
    
            const result = await response.json();
            console.log(result);
            toast.success("Product added successfully");    
            handleDiscardChanges(); // Reset form after successful submission
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error(error instanceof Error ? error.message : "Failed to add product");
        } finally {
            setIsLoading(false);
        }
    };

    const triggerSubmit = () => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    };


    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center mb-4">
                <Heading>Add Product</Heading>
                <div className='flex justify-evenly gap-4'>
                    <Button onClick={handleDiscardChanges} className='rounded-none w-40 border border-app-red text-app-red bg-white text-xs md:text-base'>Discard Changes</Button>
                    <Button type="submit" onClick={triggerSubmit} className='rounded-none w-40 bg-[#3B9BCE] text-xs md:text-base'>Add Product</Button>
                </div>
            </div>
            <div className="py-4 md:py-8 grid gap-10 lg:grid-cols-12">
                {/* Left Section: General Information */}
                <div className="lg:col-span-7">
                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">General Information</h2>
                            <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-5'>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Product Name</Label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Description</Label>
                                    <Textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className='h-32'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>
                                {/* <div>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => handleChange({ target: { name: 'addSeries', value } } as any)}
                                    >
                                        <SelectTrigger className="bg-transparent rounded-sm">
                                            <SelectValue placeholder="Add Series" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="series1">Series 1</SelectItem>
                                            <SelectItem value="series2">Series 2</SelectItem>
                                            <SelectItem value="series3">Series 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Serial Name</Label>
                                    <Input
                                        type="text"
                                        name="serialName"
                                        value={formData.serialName}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.serialName}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Serial bar code</Label>
                                    <Input
                                        type="text"
                                        name="serialBarcode"
                                        value={formData.serialBarcode}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.serialBarcode}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Brand</Label>
                                    <Input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Manufacturer</Label>
                                    <Input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.manufacturer}</p>}
                                </div>
                                {/* Add other fields as needed */}
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                            <form className="grid gap-5" ref={formRef} onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Base Price</Label>
                                    <Input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Discount Percentage (%)</Label>
                                    <Input
                                        type="text"
                                        name="discountPercentage"
                                        value={formData.discountPercentage}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200 w-1/2'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.discountPercentage}</p>}
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
                            <form className="grid grid-cols-3 gap-5" ref={formRef} onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">SKU</Label>
                                    <Input
                                        type="text"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Barcode</Label>
                                    <Input
                                        type="text"
                                        name="barcode"
                                        value={formData.barcode}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.barcode}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Quantity</Label>
                                    <Input
                                        type="text"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Notes</h2>
                            <form className="grid gap-5" ref={formRef} onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Top Notes</Label>
                                    <Input
                                        type="text"
                                        name="topNotes"
                                        value={formData.topNotes}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.topNotes}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Middle Notes</Label>
                                    <Input
                                        type="text"
                                        name="middleNotes"
                                        value={formData.middleNotes}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.middleNotes}</p>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Base Notes</Label>
                                    <Input
                                        type="text"
                                        name="baseNotes"
                                        value={formData.baseNotes}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.baseNotes}</p>}
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="mb-8 border-none bg-gray-50">
                        <CardContent className='py-5'>
                            <h2 className="text-xl font-semibold mb-4">Other</h2>
                            <form className="grid gap-5" ref={formRef} onSubmit={handleSubmit}>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Appeal</Label>
                                    <Select
                                        value={formData.appeal}
                                        onValueChange={(value) => handleChange({ target: { name: 'appeal', value } } as any)}
                                    >
                                        <SelectTrigger className="bg-transparent rounded-sm">
                                            <SelectValue placeholder="Select Appeal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="men">Men</SelectItem>
                                            <SelectItem value="women">Women</SelectItem>
                                            <SelectItem value="unisex">Unisex</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Type</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value) => handleChange({ target: { name: 'type', value } } as any)}
                                    >
                                        <SelectTrigger className="bg-transparent rounded-sm">
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cologne">Cologne</SelectItem>
                                            <SelectItem value="eau-de-toillete">Eau de Toillete</SelectItem>
                                            <SelectItem value="eau-de-parfum">Eau de Parfum</SelectItem>
                                            <SelectItem value="parfum">Parfum</SelectItem>
                                            <SelectItem value="extrait-de-parfum">Extrait de Parfum</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className="block text-sm font-medium text-gray-700">Volume</Label>
                                    <Input
                                        type="text"
                                        name="volume"
                                        value={formData.volume}
                                        onChange={handleChange}
                                        className='bg-white border-gray-200'
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.volume}</p>}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    {/* Add more cards for other sections */}
                </div>

                {/* Right Section: Product Media and Category */}
                <div className="lg:col-span-5">
                    <Card className="mb-8 py-4 border-none bg-gray-50">
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-4">Product Media</h2>
                            <p className="text-gray-500 mb-4">Photo Product</p>
                            <div className="border-2 border-dashed border-gray-400 p-4 bg-white">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {(['mainImage', 'firstImage', 'secondImage', 'thirdImage'] as const).map((field) => (
                                        <div key={field} className="relative aspect-square border border-gray-300 bg-gray-50">
                                            <input
                                                type="file"
                                                onChange={(e) => handleImageUpload(e, field)}
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                            {formData[field] && (
                                                <img
                                                    src={URL.createObjectURL(formData[field] as File)}
                                                    alt="Uploaded preview"
                                                    className="absolute inset-0 object-cover w-full h-full"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>                                
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='py-4 border-none bg-gray-50'>
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-4">Category</h2>
                            <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.name} value={category.name}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};
