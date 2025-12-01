import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { RevenueHistoryData } from '../../types';
import Card from '../ui/Card';
import CardSkeleton from '../ui/CardSkeleton';
import toast from 'react-hot-toast';

const RevenueOverTimeChart: React.FC<{ affiliateId: string }> = ({ affiliateId }) => {
  const [data, setData] = useState<RevenueHistoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getAffiliateRevenue(affiliateId, 'last_6_months');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch revenue history:", error);
        toast.error("No se pudo cargar el historial de ingresos.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [affiliateId]);

  if (loading) return <CardSkeleton />;

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Revenue Últimos 6 Meses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
          <XAxis 
            dataKey="month" 
            tickFormatter={(month) => {
              const [_, m] = month.split('-');
              const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
              return monthNames[parseInt(m) - 1];
            }}
            tick={{ fill: '#9CA3AF' }}
            fontSize={12}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: '#9CA3AF' }}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number) => `$${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E7EB',
              borderRadius: '0.5rem',
              color: '#1F2937',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            itemStyle={{ color: '#1F2937' }}
            labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
            cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
          />
          <Legend wrapperStyle={{ color: '#9CA3AF' }}/>
          <Bar dataKey="first_month" name="Primer Mes (25%)" stackId="a" fill="#3B82F6" />
          <Bar dataKey="recurring" name="Recurrente (10%)" stackId="a" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 flex justify-between text-sm">
        <div>
          <span className="font-medium text-gray-600 dark:text-gray-400">Total 6 meses:</span>
          <span className="ml-2 text-lg font-bold text-green-600 dark:text-green-400">
            ${data.reduce((sum, m) => sum + m.total, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default RevenueOverTimeChart;