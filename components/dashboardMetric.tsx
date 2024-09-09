// components/DashboardMetric.tsx
import React from 'react';
import { Icon } from '@iconify/react';

interface DashboardMetricProps {
  title: string;
  count: number;
  icon: string; // Updated to accept icon name
  color: string; // Icon color
}

const DashboardMetric: React.FC<DashboardMetricProps> = ({ title, count, icon, color }) => {
  return (
    <div className="bg-gray-100 p-4 h-52 rounded shadow-md flex flex-col items-center md:items-start justify-center space-x-4">
      <div className="text-4xl flex gap-2 items-center mb-3">
        <Icon icon={icon} style={{ color }} />
        <div className="text-gray-500 text-base">{title}</div>
      </div>
      <div>
        <div className="text-5xl font-medium relative right-3">{count}</div>
      </div>
    </div>
  );
};

export default DashboardMetric;
