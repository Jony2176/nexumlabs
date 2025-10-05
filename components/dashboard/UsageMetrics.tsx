

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const data = [
  { name: 'Enero', conversaciones: 4000, tokens: 24000 },
  { name: 'Febrero', conversaciones: 3000, tokens: 13980 },
  { name: 'Marzo', conversaciones: 2000, tokens: 98000 },
  { name: 'Abril', conversaciones: 2780, tokens: 39080 },
  { name: 'Mayo', conversaciones: 1890, tokens: 48000 },
  { name: 'Junio', conversaciones: 2390, tokens: 38000 },
  { name: 'Julio', conversaciones: 3490, tokens: 43000 },
];

const UsageMetrics: React.FC = () => {
  const totalConversations = data.reduce((acc, item) => acc + item.conversaciones, 0);
  const totalTokens = data.reduce((acc, item) => acc + item.tokens, 0);

  return (
    <div className="dashboard-section">
      <h2 className="text-2xl font-bold theme-text-primary mb-6">Métricas de Uso</h2>
      
      <Card>
        <div className="p-6">
            {/* Header del gráfico */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold theme-text-primary mb-1">ELIAS - Resumen General</h3>
                <p className="theme-text-secondary text-sm">Rendimiento de los módulos de IA en los últimos meses.</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">{totalConversations.toLocaleString('es-AR')}</div>
                  <div className="text-xs theme-text-muted">Conversaciones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-500">{totalTokens.toLocaleString('es-AR')}</div>
                  <div className="text-xs theme-text-muted">Tokens IA</div>
                </div>
              </div>
            </div>
            
            {/* Contenedor del gráfico */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{
                      top: 5,
                      right: 20,
                      left: -10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)' }} fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" tick={{ fill: 'var(--text-muted)' }} fontSize={12} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" tick={{ fill: 'var(--text-muted)' }} fontSize={12} axisLine={false} tickLine={false}/>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-color)',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Bar yAxisId="left" dataKey="conversaciones" fill="#3B82F6" name="Conversaciones" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="tokens" fill="#10B981" name="Tokens de IA (en miles)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
            </div>
          
            {/* Leyenda */}
            <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm theme-text-secondary">Conversaciones</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm theme-text-secondary">Tokens de IA</span>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default UsageMetrics;