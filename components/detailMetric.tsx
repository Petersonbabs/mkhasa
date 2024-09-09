import React from 'react';
import { Icon } from '@iconify/react';

interface DetailMetricProps {
  title: string;
  count: number;
  icon: string; // Icon name
  backgroundColor: string; // Icon backgorund color
}

const DetailMetric: React.FC<DetailMetricProps> = ({ title, count, icon, backgroundColor }) => {
  return (
    <div className="pb-5 px-2 justify-center md:justify-start rounded flex gap-4">
      <div className="text-4xl p-4 rounded-full" style={{ backgroundColor }}>
        <Icon icon={icon} width={40} className='text-white' />
      </div>
      <div className='flex flex-col'>
      <div className="font-medium">{title}</div>
      <div className="text-4xl font-semibold">{count}</div>
      </div>
    </div>
  );
};

export default DetailMetric;
