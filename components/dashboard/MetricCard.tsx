
import React from 'react';

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: string;
}> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="theme-bg-card rounded-lg p-4 hover:shadow-lg transition-all border theme-border hover:border-primary/30">
      <div className="flex justify-between items-start mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm flex items-center font-semibold ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
      <div className="text-3xl font-bold theme-text-primary">{value}</div>
      <div className="text-sm theme-text-secondary">{title}</div>
    </div>
  );
};

export default MetricCard;