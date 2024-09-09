import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const OrderStatistics = () => {
  const [totalOrder, setTotalOrder] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Assuming these values still come from props or state
  const returns = 9;
  const deliveredOrdersOverTime = 598;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user?._id) {
        fetchTotalOrder(session.user._id);
        fetchDailyCount(session.user._id);
      } else {
        console.error("Session user ID is undefined");
        setLoading(false);
      }
    }
  }, [status, router, session]);

  const fetchTotalOrder = async (adminId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/count/all/order/${adminId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch total order');
      }
      const data = await response.json();
      setTotalOrder(data); // Assuming the API returns an object with a 'count' property
    } catch (error) {
      console.error('Error fetching daily count:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDailyCount = async (adminId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://mkhasa-bfdb6fabd978.herokuapp.com/api/v1/daily/user/${adminId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch total order');
      }
      const data = await response.json();
      setDailyCount(data); // Assuming the API returns an object with a 'count' property
    } catch (error) {
      console.error('Error fetching daily count:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center my-4 p-2 bg-gray-100 rounded">
        <h2 className="text-3xl pb-3 lg:pb-0">Today</h2>
      <div className='grid justify-around grid-cols-2 lg:grid-cols-4 items-center gap-8'>
      <div className="text-center">    
        <p className='text-xs lg:text-base'>Total Order</p>
        <h2 className="text-3xl font-bold">{totalOrder}</h2>
      </div>
      <div className="text-center">        
        <p className='text-xs lg:text-base'>Ordered Items Over Time</p>
        <h2 className="text-3xl font-bold">{dailyCount}</h2>
      </div>
      <div className="text-center">        
        <p className='text-xs lg:text-base'>Returns</p>
        <h2 className="text-3xl font-bold">{returns}</h2>
      </div>
      <div className="text-center">        
        <p className='text-xs lg:text-base'>Delivered Orders Over Time</p>
        <h2 className="text-3xl font-bold">{deliveredOrdersOverTime}</h2>
      </div>
      </div>
    </div>
  );
};

export default OrderStatistics;
