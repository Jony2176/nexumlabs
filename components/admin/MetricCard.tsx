import React from 'react';
import Card from '../ui/Card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  total?: number;
  icon: React.ReactNode;
  severity?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, total, icon, severity }) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card className={cn('p-6', severity === 'critical' && value !== '0' && 'bg-red-500/10 border-red-500/30')}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'h-5 w-5 text-gray-400' })}
      </div>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
        {total && <span className="text-sm text-gray-500"> / {total}</span>}
      </div>
      {change !== undefined && (
         <div className={cn('flex items-center text-sm mt-2', isPositive ? 'text-green-500' : 'text-red-500')}>
            {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14}/>}
            <span className="font-semibold ml-1">{Math.abs(change)}%</span>
            <span className="text-gray-500 ml-1">vs. mes anterior</span>
         </div>
      )}
    </Card>
  );
};

export default MetricCard;