import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
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
        fontSize: '12px'
      }}>
        <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>{label}</p>
        {real && real.value && (
          <p style={{ color: real.color }}>
            Real: <span style={{ fontWeight: 600 }}>{formatCurrency(real.value)}</span>
          </p>
        )}
        {proyectado && (
          <p style={{ color: proyectado.color }}>
            Proyectado: <span style={{ fontWeight: 600 }}>{formatCurrency(proyectado.value)}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
};

const MRRChart: React.FC<MRRChartProps> = ({ data }) => {
  return (
    <Card className="p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-text-primary">Evolución de Ingresos Mensuales</h3>
      <p className="text-sm text-text-secondary mb-4">Cómo han crecido tus ingresos mes a mes.</p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <defs>
                <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="mes" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "12px", color: 'var(--text-secondary)'}}/>
            <Area type="monotone" dataKey="real" stroke="#667eea" strokeWidth={2} fill="url(#colorReal)" name="Ingresos Reales" />
            <Line type="monotone" dataKey="proyectado" stroke="#34d399" strokeWidth={2} strokeDasharray="5 5" name="Proyección" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MRRChart;