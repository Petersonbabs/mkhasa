import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    Scale,
    CoreScaleOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EarningsChart = () => {
    const data = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
            {
                label: 'First Half',
                data: [2900000, 1200000, 500000, 1500000, 1950000, 2500000, 1300000, 1900000, 400000, 900000, 2400000, 2700000],
                borderColor: '#50DD57',
                backgroundColor: '#50DD57',
                fill: true,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 8,
            },
            {
                label: 'Top Gross',
                data: [3800000, 2000000, 1000000, 2500000, 2300000, 3500000, 2400000, 2900000, 800000, 1500000, 2800000, 4000000],
                borderColor: '#2E36AA',
                backgroundColor: '#2E36AA',
                fill: true,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 8,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end',
                labels: {
                    usePointStyle: true,
                    font: {
                        size: 14,
                        weight: 'bold',         
                    },                
                  },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5000000, // Increased to 5M
                ticks: {
                    callback: function (this: Scale<CoreScaleOptions>, tickValue: number | string): string | null {
                        const value = Number(tickValue);
                        if (value === 0) return '0';
                        if (value === 1000000) return '1M';
                        if (value === 2000000) return '2M';
                        if (value === 3000000) return '3M';
                        if (value === 4000000) return '4M';
                        if (value === 5000000) return '5M';
                        return null;
                    },
                    stepSize: 1000000, // Adjusted step size
                },
            },
        },
    };

    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <h2 className="text-xl font-bold mb-4">Earnings</h2>            
            <Line data={data} options={options} />
        </div>
    );
};

export default EarningsChart;