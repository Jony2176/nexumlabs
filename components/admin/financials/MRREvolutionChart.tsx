import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';
import Card from '../../ui/Card';

interface MRRChartProps {
  data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const real = payload.find((p: any) => p.dataKey === 'real');
    const proyectado = payload.find((p: any) => p.dataKey === 'proyectado');
    return (
      <div style={{
          backgroundColor: 'var(--bg-surface)', 
          border: '1px solid var(--border-color)', 
          padding: '12px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          fontSize: '12px',
      }}>
        <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>{label}</p>
        {real && real.value && (
          <p style={{ color: real.stroke }}>
            Real: <span style={{ fontWeight: 600 }}>{formatCurrency(real.value)}</span>
          </p>
        )}
        {proyectado && (
          <p style={{ color: proyectado.stroke }}>
            Proyectado: <span style={{ fontWeight: 600 }}>{formatCurrency(proyectado.value)}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

const MRREvolutionChart: React.FC<MRRChartProps> = ({ data }) => {
  return (
    <Card className="p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-text-primary">Evolución de Ingresos Mensuales</h3>
      <p className="text-sm text-text-secondary mb-4">Cómo han crecido tus ingresos mes a mes.</p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="mes" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "12px", color: 'var(--text-secondary)'}}/>
            <ReferenceLine y={100000} label={{ value: "Objetivo Anual", position: 'insideTopLeft', fill: '#f87171' }} stroke="#f87171" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="real" stroke="#6366F1" strokeWidth={2} name="Ingresos Reales" dot={{ r: 4 }} activeDot={{ r: 6 }}/>
            <Line type="monotone" dataKey="proyectado" stroke="#34D399" strokeWidth={2} strokeDasharray="5 5" name="Proyección" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MRREvolutionChart;