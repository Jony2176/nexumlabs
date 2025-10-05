
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
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
          <p style={{ color: real.stroke }}>
            Real: <span className="font-semibold">{formatCurrency(real.value)}</span>
          </p>
        )}
        {proyectado && (
          <p style={{ color: proyectado.stroke }}>
            Proyectado: <span className="font-semibold">{formatCurrency(proyectado.value)}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

const MRREvolutionChart: React.FC<MRRChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-white">Evolución de Ingresos Mensuales</h3>
      <p className="text-sm text-gray-400 mb-4">Cómo han crecido tus ingresos mes a mes.</p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="mes" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <ReferenceLine y={100000} label={{ value: "Objetivo Anual", position: 'insideTopLeft', fill: '#f87171' }} stroke="#f87171" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="real" stroke="#6366F1" strokeWidth={2} name="Ingresos Reales" dot={{ r: 4 }} activeDot={{ r: 6 }}/>
            <Line type="monotone" dataKey="proyectado" stroke="#34D399" strokeWidth={2} strokeDasharray="5 5" name="Proyección" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MRREvolutionChart;