
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Download, Users, DollarSign, Clock, Percent, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

import { useAffiliateStore } from '../../store/authStore';
import { Affiliate, AffiliateStatus, PaymentMethodType } from '../../types';

import StatsCard from '../../components/dashboard/StatsCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import TopAffiliates from '../../components/affiliates/admin/TopAffiliates';
import { AffiliatesTable } from '../../components/affiliates/admin/AffiliatesTable';
import AddAffiliateModal from '../../components/affiliates/admin/AddAffiliateModal';

import { topAffiliates as mockTopAffiliates } from '../../data/adminDashboardMockData';
import { useDualPrice } from '../../hooks/useDualPrice';
import DashboardSkeleton from '../../components/admin/dashboard/DashboardSkeleton';

const ProgramConfig = () => {
    const { programConfig, updateProgramConfig } = useAffiliateStore();
    const [config, setConfig] = useState(programConfig);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setConfig(programConfig);
    }, [programConfig]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setConfig(prev => ({ ...prev, [id]: Number(value) }));
    };

    const handleSave = () => {
        setIsSaving(true);
        toast.promise(
            new Promise(resolve => {
                updateProgramConfig(config);
                setTimeout(resolve, 1000);
            }),
            {
                loading: 'Guardando...',
                success: 'Configuración guardada.',
                error: 'Error al guardar.',
            }
        ).finally(() => setIsSaving(false));
    };

    return (
        <Card>
            <div className="p-6">
                <h3 className="text-lg font-semibold theme-text-primary mb-4">Configuración del Programa</h3>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                        <label htmlFor="firstMonthCommission" className="theme-text-primary">Comisión 1er Mes (%):</label>
                        <input id="firstMonthCommission" type="number" value={config.firstMonthCommission} onChange={handleChange} className="input-premium !py-1.5 w-24 text-right" />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="recurringCommission" className="theme-text-primary">Comisión Recurrente (%):</label>
                        <input id="recurringCommission" type="number" value={config.recurringCommission} onChange={handleChange} className="input-premium !py-1.5 w-24 text-right" />
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="cookieDuration" className="theme-text-primary">Duración Cookie (días):</label>
                        <input id="cookieDuration" type="number" value={config.cookieDuration} onChange={handleChange} className="input-premium !py-1.5 w-24 text-right" />
                    </div>
                    <Button className="w-full mt-2" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </div>
            </div>
        </Card>
    );
};


const AfiliadosAdminPage: React.FC = () => {
    const { affiliates, setAffiliates, addAffiliate } = useAffiliateStore();
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchAffiliates = async () => {
            setIsLoading(true);
            try {
                const fetchedAffiliates = await api.getAffiliates();
                setAffiliates(fetchedAffiliates);
                setLastUpdated(new Date());
            } catch (error) {
                toast.error("No se pudieron cargar los afiliados.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAffiliates();
    }, [setAffiliates]);
    
    const handleAddAffiliate = (newAffiliateData: {
        nombre: string;
        user_email: string;
        tasa_primer_mes: number;
        tasa_recurrente: number;
        estado: AffiliateStatus;
        metodo_pago: PaymentMethodType;
    }) => {
        const newAffiliate: Affiliate = {
            id: `aff_${Date.now()}`,
            ...newAffiliateData,
            fecha_alta: new Date().toISOString(),
            fecha_aprobacion: newAffiliateData.estado === 'active' ? new Date().toISOString() : undefined,
            referrals: { active: 0, total: 0 },
            revenue: { current_month: 0, lifetime: 0 },
            commission: { pending: 0, paid: 0, total: 0 },
            conversion_rate: 0,
            avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
            cookie_days: 30, // default
            wallet_credito: 0, // default required value
        };
        addAffiliate(newAffiliate);
        setIsAddModalOpen(false);
        toast.success('Afiliado agregado exitosamente!');
    };

    // KPI Calculations
    const activeAffiliatesCount = affiliates.filter(a => a.estado === 'active').length;
    const monthlyRevenue = affiliates.reduce((sum, a) => sum + a.revenue.current_month, 0);
    const pendingCommissions = affiliates.reduce((sum, a) => sum + a.commission.pending, 0);
    const avgConversionRate = affiliates.length > 0
        ? affiliates.reduce((sum, a) => sum + a.conversion_rate, 0) / affiliates.length
        : 0;
        
    const { priceInfo: revenuePrice, isLoading: isRevenueLoading } = useDualPrice(monthlyRevenue);
    const { priceInfo: commissionsPrice, isLoading: isCommissionsLoading } = useDualPrice(pendingCommissions);

    const renderPriceValue = (priceInfo: any, isPriceLoading: boolean) => {
        if (isPriceLoading || !priceInfo) {
            return <div className="h-16 w-32 bg-gray-700 rounded animate-pulse"></div>;
        }
        return (
            <>
                <span className="block text-3xl leading-tight">{priceInfo.formattedUSD}</span>
                <span className="block text-lg font-normal text-gray-400 leading-tight">(~{priceInfo.formattedARS})</span>
            </>
        );
    };

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <>
            <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Gestión de Afiliados</h1>
                        <p className="text-gray-400 mt-1">Supervisa, gestiona y haz crecer tu programa de afiliados.</p>
                    </div>
                     <div className="flex items-center gap-4">
                        {lastUpdated && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <RefreshCw size={14} />
                                <span>Datos actualizados</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => toast.success('Exportando afiliados...')}>
                                <Download className="h-4 w-4 mr-2" />
                                Exportar CSV
                            </Button>
                            <Button onClick={() => setIsAddModalOpen(true)}>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Añadir Afiliado
                            </Button>
                        </div>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Afiliados Activos" value={activeAffiliatesCount} icon={<Users />} change={5.2} />
                    <StatsCard title="Ingresos por Referidos (Mes)" value={renderPriceValue(revenuePrice, isRevenueLoading)} icon={<DollarSign />} change={15.3} />
                    <StatsCard title="Comisiones Pendientes" value={renderPriceValue(commissionsPrice, isCommissionsLoading)} icon={<Clock />} change={-2.1} />
                    <StatsCard title="Tasa de Conversión Prom." value={`${avgConversionRate.toFixed(2)}%`} icon={<Percent />} change={0.5} />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2">
                        <Card>
                            <AffiliatesTable affiliates={affiliates} setAffiliates={setAffiliates}/>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <TopAffiliates affiliates={mockTopAffiliates} />
                        <ProgramConfig />
                    </div>
                </div>
            </motion.div>
            <AddAffiliateModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddAffiliate}
            />
        </>
    );
};

export default AfiliadosAdminPage;
