import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const data = [
  { month: 'Jun', whatsapp: 12500, calls: 980, avatar: 120, predict: 15 },
  { month: 'Jul', whatsapp: 18200, calls: 1450, avatar: 350, predict: 45 },
  { month: 'Ago', whatsapp: 24800, calls: 1900, avatar: 680, predict: 90 },
  { month: 'Sep', whatsapp: 32500, calls: 2400, avatar: 950, predict: 150 },
  { month: 'Oct', whatsapp: 45200, calls: 3100, avatar: 1400, predict: 280 },
  { month: 'Nov', whatsapp: 58900, calls: 4200, avatar: 2100, predict: 450 },
];

const AggregatedUsageChart: React.FC = () => {
  return (
    <Card className="p-6 mt-8 shadow-lg">
      <h3 className="text-lg font-bold mb-4 text-text-primary">Uso Agregado de Módulos</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis 
                dataKey="month" 
                tick={{ fill: 'var(--text-secondary)' }} 
                axisLine={{ stroke: 'var(--border-color)' }}
                tickLine={false}
                fontSize={12}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              tick={{ fill: 'var(--text-secondary)' }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{ fill: 'var(--text-secondary)' }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E5E7EB',
                borderRadius: '0.5rem',
                color: '#1F2937',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: '#1F2937' }}
              labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
              cursor={{fill: 'transparent'}}
            />
            <Legend wrapperStyle={{ color: 'var(--text-secondary)' }}/>
            <Bar yAxisId="left" dataKey="whatsapp" name="WhatsApp (Msjs)" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar yAxisId="right" dataKey="calls" name="Llamadas (Min)" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar yAxisId="right" dataKey="avatar" name="Avatar (Consultas)" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar yAxisId="right" dataKey="predict" name="Predict (Casos)" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AggregatedUsageChart;