'use client';

import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <div className="w-32 h-32 border-4 border-transparent border-t-[#A40001] border-b-[#A40001] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;