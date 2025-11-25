import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UsageHistoryData } from '../../types';
import api from '../../services/api';
import Card from '../ui/Card';
import CardSkeleton from '../ui/CardSkeleton';
import toast from 'react-hot-toast';

interface UsageOverTimeChartProps {
  orgId: string;
}

const UsageOverTimeChart: React.FC<UsageOverTimeChartProps> = ({ orgId }) => {
  const [data, setData] = useState<UsageHistoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getClientUsageHistory(orgId, 'last_30_days');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch usage history:", error);
        toast.error("No se pudieron cargar los datos de uso.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orgId]);

  if (loading) return <CardSkeleton />;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Uso en los Últimos 30 Días</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            tick={{ fill: '#9CA3AF' }}
            fontSize={12}
          />
          <YAxis tick={{ fill: '#9CA3AF' }} fontSize={12} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              color: '#1F2937',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            itemStyle={{ color: '#1F2937' }}
            labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
            formatter={(value: number) => value.toLocaleString()}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="whatsapp_messages" 
            name="Mensajes WhatsApp"
            stroke="#3B82F6" 
            strokeWidth={2} 
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="call_minutes" 
            name="Minutos de Llamadas"
            stroke="#10B981" 
            strokeWidth={2} 
            dot={{ r: 4 }}
          />
          {data.some(d => d.avatar_queries > 0) && (
            <Line 
              type="monotone" 
              dataKey="avatar_queries" 
              name="Consultas Avatar"
              stroke="#8B5CF6" 
              strokeWidth={2} 
              dot={{ r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default UsageOverTimeChart;