import React from 'react';
import { Icon } from '@iconify/react';

interface CategoryMetricProps {
  title: string;
  count: number;
  icon: string; // Icon name
  color: string; // Icon color
}

const CategoryMetric: React.FC<CategoryMetricProps> = ({ title, count, icon, color }) => {
  return (
    <div className="bg-gray-100 pb-20 pt-14 px-2 justify-center md:justify-start rounded shadow flex gap-4">
      <div className="text-4xl">
        <Icon icon={icon} width={40} style={{ color }} />
      </div>
      <div className='flex flex-col'>
      <div className="font-medium">{title}</div>
      <div className="text-4xl font-semibold">{count}</div>
      </div>
    </div>
  );
};

export default CategoryMetric;
