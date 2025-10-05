import React from 'react';

const SkeletonCard = () => (
  <div className="glass-card p-6 animate-pulse h-full">
    <div className="h-4 bg-gray-700/50 rounded w-1/3 mb-4" />
    <div className="h-8 bg-gray-700/50 rounded w-2/3 mb-2" />
    <div className="h-3 bg-gray-700/50 rounded w-1/2" />
    <div className="h-12 bg-gray-700/50 rounded mt-4" />
  </div>
);

const DashboardPremiumSkeleton: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="h-36 glass-card p-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
            <div className="h-64 glass-card p-6 animate-pulse"></div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 h-96 glass-card animate-pulse"></div>
                <div className="lg:col-span-3 h-96 glass-card animate-pulse"></div>
            </div>
             <div className="h-64 glass-card p-6 animate-pulse"></div>
        </div>
    );
};

export default DashboardPremiumSkeleton;
