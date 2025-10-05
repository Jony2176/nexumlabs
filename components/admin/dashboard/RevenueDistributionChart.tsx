import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';

interface RevenueDistributionChartProps {
  data: { producto: string; valor: number; fill: string }[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-3 text-sm backdrop-blur-sm">
          <p className="font-bold text-white mb-1">{data.producto}</p>
          <p style={{ color: data.fill }}>
            Ingresos: <span className="font-semibold">{formatCurrency(data.valor)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

const RevenueDistributionChart: React.FC<RevenueDistributionChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white">De Dónde Vienen tus Ingresos</h3>
      <p className="text-sm text-gray-400 mb-4">Desglose de ingresos por producto este mes.</p>
      <div className="flex-grow h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="valor"
              nameKey="producto"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
       <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {data.map((entry, index) => (
                <div key={index} className="flex items-center text-xs">
                    <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.fill }}></div>
                    <span className="text-gray-400">{entry.producto}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default RevenueDistributionChart;