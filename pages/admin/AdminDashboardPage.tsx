
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { kpis, mrrData, revenueByProduct, clientsData, quickActions, alerts, topAffiliates } from '../../data/adminDashboardMockData';
import KPICard from '../../components/admin/dashboard/KPICard';
import MRRChart from '../../components/admin/dashboard/MRRChart';
import RevenueDistributionChart from '../../components/admin/dashboard/RevenueDistributionChart';
import ClientsTable from '../../components/admin/dashboard/ClientsTable';
import QuickActions from '../../components/admin/dashboard/QuickActions';
import AlertsPanel from '../../components/admin/dashboard/AlertsPanel';
import TopAffiliates from '../../components/affiliates/admin/TopAffiliates';
import DashboardSkeleton from '../../components/admin/dashboard/DashboardSkeleton';
import { DollarSign, FileText, Filter, Calendar, X } from 'lucide-react';
import Button from '../../components/ui/Button';

const AdminPanelPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById('date-dropdown-container');
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setIsDateDropdownOpen(false);
            }
        };

        if (isDateDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDateDropdownOpen]);


    const handleExport = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 2000)),
            {
                loading: 'Generando reporte...',
                success: '¡Reporte exportado! Revisa tus descargas.',
                error: 'No se pudo exportar el reporte.',
            }
        );
    };

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <>
            <div className="space-y-8 animate-slideIn">
                {/* Header */}
                <div>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-text-primary">Panel de Administración Principal</h1>
                            <p className="text-text-primary mt-1">Visión general del negocio en tiempo real.</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <div id="date-dropdown-container" className="relative">
                                <button onClick={() => setIsDateDropdownOpen(prev => !prev)} className="flex items-center gap-2 px-4 py-2 text-sm theme-text-primary bg-bg-surface border theme-border rounded-lg hover:bg-bg-secondary">
                                    <Calendar className="h-4 w-4" />
                                    <span>Este Mes</span>
                                </button>
                                {isDateDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-bg-surface border theme-border rounded-lg shadow-lg z-10 animate-slideIn">
                                        <a href="#" onClick={() => setIsDateDropdownOpen(false)} className="block px-4 py-2 text-sm theme-text-primary hover:bg-bg-secondary">Hoy</a>
                                        <a href="#" onClick={() => setIsDateDropdownOpen(false)} className="block px-4 py-2 text-sm theme-text-primary hover:bg-bg-secondary">Últimos 7 días</a>
                                        <a href="#" onClick={() => setIsDateDropdownOpen(false)} className="block px-4 py-2 text-sm theme-text-primary hover:bg-bg-secondary">Este Mes</a>
                                        <a href="#" onClick={() => setIsDateDropdownOpen(false)} className="block px-4 py-2 text-sm theme-text-primary hover:bg-bg-secondary">Últimos 30 días</a>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setIsFilterModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm theme-text-primary bg-bg-surface border theme-border rounded-lg hover:bg-bg-secondary">
                                <Filter className="h-4 w-4" />
                                <span>Filtros</span>
                            </button>
                            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 text-sm theme-text-primary bg-bg-surface border theme-border rounded-lg hover:bg-bg-secondary">
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

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={() => setIsFilterModalOpen(false)}>
                    <div className="theme-bg-surface rounded-xl shadow-2xl w-full max-w-lg border theme-border animate-slideIn" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b theme-border flex justify-between items-center">
                            <h2 className="text-xl font-bold">Filtros Avanzados</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsFilterModalOpen(false)}><X /></Button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Plan de Cliente</label>
                                <select className="input-premium w-full"><option>Todos</option><option>Lite</option><option>Pro</option><option>Professional</option><option>Business</option></select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Estado de Cliente</label>
                                <select className="input-premium w-full"><option>Todos</option><option>Activo</option><option>Trial</option><option>Cancelado</option></select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Salud de la Cuenta (Health Score)</label>
                                <input type="range" className="w-full" />
                            </div>
                        </div>
                        <div className="p-4 theme-bg-secondary rounded-b-xl flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsFilterModalOpen(false)}>Cancelar</Button>
                             <Button onClick={() => { setIsFilterModalOpen(false); toast.success('Filtros aplicados.'); }}>Aplicar Filtros</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPanelPage;
