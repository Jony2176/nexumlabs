
import React from 'react';
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';

interface CashFlowChartProps {
  data: any[];
}

const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-white">Flujo de Caja (Últimos 6 meses)</h3>
      <p className="text-sm text-gray-400 mb-4">Comparación entre dinero que entra y sale.</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis yAxisId="left" tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: '#FBBF24', fontSize: 12 }} />
            <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
                labelStyle={{ color: '#f9fafb' }}
                formatter={(value: number) => formatCurrency(value)}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Bar yAxisId="left" dataKey="ingresos" barSize={20} fill="#22C55E" name="Ingresos" />
            <Bar yAxisId="left" dataKey="gastos" barSize={20} fill="#EF4444" name="Gastos" />
            <Line yAxisId="right" type="monotone" dataKey="balance" stroke="#FBBF24" strokeWidth={2} name="Balance Acumulado" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowChart;