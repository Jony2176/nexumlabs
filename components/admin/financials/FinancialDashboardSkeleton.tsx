
import React from 'react';

const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-5 ${className}`}>
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-700 rounded w-1/2"></div>
    </div>
);

const FinancialDashboardSkeleton: React.FC = () => {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
            <div>
                <div className="h-8 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <div className="xl:col-span-3 h-96 bg-gray-800/50 border border-gray-700 rounded-xl"></div>
                <div className="xl:col-span-2 h-96 bg-gray-800/50 border border-gray-700 rounded-xl"></div>
            </div>

            {/* Table & Panels */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 h-96 bg-gray-800/50 border border-gray-700 rounded-xl"></div>
                <div className="h-96 bg-gray-800/50 border border-gray-700 rounded-xl"></div>
            </div>
        </div>
    );
};

export default FinancialDashboardSkeleton;
