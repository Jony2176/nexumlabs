
import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Download, Users, DollarSign, Clock, Percent } from 'lucide-react';
import toast from 'react-hot-toast';

import StatsCard from '../../components/dashboard/StatsCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import TopAffiliates from '../../components/affiliates/admin/TopAffiliates';
import AffiliatesTable from '../../components/affiliates/admin/AffiliatesTable';

import { MOCK_AFFILIATES } from '../../data/affiliateMockData';
import { topAffiliates } from '../../data/adminDashboardMockData';
import { useDualPrice } from '../../hooks/useDualPrice';

const AfiliadosAdminPage: React.FC = () => {
    // KPI Calculations
    const activeAffiliates = MOCK_AFFILIATES.filter(a => a.estado === 'active').length;
    const monthlyRevenue = MOCK_AFFILIATES.reduce((sum, a) => sum + a.revenue.current_month, 0);
    const pendingCommissions = MOCK_AFFILIATES.reduce((sum, a) => sum + a.commission.pending, 0);
    const avgConversionRate = MOCK_AFFILIATES.length > 0
        ? MOCK_AFFILIATES.reduce((sum, a) => sum + a.conversion_rate, 0) / MOCK_AFFILIATES.length
        : 0;
        
    const { priceInfo: revenuePrice, isLoading: isRevenueLoading } = useDualPrice(monthlyRevenue);
    const { priceInfo: commissionsPrice, isLoading: isCommissionsLoading } = useDualPrice(pendingCommissions);

    const renderPriceValue = (priceInfo: any, isLoading: boolean) => {
        if (isLoading || !priceInfo) {
            return <div className="h-16 w-32 bg-gray-700 rounded animate-pulse"></div>;
        }
        return (
            <>
                <span className="block text-3xl leading-tight">{priceInfo.formattedUSD}</span>
                <span className="block text-lg font-normal text-gray-400 leading-tight">(~{priceInfo.formattedARS})</span>
            </>
        );
    };

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Gestión de Afiliados</h1>
                    <p className="text-gray-400 mt-1">Supervisa, gestiona y haz crecer tu programa de afiliados.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => toast.success('Exportando afiliados...')}>
                        <Download className="h-4 w-4 mr-2" />
                        Exportar CSV
                    </Button>
                    <Button onClick={() => toast.success('Funcionalidad para añadir afiliado próximamente.')}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Añadir Afiliado
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Afiliados Activos" value={activeAffiliates} icon={<Users />} change={5.2} />
                <StatsCard title="Ingresos por Referidos (Mes)" value={renderPriceValue(revenuePrice, isRevenueLoading)} icon={<DollarSign />} change={15.3} />
                <StatsCard title="Comisiones Pendientes" value={renderPriceValue(commissionsPrice, isCommissionsLoading)} icon={<Clock />} change={-2.1} />
                <StatsCard title="Tasa de Conversión Prom." value={`${avgConversionRate.toFixed(2)}%`} icon={<Percent />} change={0.5} />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                    <Card>
                        <AffiliatesTable />
                    </Card>
                </div>
                <div className="space-y-6">
                    <TopAffiliates affiliates={topAffiliates} />
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Configuración del Programa</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-300">Comisión 1er Mes (%):</label>
                                    <input type="number" defaultValue="25" className="bg-gray-700 w-20 p-1 rounded border border-gray-600 text-right" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-300">Comisión Recurrente (%):</label>
                                    <input type="number" defaultValue="10" className="bg-gray-700 w-20 p-1 rounded border border-gray-600 text-right" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-300">Duración Cookie (días):</label>
                                    <input type="number" defaultValue="30" className="bg-gray-700 w-20 p-1 rounded border border-gray-600 text-right" />
                                </div>
                                <Button className="w-full mt-2">Guardar Cambios</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

export default AfiliadosAdminPage;