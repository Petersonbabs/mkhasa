'use client'

import React, { useEffect, useState } from 'react'
import { Heading } from '@/components/heading'
import { SubHeading } from '@/components/subHeading'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import dummyIds from '@/data/layerWithIds'
import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useSession } from 'next-auth/react'

interface Product {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    category: string;
    inventory: {
        quantity: number;
        unit: string;
        total: number;
    };
    layerWith: string[];
    checked: boolean;
}



const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
    </div>
);

const LayerWithTable = () => {
    const { data: session, status } = useSession()
    const [products, setProducts] = useState<Product[]>();
    const [allProducts, setAllProducts] = useState<Product[]>();
    const { id } = useParams();
    const [ids, setIds] = useState<String[]>()
    const [isLoading, setIsLoading] = useState(false);
    const [sortCriteria, setSortCriteria] = useState<'Date' | 'inStock' | 'outOfStock'>('Date')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {

        fetchData()
    }, [sortCriteria])




    // get all products
    const getAllProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/all/products`);
            const data = await response.json();

            const formattedProducts = data.map((item: any) => ({
                id: item._id,
                name: item.name,
                price: `₦${item.price}`,
                imageUrl: item.mainImage,
                category: item.category,
                inventory: {
                    quantity: 0,
                    unit: "Pieces",
                    total: 0,
                },
            }));
            setAllProducts(formattedProducts)
            return formattedProducts
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
            console.log('product fetching done!')
        }
    };


    // get layer with ids
    const getLayerWithIds = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/product/${id}`);
            const data = await response.json();
            console.log(data.layerWith)
             
            return data.layerWith.map((item: any) => item._id)
        } catch (error) {
            console.error('Error fetching singleproduct:', error);
        } finally {
            setIsLoading(false)
            console.log('product fetching done!')
        }
    }





    const processProduct = async (layerWithIds: string[], allProducts: Product[]) => {
        const layerWithIdset = new Set(layerWithIds);
        return allProducts.map(product => ({
            ...product,
            checked: layerWithIdset.has(product.id)
        }));
    };

    // fetch data
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const allProducts = await getAllProducts();
            const layerWithIds = await getLayerWithIds();
            // console.log(layerWithIds);
            // console.log(allProducts)

            let processedProducts = await processProduct(layerWithIds, allProducts);
            // console.log(processedProducts)

            if (sortCriteria === 'inStock') {
                processedProducts = processedProducts?.filter(product => Number(product.price.slice(1)) > 0);
            } else if (sortCriteria === 'outOfStock') {
                processedProducts = processedProducts?.filter(product => Number(product.price.slice(1)) === 0);
            }

            setProducts(processedProducts);
        } catch (error) {
            console.error("Error fetching and processing data:", error);
            toast.error('Failed to fetch and process data', { position: 'top-right' });
        } finally {
            setIsLoading(false);
        }
    };

    // handle sort change
    const handleSortChange = (criteria: 'Date' | 'inStock' | 'outOfStock') => {
        setSortCriteria(criteria);
    };

    const checkedProducts = products?.filter(product => product.checked === true);
    useEffect(()=>{
        console.log(checkedProducts)
    }, [fetchData])


    // add product to the layer with
    const handleAddProduct = (productId: string) => {

        setProducts(prevProducts =>
            prevProducts?.map(product =>
                product.id === productId
                    ? { ...product, checked: true }
                    : product

            )
        );


    };

    // remove a product from the layer with
    const handleRemoveProduct = (productId: string) => {
        setProducts(prevProducts =>
            prevProducts?.map(product =>
                product.id === productId
                    ? { ...product, checked: false }
                    : product
            )
        );
    };

    const handleSaveAndContinue = async () => {
        setIsLoading(true);

        const selectedProductIds = products?.filter(product => product.checked).map(product => product.id);
        console.log(selectedProductIds);
        
        try {
            const response = await fetch(`https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/add/layer/product/${session?.user._id}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ layerWith: selectedProductIds })
            });
            
            if (!response.ok) throw new Error('Failed to update best sellers');
            getLayerWithIds()
            toast.success('Layer with updated successfully');
        } catch (error) {
            console.error('Error updating best sellers:', error);
            toast.error('An error occurred while updating best sellers', { position: 'top-right' });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            {/* Heading */}
            <div className='flex items-center mb-4'>
                <div>
                    <Heading>Layer With</Heading>
                    <SubHeading className='flex items-center gap-1 mt-3'>
                        <span>Category</span>
                        <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                        <span>Inventory</span>
                        <Icon icon="icon-park-outline:double-right" className="text-sm text-gray-500" />
                        <span>Layer with</span>
                    </SubHeading>
                </div>
            </div>
            {/* end of Heading */}

            {/* Sort Buttons */}
            <div className="flex gap-4 mb-4">
                <button onClick={() => handleSortChange('Date')} className={`btn ${sortCriteria === 'Date' && 'bg-black text-white'} border px-4 py-1 hover:bg-black hover:text-white`}>
                    Latest Added
                </button>
                <button onClick={() => handleSortChange('inStock')} className={`${sortCriteria === 'inStock' && 'bg-black text-white'} btn border px-4 py-1 hover:bg-black hover:text-white`}>
                    In Stock
                </button>
                <button onClick={() => handleSortChange('outOfStock')} className={`${sortCriteria === 'outOfStock' && 'bg-black text-white'} btn border px-4 py-1 hover:bg-black hover:text-white`}>
                    Out of Stock
                </button>
            </div>

            {/* LAYERED WITH */}
            <section className="mb-6">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    (checkedProducts && checkedProducts?.length > 0)
                                    && (checkedProducts?.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.category || 'N/A'}</TableCell>
                                            <TableCell>
                                                <span className={product.price && Number(product.price.slice(1)) > 0 ? 'text-green-500' : 'text-red-500'}>
                                                    {product.price && Number(product.price.slice(1)) > 0 ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </TableCell>
                                            <TableCell>{product.price ? `${product.price}` : 'N/A'}</TableCell>
                                        </TableRow>
                                    )))
                                }
                            </TableBody>


                        </Table>

                        {
                            checkedProducts?.length == 0 && (
                                <div className='opacity-50 w-full flex justify-center items-center py-20 '>
                                    <h2>Nothing found</h2>
                                </div>
                            )
                        }
                        <Button
                            className="w-full mb-6 rounded-none bg-black"
                            onClick={handleSaveAndContinue}
                            disabled={isLoading}>
                            {isLoading ? <LoadingSpinner /> : 'Save & Continue'}
                        </Button>
                    </>
                )}
            </section>
            {/* END OF LAYERED WITH PRODUCTS */}

            {/* ADD LAYER WITH */}
            <div>
                <h2 className="text-base font-semibold text-center md:text-left bg-gray-50 py-1 pl-2 mb-6">Add Best Sellers</h2>
                <form className="w-full md:flex-grow lg:max-w-[50%] relative mb-4 lg:mt-0" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Search By Name"
                        className="w-full px-6 py-2 rounded-full outline-none border-none bg-gray-50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    <ul className="space-y-2 w-full lg:w-[60%]">
                        {products?.map((product) => (
                            <li key={product.id} className="flex justify-between w-full items-center">
                                <span className='line-clamp-1'>{product.name}</span>
                                <div className='flex gap-3'>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className='hover:bg-black hover:text-white rounded-none'
                                        onClick={() => handleAddProduct(product.id)}
                                        disabled={product.checked}
                                    >
                                        {product.checked ? 'Added' : '+'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className='hover:bg-black hover:text-white rounded-none'
                                        onClick={() => handleRemoveProduct(product.id)}
                                        disabled={!product.checked}
                                    >
                                        -
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* END OF ADD LAYER WITH */}

        </div>
    )
}

export default LayerWithTable
