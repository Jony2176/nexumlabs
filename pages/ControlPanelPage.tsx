import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { ClientDashboardData } from '../types';
import toast from 'react-hot-toast';
import { MessageSquare, Phone, DollarSign, CheckCircle } from 'lucide-react';

import LoadingSpinner from '../components/ui/LoadingSpinner';
import UsageKpiCard from '../components/client/UsageKpiCard';
import SubscriptionKpiCard from '../components/client/SubscriptionKpiCard';
import PlanStatusCard from '../components/client/PlanStatusCard';
import UsageOverTimeChart from '../components/client/UsageOverTimeChart';
import ModuleDistributionChart from '../components/client/ModuleDistributionChart';
import RecentActivityTable from '../components/client/RecentActivityTable';
import DashboardHeader from '../components/client/DashboardHeader';

const ClientDashboardPage: React.FC = () => {
    const { organization } = useAuthStore();
    const [data, setData] = useState<ClientDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!organization) return;
            setIsLoading(true);
            try {
                // In a real app, you would fetch this data from your API
                // const response = await api.getClientDashboard();
                // setData(response);
                
                // Using mock data based on prompt structure
                 setData({
                    organization: {
                        id: organization.id,
                        name: organization.name,
                        plan: 'Pro',
                        status: 'active',
                        modules_config: {
                            whatsapp_bot: { active: true, limit: 10000 },
                            calls: { active: true, limit: 500 },
                            dashboard: { active: true },
                            avatar: { active: false, limit: 100 },
                            predict: { active: false, limit: 10 },
                        },
                        current_usage: {
                            whatsapp_messages: 7854,
                            call_minutes: 234,
                            avatar_queries: 0,
                            predict_cases: 0,
                        },
                        trial_ends_at: null,
                        next_billing_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    subscription: {
                        id: 'sub_123',
                        plan_id: 'pro',
                        status: 'active',
                        price_usd: 199,
                        price_ars: 248750, // Example conversion
                        next_billing_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                        auto_renew: true,
                    },
                });

            } catch (error) {
                toast.error("No se pudieron cargar los datos del dashboard.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [organization]);

    if (isLoading || !data) {
        return <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>;
    }

    const calculateDays = (dateString: string) => {
        const diff = new Date(dateString).getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    return (
        <div className="space-y-8">
            <DashboardHeader 
                orgName={data.organization.name}
                plan={data.organization.plan}
            />
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <UsageKpiCard 
                    module="WhatsApp Bot"
                    used={data.organization.current_usage.whatsapp_messages}
                    limit={data.organization.modules_config.whatsapp_bot.limit}
                    icon={<MessageSquare />}
                    color="blue"
                    unit="mensajes"
                />
                <UsageKpiCard 
                    module="Llamadas IA"
                    used={data.organization.current_usage.call_minutes}
                    limit={data.organization.modules_config.calls.limit}
                    icon={<Phone />}
                    color="green"
                    unit="min"
                />
                <SubscriptionKpiCard 
                    daysUntilRenewal={calculateDays(data.subscription.next_billing_date)}
                    amount={data.subscription.price_usd}
                    currency="USD"
                    icon={<DollarSign />}
                />
                <PlanStatusCard 
                    status={data.subscription.status}
                    autoRenew={data.subscription.auto_renew}
                    icon={<CheckCircle />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UsageOverTimeChart orgId={data.organization.id} />
                <ModuleDistributionChart orgId={data.organization.id} />
            </div>

            <RecentActivityTable orgId={data.organization.id} />
        </div>
    );
};

export default ClientDashboardPage;
