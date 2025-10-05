
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import * as mockData from '../../data/adminFinancialDashboardMockData';
import FinancialDashboardSkeleton from '../../components/admin/financials/FinancialDashboardSkeleton';
import FinancialDashboardHeader from '../../components/admin/financials/FinancialDashboardHeader';
import FinancialKPICard from '../../components/admin/financials/FinancialKPICard';
import MRREvolutionChart from '../../components/admin/financials/MRREvolutionChart';
import RevenueDistributionChart from '../../components/admin/financials/RevenueDistributionChart';
import CashFlowChart from '../../components/admin/financials/CashFlowChart';
import RecentTransactionsTable from '../../components/admin/financials/RecentTransactionsTable';
import CostBreakdownPanel from '../../components/admin/financials/CostBreakdownPanel';
import ProjectionsPanel from '../../components/admin/financials/ProjectionsPanel';

const MotionDiv = motion.div;

const FinancialDashboardPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <FinancialDashboardSkeleton />;
    }

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <FinancialDashboardHeader />

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                {mockData.kpis.map((kpi, index) => (
                    <FinancialKPICard key={index} {...kpi} />
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <div className="xl:col-span-3">
                    <MRREvolutionChart data={mockData.mrrData} />
                </div>
                <div className="xl:col-span-2">
                    <RevenueDistributionChart data={mockData.revenueByProduct} />
                </div>
            </div>

            {/* Cash Flow & Projections */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                 <div className="xl:col-span-3">
                    <CashFlowChart data={mockData.cashFlowData} />
                </div>
                <div className="xl:col-span-2">
                    <ProjectionsPanel projections={mockData.projections} />
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <RecentTransactionsTable transactions={mockData.recentTransactions} />
                </div>
                <div className="xl:col-span-1">
                    <CostBreakdownPanel costs={mockData.costs} />
                </div>
            </div>

        </MotionDiv>
    );
};

export default FinancialDashboardPage;
