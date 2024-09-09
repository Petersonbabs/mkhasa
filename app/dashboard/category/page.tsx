"use client"

import React, {useEffect, useState} from 'react';
import { Wrapper } from '@/components/wrapper';
import CategoryTable from '@/components/categoryTable';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
  </div>
);

const CategoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      // Simulate loading delay
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 500); // Adjust this value as needed

      return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
      return <LoadingSpinner />;
  }
  
  return (
    <Wrapper>
      <CategoryTable/>
    </Wrapper>
  );
};

export default CategoryPage;
