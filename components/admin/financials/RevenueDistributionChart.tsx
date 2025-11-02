import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';
import Card from '../../ui/Card';

interface RevenueDistributionChartProps {
  data: { name: string; value: number; fill: string }[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percent = ((data.value / data.payload.total) * 100).toFixed(1);
      return (
        <div style={{
            backgroundColor: 'var(--bg-surface)', 
            border: '1px solid var(--border-color)', 
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontSize: '12px',
        }}>
          <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>{data.name}</p>
          <p style={{ color: data.payload.fill }}>
            Ingresos: <span style={{ fontWeight: 600 }}>{formatCurrency(data.value)} ({percent}%)</span>
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
    <Card className="p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-semibold text-text-primary">De Dónde Vienen tus Ingresos</h3>
      <p className="text-sm text-text-secondary mb-4">Desglose de ingresos por producto.</p>
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
                    <span className="text-text-secondary">{entry.name}</span>
                </div>
            ))}
        </div>
    </Card>
  );
};

export default RevenueDistributionChart;