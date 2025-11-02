
import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { PRICING_PLANS } from '../../constants';
import { useSubscription } from '../../hooks/useSubscription';
import MetricCard from './MetricCard';
import ResourceBar from './ResourceBar';
import SmartRecommendations from './SmartRecommendations';
import LoadingSpinner from '../ui/LoadingSpinner';
import UpsellBanner from './UpsellBanner';
import { USE_MOCK } from '../../services/api';
import DemoBanner from '../ui/DemoBanner';
import Card from '../ui/Card';

const DashboardBasico: React.FC = () => {
  const { user } = useAuthStore();
  const { subscription, isLoading } = useSubscription();

  const planName = PRICING_PLANS.find(p => p.id === subscription?.plan_id)?.name || subscription?.plan_id || 'Pro';
  
  const todayMetrics = {
    conversations: { value: 47, change: 12, trend: 'up' as const },
    calls: { value: 8, change: -5, trend: 'down' as const },
    appointments: { value: 6, change: 2, trend: 'up' as const },
    satisfaction: { value: 92, change: 1.5, trend: 'up' as const }
  };
  
  const resourceUsage = [
    { name: 'WhatsApp', used: 'Ilimitado', limit: 'Ilimitado', percentage: 100 },
    { name: 'Llamadas IA', used: '567 min', limit: '1000 min', percentage: 57 },
    { name: 'Usuarios', used: 3, limit: 5, percentage: 60 },
    { name: 'Storage', used: '2.4 GB', limit: '10 GB', percentage: 24 }
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header con saludo personalizado */}
      <div className="bg-gradient-to-r from-nexum-primary/20 to-nexum-secondary/20 rounded-xl p-6 text-white shadow-lg border border-border-color">
        <h1 className="text-3xl font-bold mb-2 text-text-primary">
          Bienvenido de vuelta, {user?.firstName} 👋
        </h1>
        <div className="flex justify-between items-center">
            <p className="opacity-90 capitalize text-text-secondary">
            Último acceso: Hoy 14:23 hs | Plan: {planName}
            </p>
            <span className="hidden sm:flex items-center gap-2 text-sm px-3 py-1 bg-green-400/20 text-green-300 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Sistema Operativo
            </span>
        </div>
      </div>

      {/* Métricas principales */}
      <div>
        <h2 className="text-xl font-bold mb-4 theme-text-primary">
          ⚡ Métricas de Performance Hoy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Conversaciones"
            value={todayMetrics.conversations.value}
            change={todayMetrics.conversations.change}
            trend={todayMetrics.conversations.trend}
            icon="💬"
          />
          <MetricCard 
            title="Llamadas IA"
            value={todayMetrics.calls.value}
            change={todayMetrics.calls.change}
            trend={todayMetrics.calls.trend}
            icon="📞"
          />
          <MetricCard 
            title="Citas Agendadas"
            value={todayMetrics.appointments.value}
            change={todayMetrics.appointments.change}
            trend={todayMetrics.appointments.trend}
            icon="📅"
          />
          <MetricCard 
            title="Satisfacción"
            value={`${todayMetrics.satisfaction.value}%`}
            change={todayMetrics.satisfaction.change}
            trend={todayMetrics.satisfaction.trend}
            icon="😊"
          />
        </div>
      </div>

      {/* Uso de recursos con barras de progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-bold mb-4 theme-text-primary">
            📊 Uso de Recursos del Plan
            </h2>
            <div className="space-y-4">
            {resourceUsage.map((resource, idx) => (
                <ResourceBar 
                key={idx}
                name={resource.name}
                used={resource.used}
                limit={resource.limit}
                percentage={resource.percentage}
                />
            ))}
            </div>
        </Card>

        {/* Recomendaciones inteligentes */}
        <SmartRecommendations />
      </div>
      
      {/* Upsell Banner */}
      <UpsellBanner />
    </div>
  );
};

export default DashboardBasico;
