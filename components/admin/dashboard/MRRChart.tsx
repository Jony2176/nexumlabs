import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';

interface MRRChartProps {
  data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const real = payload.find((p: any) => p.dataKey === 'real');
    const proyectado = payload.find((p: any) => p.dataKey === 'proyectado');
    return (
      <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-3 text-sm backdrop-blur-sm">
        <p className="font-bold text-white mb-2">{label}</p>
        {real && real.value && (
          <p style={{ color: real.color }}>
            Real: <span className="font-semibold">{formatCurrency(real.value)}</span>
          </p>
        )}
        {proyectado && (
          <p style={{ color: proyectado.color }}>
            Proyectado: <span className="font-semibold">{formatCurrency(proyectado.value)}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

const MRRChart: React.FC<MRRChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-white">Evolución de Ingresos Mensuales</h3>
      <p className="text-sm text-gray-400 mb-4">Cómo han crecido tus ingresos mes a mes.</p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <defs>
                <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="mes" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Area type="monotone" dataKey="real" stroke="#667eea" strokeWidth={2} fill="url(#colorReal)" name="Ingresos Reales" />
            <Line type="monotone" dataKey="proyectado" stroke="#34d399" strokeWidth={2} strokeDasharray="5 5" name="Proyección" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MRRChart;