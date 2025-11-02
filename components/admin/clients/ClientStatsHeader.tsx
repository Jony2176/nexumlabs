import * as React from 'react';
import { Users, UserPlus, Clock, HeartHandshake } from 'lucide-react';
import { ClientData } from '../../../types';
import KPICard from '../dashboard/KPICard';

interface ClientStatsHeaderProps {
  clients: ClientData[];
}

const ClientStatsHeader: React.FC<ClientStatsHeaderProps> = ({ clients }) => {
  const stats = React.useMemo(() => {
    if (!clients) {
      return { activeClients: 0, trialClients: 0, newThisMonth: 0, retentionRate: 92 };
    }
    const activeClients = clients.filter(c => c.estado === 'active' || c.estado === 'trial').length;
    const trialClients = clients.filter(c => c.estado === 'trial').length;
    
    const startOfThisMonth = new Date();
    startOfThisMonth.setDate(1);
    startOfThisMonth.setHours(0, 0, 0, 0);

    const newThisMonth = clients.filter(c => new Date(c.fechaInicio) >= startOfThisMonth).length;
    
    // Mock retention rate as requested
    const retentionRate = 92;

    return { activeClients, trialClients, newThisMonth, retentionRate };
  }, [clients]);

  const kpis = [
    { title: "Total de Clientes", value: stats.activeClients.toString(), change: 3, trend: 'up' as const, icon: Users },
    { title: "Nuevos este Mes", value: stats.newThisMonth.toString(), change: 1, trend: 'up' as const, icon: UserPlus },
    { title: "En Período de Prueba", value: stats.trialClients.toString(), change: -2, trend: 'down' as const, icon: Clock },
    { title: "Tasa de Retención", value: `${stats.retentionRate}%`, change: 1.2, trend: 'up' as const, icon: HeartHandshake }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map(kpi => (
        <KPICard 
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          change={kpi.change}
          trend={kpi.trend}
          icon={kpi.icon}
        />
      ))}
    </div>
  );
};

export default ClientStatsHeader;