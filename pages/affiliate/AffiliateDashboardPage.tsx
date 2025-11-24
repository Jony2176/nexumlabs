import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import { AffiliateDashboardData } from '../../types';
import toast from 'react-hot-toast';

import LoadingSpinner from '../../components/ui/LoadingSpinner';
import AffiliateDashboardHeader from '../../components/affiliate/AffiliateDashboardHeader';
import BalanceKpiCard from '../../components/affiliate/BalanceKpiCard';
import ReferralsKpiCard from '../../components/affiliate/ReferralsKpiCard';
import EarningsKpiCard from '../../components/affiliate/EarningsKpiCard';
import ConversionKpiCard from '../../components/affiliate/ConversionKpiCard';
import RevenueOverTimeChart from '../../components/affiliate/RevenueOverTimeChart';
import CommissionBreakdownChart from '../../components/affiliate/CommissionBreakdownChart';
import ReferralsTable from '../../components/affiliate/ReferralsTable';

const AffiliateDashboardPage: React.FC = () => {
    const { user } = useAuthStore();
    const [data, setData] = useState<AffiliateDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                // In a real app, you would fetch this from your API
                // const response = await api.getAffiliateDashboard();
                // setData(response);
                 setData({
                    affiliate: {
                        id: user.id,
                        name: user.firstName,
                        affiliate_code: 'NEXUMPRO',
                        balance_usd: 48.50,
                        balance_ars: 60625, // Example conversion
                        total_referrals: 12,
                        active_referrals: 9,
                        tier: 'Pro',
                    },
                    thisMonthEarnings: {
                        first_month_commissions: 150,
                        recurring_commissions: 235.50,
                        total: 385.50,
                    },
                    conversionRate: {
                        clicks: 1542,
                        conversions: 12,
                        rate: 0.0077,
                    },
                 });
            } catch (error) {
                toast.error("No se pudieron cargar los datos del dashboard de afiliado.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (isLoading || !data) {
        return <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>;
    }

    return (
        <div className="space-y-8">
            <AffiliateDashboardHeader 
                name={data.affiliate.name}
                code={data.affiliate.affiliate_code}
                tier={data.affiliate.tier}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <BalanceKpiCard 
                    balanceUsd={data.affiliate.balance_usd}
                    balanceArs={data.affiliate.balance_ars}
                    canWithdraw={data.affiliate.balance_usd >= 50}
                />
                <ReferralsKpiCard 
                    active={data.affiliate.active_referrals}
                    total={data.affiliate.total_referrals}
                />
                <EarningsKpiCard 
                    amount={data.thisMonthEarnings.total}
                    firstMonth={data.thisMonthEarnings.first_month_commissions}
                    recurring={data.thisMonthEarnings.recurring_commissions}
                />
                <ConversionKpiCard 
                    rate={data.conversionRate.rate}
                    clicks={data.conversionRate.clicks}
                    conversions={data.conversionRate.conversions}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueOverTimeChart affiliateId={data.affiliate.id} />
                <CommissionBreakdownChart affiliateId={data.affiliate.id} />
            </div>

            <ReferralsTable affiliateId={data.affiliate.id} />
        </div>
    );
};

export default AffiliateDashboardPage;
