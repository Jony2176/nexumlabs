import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { MRRHistoryData } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/badge';
import CardSkeleton from '../ui/CardSkeleton';
import toast from 'react-hot-toast';

const MRRGrowthChart: React.FC = () => {
  const [data, setData] = useState<MRRHistoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getAdminMRRHistory('last_12_months');
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch MRR history:", error);
        toast.error("No se pudo cargar el historial de MRR.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || data.length === 0) return <CardSkeleton />;
  
  const growthPercentage = data.length > 1 ? ((data[data.length - 1].mrr - data[0].mrr) / data[0].mrr * 100) : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Crecimiento de MRR (12 Meses)</h3>
        <Badge variant="success">
          +{growthPercentage.toFixed(1)}%
        </Badge>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorMRR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
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
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            tick={{ fill: '#9CA3AF' }}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.9)',
              border: '1px solid #4B5563',
              borderRadius: '0.5rem',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="mrr" 
            name="MRR Total"
            stroke="#3B82F6" 
            fillOpacity={1} 
            fill="url(#colorMRR)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Nuevo MRR</p>
          <p className="text-lg font-bold text-green-600">
            +${data[data.length - 1]?.new_mrr.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Churn MRR</p>
          <p className="text-lg font-bold text-red-600">
            -${data[data.length - 1]?.churned_mrr.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Expansión MRR</p>
          <p className="text-lg font-bold text-blue-600">
            +${data[data.length - 1]?.expansion_mrr.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default MRRGrowthChart;
