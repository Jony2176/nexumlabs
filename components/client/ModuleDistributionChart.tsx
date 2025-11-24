import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { UsageHistoryData } from '../../types';
import api from '../../services/api';
import Card from '../ui/Card';
import CardSkeleton from '../ui/CardSkeleton';
import toast from 'react-hot-toast';

interface ModuleDistributionChartProps {
    orgId: string;
}

const ModuleDistributionChart: React.FC<ModuleDistributionChartProps> = ({ orgId }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processData = (rawData: UsageHistoryData[]) => {
        if (!rawData) return [];
        const totals = rawData.reduce((acc, day) => ({
            whatsapp: acc.whatsapp + (day.whatsapp_messages || 0),
            calls: acc.calls + (day.call_minutes || 0),
            avatar: acc.avatar + (day.avatar_queries || 0),
        }), { whatsapp: 0, calls: 0, avatar: 0 });

        return [
            { name: 'WhatsApp Bot', value: totals.whatsapp, color: '#3B82F6' },
            { name: 'Llamadas IA', value: totals.calls, color: '#10B981' },
            { name: 'Avatar Partner', value: totals.avatar, color: '#8B5CF6' },
        ].filter(item => item.value > 0);
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getClientUsageHistory(orgId, 'current_month');
        setData(processData(response.data));
      } catch (error) {
        console.error("Failed to fetch usage history for chart:", error);
        toast.error("No se pudo cargar el gráfico de distribución.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orgId]);


  if (loading) return <CardSkeleton />;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Distribución de Uso Este Mes</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ModuleDistributionChart;
