import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AdminOverviewData } from '../../types';
import api from '../../services/api';
import { DollarSign, Building, Users, UserCheck, Clock, TrendingDown, Wallet, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

import AdminDashboardHeader from '../../components/admin/AdminDashboardHeader';
import MetricCard from '../../components/admin/MetricCard';
import MRRGrowthChart from '../../components/admin/MRRGrowthChart';
import PlanDistributionChart from '../../components/admin/PlanDistributionChart';
import TopAffiliatesTable from '../../components/admin/TopAffiliatesTable';
import CriticalAlertsTable from '../../components/admin/CriticalAlertsTable';
import AggregatedUsageChart from '../../components/admin/AggregatedUsageChart';

const AdminDashboardPage: React.FC = () => {
    const [data, setData] = useState<AdminOverviewData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (isAutoRefresh = false) => {
            if (!isAutoRefresh) setIsLoading(true);
            try {
                const response = await api.getAdminOverview();
                setData(response);
            } catch (error) {
                if (!isAutoRefresh) {
                    toast.error("No se pudieron cargar los datos del dashboard de admin.");
                }
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        // Configurar actualización automática cada 30 segundos
        const intervalId = setInterval(() => {
            fetchData(true);
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);


    if (isLoading || !data) {
        return <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>;
    }

    return (
        <div className="space-y-8">
            <AdminDashboardHeader />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="MRR Total" value={`$${data.metrics.mrr_usd.toLocaleString()}`} change={12} icon={<DollarSign />} />
                <MetricCard title="Organizaciones Activas" value={data.metrics.active_organizations.toString()} total={data.metrics.total_organizations} icon={<Building />} />
                <MetricCard title="Usuarios Activos" value={data.metrics.active_users.toString()} total={data.metrics.total_users} icon={<Users />} />
                <MetricCard title="Afiliados Activos" value={data.metrics.active_affiliates.toString()} icon={<UserCheck />} />
                <MetricCard title="En Trial" value={data.metrics.trialing_organizations.toString()} icon={<Clock />} />
                <MetricCard title="Churn Rate" value={`${(data.metrics.churn_rate * 100).toFixed(1)}%`} change={-2} icon={<TrendingDown />} />
                <MetricCard title="Comisiones Pendientes" value={`$${data.metrics.pending_commissions_usd.toLocaleString()}`} icon={<Wallet />} />
                <MetricCard title="Alertas Críticas" value={data.critical_alerts.length.toString()} severity="critical" icon={<AlertTriangle />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MRRGrowthChart />
                <PlanDistributionChart data={data.plan_distribution} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopAffiliatesTable data={data.top_affiliates} />
                <CriticalAlertsTable data={data.critical_alerts} />
            </div>

            <AggregatedUsageChart />
        </div>
    );
};

export default AdminDashboardPage;