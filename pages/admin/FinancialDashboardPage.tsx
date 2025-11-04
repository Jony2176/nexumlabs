
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, Users, Target,
  Percent, BarChart3, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';
import FinancialDashboardSkeleton from '../../components/admin/financials/FinancialDashboardSkeleton';

// --- TYPESCRIPT INTERFACES ---
interface FinancialData {
  mrr: number;
  arr: number;
  activeClients: number;
  churnRate: number;
  trends: {
    mrrTrend: number;
    arrTrend: number;
    clientsTrend: number;
    churnTrend: number;
  };
  planBreakdown: Array<{ plan: string; clients: number; avgPrice: number; mrr: number; percentage: number }>;
  addonRevenue: Array<{ addon: string; clients: number; adoptionRate: number; mrr: number }>;
  affiliateCommissions: { pending: number; paidThisMonth: number; pendingPayout: number };
  mrrHistory: Array<{ month: string; mrr: number; target: number }>;
  revenueBreakdown: Array<{ name: string; value: number; percentage: number }>;
  ltvByMonth: Array<{ month: string; ltv: number }>;
  secondaryMetrics: {
    arpu: number;
    ltv: number;
    cac: number;
    ltvCacRatio: number;
    nrr: number;
    grossMargin: number;
  };
}

// --- MAIN COMPONENT ---
const FinancialDashboardPage: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  
  const mockData: FinancialData = {
    mrr: 85000,
    arr: 1020000,
    activeClients: 167,
    churnRate: 2.4,
    trends: { mrrTrend: 8.5, arrTrend: 8.5, clientsTrend: 5.7, churnTrend: -0.3 },
    planBreakdown: [
      { plan: 'Lite', clients: 35, avgPrice: 79, mrr: 2765, percentage: 3.3 },
      { plan: 'Start', clients: 42, avgPrice: 119, mrr: 4998, percentage: 5.9 },
      { plan: 'Pro', clients: 48, avgPrice: 199, mrr: 9552, percentage: 11.2 },
      { plan: 'Professional', clients: 28, avgPrice: 319, mrr: 8932, percentage: 10.5 },
      { plan: 'Business', clients: 10, avgPrice: 399, mrr: 3990, percentage: 4.7 },
      { plan: 'Enterprise', clients: 4, avgPrice: 650, mrr: 2600, percentage: 3.1 }
    ],
    addonRevenue: [
      { addon: 'Dashboard Premium', clients: 67, adoptionRate: 40.1, mrr: 22300 },
      { addon: 'JurisPredict AI', clients: 45, adoptionRate: 26.9, mrr: 19800 },
      { addon: 'Avatar Partner', clients: 28, adoptionRate: 16.8, mrr: 10136 }
    ],
    affiliateCommissions: { pending: 8450, paidThisMonth: 12300, pendingPayout: 4230 },
    mrrHistory: [
      { month: 'Ene', mrr: 42000, target: 40000 }, { month: 'Feb', mrr: 48000, target: 45000 },
      { month: 'Mar', mrr: 53000, target: 50000 }, { month: 'Abr', mrr: 59000, target: 55000 },
      { month: 'May', mrr: 64000, target: 60000 }, { month: 'Jun', mrr: 70000, target: 65000 },
      { month: 'Jul', mrr: 75000, target: 70000 }, { month: 'Ago', mrr: 78000, target: 75000 },
      { month: 'Sep', mrr: 82000, target: 80000 }, { month: 'Oct', mrr: 85000, target: 85000 }
    ],
    revenueBreakdown: [
      { name: 'Nuevos Clientes', value: 32000, percentage: 37.6 },
      { name: 'Expansión y Mejoras', value: 53000, percentage: 62.4 }
    ],
    ltvByMonth: [
      { month: 'Ene', ltv: 18500 }, { month: 'Feb', ltv: 19200 }, { month: 'Mar', ltv: 19800 },
      { month: 'Abr', ltv: 20100 }, { month: 'May', ltv: 20500 }, { month: 'Jun', ltv: 20800 },
      { month: 'Jul', ltv: 21000 }, { month: 'Ago', ltv: 21100 }, { month: 'Sep', ltv: 21150 },
      { month: 'Oct', ltv: 21208 }
    ],
    secondaryMetrics: {
      arpu: 509, ltv: 21208, cac: 180, ltvCacRatio: 117.8, nrr: 112, grossMargin: 68
    }
  };

  useEffect(() => {
    const fetchFinancialData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setFinancialData(mockData);
      } catch (error) {
        console.error("No se pudieron cargar los datos financieros", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFinancialData();
  }, [selectedPeriod]);

  const formatDualCurrency = (amount: number) => {
    const arsRate = 1050; // Dólar blue
    const usdFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount);
    const arsFormatted = new Intl.NumberFormat('es-AR', {
      style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(amount * arsRate);
    return { usd: usdFormatted, ars: arsFormatted };
  };

  const DualCurrencyDisplay: React.FC<{ amount: number }> = ({ amount }) => {
    const { usd, ars } = formatDualCurrency(amount);
    return (
      <div>
        <div className="text-4xl font-bold theme-text-primary">{usd} USD</div>
        <div className="text-lg text-gray-400 mt-1">{ars}</div>
      </div>
    );
  };
  
  const DualCurrencyMiniDisplay: React.FC<{ amount: number }> = ({ amount }) => {
    const { usd, ars } = formatDualCurrency(amount);
    return (
      <>
        <span>{usd}</span>
        <span className="block text-xs font-normal text-gray-400">{ars}</span>
      </>
    );
  };

  const formatCompact = (num: number) => new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
  const COLORS = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  // --- HELPER COMPONENTS (DEFINED INLINE) ---

  const KPICard: React.FC<{
    title: string;
    value: React.ReactNode;
    trendValue: number;
    isChurn?: boolean;
  }> = ({ title, value, trendValue, isChurn = false }) => {
    const isPositive = isChurn ? trendValue < 0 : trendValue > 0;
    const trendColor = isPositive ? 'text-green-500' : 'text-red-500';
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div className="glass-card p-6 text-left">
        <p className="text-sm theme-text-secondary">{title}</p>
        <div className="my-2">{value}</div>
        <div className={`flex items-center text-sm font-semibold ${trendColor}`}>
          <TrendIcon size={16} className="mr-1" />
          {Math.abs(trendValue).toFixed(1)}% vs mes anterior
        </div>
      </div>
    );
  };

  const SecondaryMetricCard: React.FC<{ title: string; value: React.ReactNode; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
      <div className="glass-card p-4">
          <div className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-purple-400" />
              <div>
                  <p className="text-sm theme-text-secondary">{title}</p>
                  <div className="text-xl font-bold theme-text-primary">{value}</div>
              </div>
          </div>
      </div>
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-sm">
          <p className="font-bold theme-text-primary mb-2">{label}</p>
          {payload.map((pld: any) => {
            const { usd, ars } = formatDualCurrency(pld.value);
            return (
              <div key={pld.dataKey} style={{ color: pld.stroke || pld.fill }}>
                {pld.name}: <span className="font-bold">{usd}</span> <span className="text-xs opacity-70">({ars})</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const AffiliateStat: React.FC<{ title: string, amount: number }> = ({ title, amount }) => {
    const { usd, ars } = formatDualCurrency(amount);
    return (
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{usd}</p>
            <p className="text-sm text-gray-400">{ars}</p>
        </div>
    );
  };

  if (isLoading || !financialData) {
    return <FinancialDashboardSkeleton />;
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold theme-text-primary">Finanzas</h1>
          <p className="text-sm theme-text-secondary mt-1">Panel de métricas financieras ejecutivas</p>
        </div>
        <div className="flex items-center gap-2 p-1 theme-bg-secondary rounded-lg">
            <button className={`px-3 py-1.5 text-sm rounded-md ${selectedPeriod === 'month' ? 'bg-bg-surface text-text-primary' : 'text-text-secondary'}`} onClick={() => setSelectedPeriod('month')}>Mes</button>
            <button className={`px-3 py-1.5 text-sm rounded-md ${selectedPeriod === 'quarter' ? 'bg-bg-surface text-text-primary' : 'text-text-secondary'}`} onClick={() => setSelectedPeriod('quarter')}>Trimestre</button>
            <button className={`px-3 py-1.5 text-sm rounded-md ${selectedPeriod === 'year' ? 'bg-bg-surface text-text-primary' : 'text-text-secondary'}`} onClick={() => setSelectedPeriod('year')}>Año</button>
        </div>
      </div>
      
      {/* KPIs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Ingresos Mensuales" value={<DualCurrencyDisplay amount={financialData.mrr} />} trendValue={financialData.trends.mrrTrend} />
        <KPICard title="Proyección Anual" value={<DualCurrencyDisplay amount={financialData.arr} />} trendValue={financialData.trends.arrTrend} />
        <KPICard title="Clientes Activos" value={String(financialData.activeClients)} trendValue={financialData.trends.clientsTrend} />
        <KPICard title="Tasa de Abandono" value={`${financialData.churnRate.toFixed(1)}%`} trendValue={financialData.trends.churnTrend} isChurn={true} />
      </div>
      
      {/* MRR Evolution Chart */}
      <div className="theme-bg-card rounded-2xl p-6 shadow-lg border theme-border h-[400px] text-left">
        <h3 className="text-xl font-bold theme-text-primary mb-4">Evolución de Ingresos Mensuales</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={financialData.mrrHistory} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <defs><linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/><stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)' }} />
            <YAxis tickFormatter={(val) => formatCompact(val)} tick={{ fill: 'var(--text-secondary)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="mrr" name="Ingresos" stroke="#8B5CF6" fill="url(#colorIngresos)" strokeWidth={2} />
            <Line type="monotone" dataKey="target" name="Objetivo" stroke="#10B981" strokeDasharray="5 5" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Revenue Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 theme-bg-card rounded-2xl p-6 shadow-lg border theme-border">
            <h3 className="text-xl font-bold theme-text-primary mb-4">Ingresos por Plan</h3>
            <table className="w-full text-sm">
                <thead><tr className="border-b theme-border text-left theme-text-secondary"><th className="pb-2">Plan</th><th className="pb-2">Clientes</th><th className="pb-2">Ingresos</th><th className="pb-2">% del Total</th></tr></thead>
                <tbody>{financialData.planBreakdown.map((p, i) => <tr key={p.plan} className={i % 2 ? "" : "bg-bg-secondary/50"}><td className="py-2">{p.plan}</td><td>{p.clients}</td>
                  <td>
                      <p className="font-semibold">{formatDualCurrency(p.mrr).usd}</p>
                      <p className="text-xs text-gray-400">{formatDualCurrency(p.mrr).ars}</p>
                  </td>
                  <td>{p.percentage.toFixed(1)}%</td></tr>)}</tbody>
            </table>
        </div>
        <div className="lg:col-span-2 theme-bg-card rounded-2xl p-6 shadow-lg border theme-border">
            <h3 className="text-xl font-bold theme-text-primary mb-4">Ingresos por Add-ons</h3>
            <table className="w-full text-sm">
                 <thead><tr className="border-b theme-border text-left theme-text-secondary"><th className="pb-2">Add-on</th><th className="pb-2">Adopción</th><th className="pb-2">Ingresos</th></tr></thead>
                <tbody>{financialData.addonRevenue.map((a, i) => <tr key={a.addon} className={i % 2 ? "" : "bg-bg-secondary/50"}><td className="py-2">{a.addon}</td><td>{a.adoptionRate.toFixed(1)}%</td>
                  <td>
                      <p className="font-semibold">{formatDualCurrency(a.mrr).usd}</p>
                      <p className="text-xs text-gray-400">{formatDualCurrency(a.mrr).ars}</p>
                  </td>
                </tr>)}</tbody>
            </table>
        </div>
      </div>
      
      <div className="theme-bg-card rounded-2xl p-6 shadow-lg border theme-border">
        <h3 className="text-xl font-semibold theme-text-primary mb-6 flex items-center gap-3">
            Comisiones de Afiliados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <AffiliateStat title="Pendientes" amount={financialData.affiliateCommissions.pending} />
            <AffiliateStat title="Pagadas (Mes)" amount={financialData.affiliateCommissions.paidThisMonth} />
            <AffiliateStat title="Próximo Pago" amount={financialData.affiliateCommissions.pendingPayout} />
        </div>
      </div>

      {/* Additional Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="theme-bg-card rounded-2xl p-6 shadow-lg border theme-border h-[350px]">
            <h3 className="text-xl font-bold theme-text-primary mb-4">Ingresos por Plan (Gráfico)</h3>
            <ResponsiveContainer width="100%" height="100%"><BarChart data={financialData.planBreakdown} layout="vertical" margin={{ left: 30 }}><CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" /><XAxis type="number" tickFormatter={(val) => formatCompact(val)} tick={{ fill: 'var(--text-secondary)' }} /><YAxis type="category" dataKey="plan" tick={{ fill: 'var(--text-secondary)' }} width={80} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="mrr" name="Ingresos">{financialData.planBreakdown.map((e, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />)}</Bar></BarChart></ResponsiveContainer>
        </div>
        <div className="theme-bg-card rounded-2xl p-6 shadow-lg border theme-border h-[350px]">
             <h3 className="text-xl font-bold theme-text-primary mb-4">Ingresos: Nuevos vs. Expansión</h3>
             <ResponsiveContainer width="100%" height="100%"><PieChart><Tooltip content={<CustomTooltip />} /><Pie data={financialData.revenueBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>{financialData.revenueBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Legend /></PieChart></ResponsiveContainer>
        </div>
      </div>
      
      {/* Secondary Metrics Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
           <SecondaryMetricCard title="Ingreso Promedio / Cliente (ARPU)" value={<DualCurrencyMiniDisplay amount={financialData.secondaryMetrics.arpu} />} icon={DollarSign} />
           <SecondaryMetricCard title="Valor de Vida del Cliente (LTV)" value={<DualCurrencyMiniDisplay amount={financialData.secondaryMetrics.ltv} />} icon={TrendingUp} />
           <SecondaryMetricCard title="Costo de Adquisición (CAC)" value={<DualCurrencyMiniDisplay amount={financialData.secondaryMetrics.cac} />} icon={Target} />
           <SecondaryMetricCard title="Ratio LTV/CAC" value={`${financialData.secondaryMetrics.ltvCacRatio.toFixed(1)}x`} icon={BarChart3} />
           <SecondaryMetricCard title="Retención Neta de Ingresos" value={`${financialData.secondaryMetrics.nrr}%`} icon={ArrowUpRight} />
           <SecondaryMetricCard title="Margen Bruto" value={`${financialData.secondaryMetrics.grossMargin}%`} icon={Percent} />
       </div>
      
      {/* LTV Chart */}
      <div className="theme-bg-card rounded-2xl p-6 shadow-lg border theme-border h-[400px]">
        <h3 className="text-xl font-bold theme-text-primary mb-4">Valor de Vida del Cliente (LTV) por Cohorte</h3>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={financialData.ltvByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                 <defs><linearGradient id="colorLtv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis tickFormatter={(val) => formatCompact(val)} tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="ltv" name="LTV Promedio" stroke="#10B981" fill="url(#colorLtv)" strokeWidth={2} />
            </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialDashboardPage;
