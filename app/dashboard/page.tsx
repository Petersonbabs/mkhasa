"use client";

import React, { useEffect, useState } from "react";
import { Wrapper } from "@/components/wrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/sidebar";
import DashboardMetric from "@/components/dashboardMetric";
import EarningsChart from "@/components/earningChart";
import TopSellingProductsTable from "@/components/topSellingTable";
import withAuth from "@/components/withAuth";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-app-red"></div>
  </div>
);

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [dispatchedOrderCount, setDispatchedOrderCount] = useState(0);
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(0);
  const [inventoryOrderCount, setInventoryOrderCount] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user?._id) {
        fetchDashboardData(session.user._id);
      } else {
        console.error("Session user ID is undefined");
        setIsLoading(false); // Ensure loading state is turned off
      }
    }
  }, [status, router, session]);

  const fetchDashboardData = async (adminId: string) => {
    setIsLoading(true);
    try {
      const [pendingResponse, dispatchedResponse, deliveredResponse, inventoryResponse] = await Promise.all([
        axios.get(`/api/proxy?path=count/pending/order&adminId=${adminId}`),
        axios.get(`/api/proxy?path=count/dispatched/order&adminId=${adminId}`),
        axios.get(`/api/proxy?path=count/delivered/order&adminId=${adminId}`),
        axios.get(`/api/proxy?path=low/quantity&adminId=${adminId}`),
      ]);     

      setPendingOrderCount(Number(pendingResponse.data));
      setDispatchedOrderCount(Number(dispatchedResponse.data));
      setDeliveredOrderCount(Number(deliveredResponse.data));
      setInventoryOrderCount(Number(inventoryResponse.data.lowQuantityCount));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || status === "loading") {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return (
    <Wrapper>
      <div className="flex mb-5">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <DashboardMetric title="Pending Orders" count={pendingOrderCount} icon="material-symbols:pending" color="#F24E1E" />
            <DashboardMetric title="Dispatched Orders" count={dispatchedOrderCount} icon="solar:delivery-bold" color="#4ECB71" />
            <DashboardMetric title="Low Inventory Orders" count={inventoryOrderCount} icon="material-symbols:inventory" color="#4E7CCB" />
            <DashboardMetric title="Delivered Orders" count={deliveredOrderCount} icon="hugeicons:package-delivered" color="#4ECB71" />
          </div>
        </div>
      </div>
      <div className="mb-20">
        <EarningsChart />
      </div>
      <TopSellingProductsTable />
    </Wrapper>
  );
};

export default withAuth(Dashboard);
