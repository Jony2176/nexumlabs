

import React, { useState, useEffect } from 'react';
import { kpis, mrrData, revenueByProduct, clientsData, quickActions, alerts, topAffiliates } from '../../data/adminDashboardMockData';
import KPICard from '../../components/admin/dashboard/KPICard';
import MRRChart from '../../components/admin/dashboard/MRRChart';
import RevenueDistributionChart from '../../components/admin/dashboard/RevenueDistributionChart';
import ClientsTable from '../../components/admin/dashboard/ClientsTable';
import QuickActions from '../../components/admin/dashboard/QuickActions';
import AlertsPanel from '../../components/admin/dashboard/AlertsPanel';
import TopAffiliates from '../../components/affiliates/admin/TopAffiliates';
import DashboardSkeleton from '../../components/admin/dashboard/DashboardSkeleton';
import { DollarSign, FileText, Filter, Calendar } from 'lucide-react';

const AdminPanelPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="space-y-8 animate-slideIn">
            {/* Header */}
            <div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Panel de Administración Principal</h1>
                        <p className="text-gray-400 mt-1">Visión general del negocio en tiempo real.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm theme-text-primary bg-bg-surface border theme-border rounded-lg hover:bg-bg-secondary">
                            <Calendar className="h-4 w-4" />
                            <span>Este Mes</span>
                        </button>
                         <button className="flex items-center gap-2 px-4 py-2 text-sm theme-text-primary bg-bg-surface border theme-border rounded-lg hover:bg-bg-secondary">
                            <Filter className="h-4 w-4" />
                            <span>Filtros</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm theme-text-primary bg-bg-surface border theme-border rounded-lg hover:bg-bg-secondary">
                           <FileText className="h-4 w-4" />
                            <span>Exportar</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {kpis.map((kpi, index) => (
                    <KPICard key={index} {...kpi} />
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <MRRChart data={mrrData} />
                </div>
                <div>
                    <RevenueDistributionChart data={revenueByProduct} />
                </div>
            </div>

            {/* Client Table */}
            <div>
                <ClientsTable data={clientsData} />
            </div>

            {/* Quick Actions, Alerts, and Affiliates */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1">
                    <QuickActions actions={quickActions} />
                </div>
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <AlertsPanel alerts={alerts} />
                     <TopAffiliates affiliates={topAffiliates} />
                </div>
            </div>
        </div>
    );
};

export default AdminPanelPage;