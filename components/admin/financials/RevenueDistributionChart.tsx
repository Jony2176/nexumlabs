
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';

interface RevenueDistributionChartProps {
  data: { name: string; value: number; fill: string }[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percent = ((data.value / data.payload.total) * 100).toFixed(1);
      return (
        <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-3 text-sm backdrop-blur-sm">
          <p className="font-bold text-white mb-1">{data.name}</p>
          <p style={{ color: data.payload.fill }}>
            Ingresos: <span className="font-semibold">{formatCurrency(data.value)} ({percent}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

const RevenueDistributionChart: React.FC<RevenueDistributionChartProps> = ({ data }) => {
  const totalRevenue = data.reduce((acc, entry) => acc + entry.value, 0);
  const chartData = data.map(item => ({...item, total: totalRevenue}));

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white">De Dónde Vienen tus Ingresos</h3>
      <p className="text-sm text-gray-400 mb-4">Desglose de ingresos por producto.</p>
      <div className="flex-grow h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
       <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {data.map((entry, index) => (
                <div key={index} className="flex items-center text-xs">
                    <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.fill }}></div>
                    <span className="text-gray-400">{entry.name}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default RevenueDistributionChart;