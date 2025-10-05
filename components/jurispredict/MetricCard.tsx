
import React from 'react';
import Card from '../ui/Card';

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  color: 'purple' | 'blue' | 'green' | 'emerald' | 'yellow';
}

const colorClasses = {
  purple: 'text-purple-500 bg-purple-100 dark:bg-purple-900/50',
  blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/50',
  green: 'text-green-500 bg-green-100 dark:bg-green-900/50',
  emerald: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/50',
  yellow: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/50',
};

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, change, color }) => {
  return (
    <Card className="p-6">
      <div className={`p-3 rounded-lg inline-block mb-4 ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-medium theme-text-secondary">{title}</h3>
      <p className="text-2xl font-bold theme-text-primary mt-1">{value}</p>
      <p className="text-xs theme-text-muted mt-1">{change}</p>
    </Card>
  );
};

export default MetricCard;