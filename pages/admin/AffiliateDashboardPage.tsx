import React from 'react';
import { Users, DollarSign, CreditCard, BarChart2, Award } from 'lucide-react';
import StatsCard from '../../../components/dashboard/StatsCard';
import Card from '../../../components/ui/Card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_AFFILIATES } from '../../../data/affiliateMockData';
import { formatCurrency } from '../../../utils/formatters';
import { useDualPrice } from '../../../hooks/useDualPrice';

const revenueData = [
  { name: 'Ene', 'Primer Mes': 4000, 'Recurrente': 2400 },
  { name: 'Feb', 'Primer Mes': 3000, 'Recurrente': 3398 },
  { name: 'Mar', 'Primer Mes': 5000, 'Recurrente': 4800 },
  { name: 'Abr', 'Primer Mes': 4780, 'Recurrente': 5908 },
  { name: 'May', 'Primer Mes': 3890, 'Recurrente': 6800 },
  { name: 'Jun', 'Primer Mes': 4390, 'Recurrente': 7800 },
  { name: 'Jul', 'Primer Mes': 5490, 'Recurrente': 8300 },
];

const topAffiliate = MOCK_AFFILIATES[0];


const RevenueChart = () => (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold theme-text-primary">Ingresos por Referidos (Últimos 7 meses)</h3>
        <p className="text-sm text-gray-400 mb-4">Diferenciando entre primer pago y pagos recurrentes.</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} fontSize={12} />
              <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{ fill: 'var(--text-secondary)' }} fontSize={12} />
              <Tooltip
                contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'var(--text-primary)' }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Line type="monotone" dataKey="Primer Mes" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="Recurrente" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
);

const AffiliateDashboardPage: React.FC = () => {
    const { priceInfo: revenuePrice, isLoading: isRevenueLoading } = useDualPrice(31450);
    const { priceInfo: pendingCommissionsPrice, isLoading: isPendingLoading } = useDualPrice(4230);
    const { priceInfo: paidCommissionsPrice, isLoading: isPaidLoading } = useDualPrice(12800);

    const renderPriceValue = (priceInfo: any, isLoading: boolean) => {
        if (isLoading || !priceInfo) {
            return <div className="h-16 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>;
        }
        return (
            <>
                <span className="block text-3xl leading-tight">{priceInfo.formattedUSD}</span>
                <span className="block text-lg font-normal theme-text-secondary leading-tight">(~{priceInfo.formattedARS})</span>
            </>
        );
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold theme-text-primary">Dashboard de Afiliados</h1>
        <p className="theme-text-secondary mt-1">Visión general del rendimiento de tu programa de afiliados.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard title="Total Afiliados Activos" value="89" icon={<Users />} change={3} />
        <StatsCard title="Ingresos por Referidos (Mes)" value={renderPriceValue(revenuePrice, isRevenueLoading)} icon={<DollarSign />} change={15.3} />
        <StatsCard title="Comisiones Pendientes" value={renderPriceValue(pendingCommissionsPrice, isPendingLoading)} icon={<CreditCard />} change={-2.1} />
        <StatsCard title="Comisiones Pagadas (Mes)" value={renderPriceValue(paidCommissionsPrice, isPaidLoading)} icon={<CreditCard />} change={8.9} />
        <div className="lg:col-span-1">
             <Card>
                <div className="p-5 flex flex-col items-center justify-center h-full">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <h3 className="text-sm font-medium theme-text-secondary truncate mt-2">Mejor Afiliado del Mes</h3>
                    <img src={topAffiliate.avatarUrl} alt={topAffiliate.nombre} className="w-12 h-12 rounded-full my-2" />
                    <p className="text-lg font-bold theme-text-primary">{topAffiliate.nombre}</p>
                    <p className="text-sm font-semibold text-secondary-500">{formatCurrency(topAffiliate.revenue.current_month)}</p>
                </div>
            </Card>
        </div>
      </div>

      <div>
        <RevenueChart />
      </div>
      
    </div>
  );
};

export default AffiliateDashboardPage;