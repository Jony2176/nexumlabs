import React from 'react';

// FIX: Explicitly type SkeletonCard as React.FC to ensure it can accept React's special 'key' prop without TypeScript errors.
const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-5 ${className}`}>
        <div className="h-4 bg-gray-700/50 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-700/50 rounded w-1/2"></div>
    </div>
);

const PanelPremiumSkeleton: React.FC = () => {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header */}
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

export default PanelPremiumSkeleton;