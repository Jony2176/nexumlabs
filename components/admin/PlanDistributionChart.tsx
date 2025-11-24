import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '../ui/Card';

interface PlanDistributionChartProps {
    data: Array<{ plan: string; count: number; percentage: number }>;
}

const PlanDistributionChart: React.FC<PlanDistributionChartProps> = ({ data }) => {
  const COLORS: { [key: string]: string } = {
    lite: '#94A3B8',
    start: '#3B82F6',
    pro: '#8B5CF6',
    professional: '#10B981',
    business: '#F59E0B',
    enterprise: '#EF4444',
  };

  const chartData = data.map(item => ({
    name: item.plan.charAt(0).toUpperCase() + item.plan.slice(1),
    value: item.count,
    color: COLORS[item.plan] || '#6B7280'
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Distribución de Clientes por Plan</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value} clientes`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((plan) => (
          <div key={plan.plan} className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[plan.plan] }} />
              <span className="text-sm capitalize">{plan.plan}</span>
            </div>
            <span className="text-sm font-bold">{plan.count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PlanDistributionChart;
