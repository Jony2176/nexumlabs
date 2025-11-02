import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';
import Card from '../../ui/Card';

interface RevenueDistributionChartProps {
  data: { producto: string; valor: number; fill: string }[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontSize: '12px'
        }}>
          <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>{data.producto}</p>
          <p style={{ color: data.fill }}>
            Ingresos: <span style={{ fontWeight: 600 }}>{formatCurrency(data.valor)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

const RevenueDistributionChart: React.FC<RevenueDistributionChartProps> = ({ data }) => {
  return (
    <Card className="p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-semibold text-text-primary">De Dónde Vienen tus Ingresos</h3>
      <p className="text-sm text-text-secondary mb-4">Desglose de ingresos por producto este mes.</p>
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
                    <span className="text-text-secondary">{entry.producto}</span>
                </div>
            ))}
        </div>
    </Card>
  );
};

export default RevenueDistributionChart;