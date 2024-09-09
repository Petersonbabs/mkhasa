"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'react-hot-toast';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    mainImage: string;
    additionalImages: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    isAvailable: boolean;
    isFeatured: boolean;
    quantityInStock: number;
}

interface EditProductProps {
    productId: string;
}

const EditProduct: React.FC<EditProductProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (productId && session?.user?._id) {
            fetchProduct();
        }
    }, [productId, session]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`/api/proxy?path=product/${session?.user?._id}/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            } else {
                toast.error('Failed to fetch product');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Error fetching product');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSelectChange = (name: string, value: string | boolean) => {
        setProduct(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleDimensionChange = (dimension: 'length' | 'width' | 'height', value: string) => {
        setProduct(prev => prev ? {
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [dimension]: parseFloat(value)
            }
        } : null);
    };

    const handleImageChange = (index: number, value: string) => {
        setProduct(prev => {
            if (!prev) return null;
            const newImages = [...prev.additionalImages];
            newImages[index] = value;
            return { ...prev, additionalImages: newImages };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || !session?.user?._id) return;

        try {
            const response = await fetch(`/api/proxy?path=product/${session.user._id}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                toast.success('Product updated successfully');
                router.push('/dashboard/inventory');
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                name="name"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Product Name"
            />
            <Input
                name="price"
                type="number"
                value={product.price}
                onChange={handleInputChange}
                placeholder="Price"
            />
            <Select
                value={product.category}
                onValueChange={(value) => handleSelectChange('category', value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    {/* Add more categories as needed */}
                </SelectContent>
            </Select>
            <Textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                placeholder="Product Description"
            />
            <Input
                name="mainImage"
                value={product.mainImage}
                onChange={handleInputChange}
                placeholder="Main Image URL"
            />
            {product.additionalImages.map((img, index) => (
                <Input
                    key={index}
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`Additional Image ${index + 1} URL`}
                />
            ))}
            <Input
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                placeholder="Brand"
            />
            <Input
                name="sku"
                value={product.sku}
                onChange={handleInputChange}
                placeholder="SKU"
            />
            <Input
                name="weight"
                type="number"
                value={product.weight}
                onChange={handleInputChange}
                placeholder="Weight"
            />
            <div className="flex space-x-2">
                <Input
                    type="number"
                    value={product.dimensions.length}
                    onChange={(e) => handleDimensionChange('length', e.target.value)}
                    placeholder="Length"
                />
                <Input
                    type="number"
                    value={product.dimensions.width}
                    onChange={(e) => handleDimensionChange('width', e.target.value)}
                    placeholder="Width"
                />
                <Input
                    type="number"
                    value={product.dimensions.height}
                    onChange={(e) => handleDimensionChange('height', e.target.value)}
                    placeholder="Height"
                />
            </div>
            <Select
                value={product.isAvailable.toString()}
                onValueChange={(value) => handleSelectChange('isAvailable', value === 'true')}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Is Available?" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                </SelectContent>
            </Select>
            <Select
                value={product.isFeatured.toString()}
                onValueChange={(value) => handleSelectChange('isFeatured', value === 'true')}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Is Featured?" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                </SelectContent>
            </Select>
            <Input
                name="quantityInStock"
                type="number"
                value={product.quantityInStock}
                onChange={handleInputChange}
                placeholder="Quantity in Stock"
            />
            <Button type="submit">Update Product</Button>
        </form>
    );
};

export default EditProduct;