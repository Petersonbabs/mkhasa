"use client"

import React, { useEffect, useState } from 'react';
import { Wrapper } from '@/components/wrapper';
import SlideManagement from '@/components/slide';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
  </div>
);

const SlidePage = () => {
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
      <SlideManagement />
    </Wrapper>
  );
};

export default SlidePage;
