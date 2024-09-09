import React, { useState, useEffect } from 'react';

interface TopSellingProduct {
    totalQuantity: number;
    product: {
        _id: string;
        name: string;
        mainImage: string;
        category: string;
        totalQuantity: number;
    };
}

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

const TopSellingProductsTable = () => {
    const [products, setProducts] = useState<TopSellingProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/proxy?path=top/selling');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/proxy?path=top/selling');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                // You can add additional error handling here, such as displaying an error message to the user
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Top selling Product</h2>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="text-left">
                                <th className="py-3 px-4 border-b">S/NO</th>
                                <th className="py-3 px-4 border-b">Category</th>
                                <th className="py-3 px-4 border-b">Product name</th>
                                <th className="py-3 px-4 border-b">Stock</th>
                                <th className="py-3 px-4 border-b text-center">Total Sale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr key={product.product._id} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border-b text-xs md:text-sm lg:text-base">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-4 border-b text-xs md:text-sm lg:text-base">
                                        {product.product.category}
                                    </td>
                                    <td className="py-3 px-4 border-b flex items-center space-x-3">
                                        <img
                                            src={product.product.mainImage}
                                            alt={product.product.name}
                                            className="rounded-full object-cover w-10 h-10"
                                        />
                                        <span className="text-xs md:text-sm lg:text-base">
                                            {product.product.name}
                                        </span>
                                    </td>
                                    <td
                                        className={`py-3 px-4 border-b text-xs md:text-sm lg:text-base ${product.totalQuantity > 0 ? 'text-green-500' : 'text-red-500'
                                            }`}
                                    >
                                        {product.totalQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                    </td>
                                    <td className="py-3 px-4 border-b text-center text-xs md:text-sm lg:text-base">
                                        {product.totalQuantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TopSellingProductsTable;
