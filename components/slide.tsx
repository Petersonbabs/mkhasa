'use client'

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heading } from '@/components/heading';
import NewInSlide from './newInSlide';
// import CanBeLayeredWithSlide from './canBeLayeredWithSlide';
import DealsSlide from './deals';
import BestSellersSlide from './bestSellersSlide';
import FeaturedSlide from './featured';
// import FrequentlyBoughtSlide from './frequentlyBoughtSlide';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
);

export default function SlideManagement() {
    const [selectedSlide, setSelectedSlide] = useState<string>('best-sellers');
    const [isLoading, setIsLoading] = useState(false);

    const handleSlideChange = (newSlide: string) => {
        setIsLoading(true);
        setSelectedSlide(newSlide);
        setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust this time as needed
    };

    return (
        <div>
            <main>
                {/* Slide Selection Dropdown */}
                <div className="mb-6 flex justify-between">
                    <div>
                        <Heading>Slides</Heading>
                    </div>
                    <div>
                        <Select onValueChange={handleSlideChange} defaultValue="best-sellers">
                            <SelectTrigger className='bg-gray-100 rounded-none w-36 font-semibold'>
                                <SelectValue placeholder="Select slide" />
                            </SelectTrigger>
                            <SelectContent className='rounded-none bg-gray-100'>
                                <SelectItem value="new-in">New In</SelectItem>
                                <SelectItem value="best-sellers">Best Sellers</SelectItem>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="deals">Deals</SelectItem>
                                {/* <SelectItem value="frequently-bought-together">Frequently Bought Together</SelectItem> */}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {selectedSlide === 'best-sellers' && <BestSellersSlide />}
                        {selectedSlide === 'new-in' && <NewInSlide />}
                        {selectedSlide === 'featured' && <FeaturedSlide />}
                        {selectedSlide === 'deals' && <DealsSlide />}
                        {/* {selectedSlide === 'frequently-bought-together' && <FrequentlyBoughtSlide />} */}
                    </>
                )}
            </main>
        </div>
    );
}
