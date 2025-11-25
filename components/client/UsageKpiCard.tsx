import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/badge';
import { Progress } from '../ui/Progress';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface UsageKpiCardProps {
  module: string;
  used: number;
  limit: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  unit?: string;
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    icon: 'text-blue-500',
    progress: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    icon: 'text-green-500',
    progress: 'bg-green-500',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    icon: 'text-purple-500',
    progress: 'bg-purple-500',
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    icon: 'text-orange-500',
    progress: 'bg-orange-500',
  },
};

const UsageKpiCard: React.FC<UsageKpiCardProps> = ({ module, used, limit, icon, color, unit }) => {
  const percentage = limit > 0 ? Math.round((used / limit) * 100) : 0;
  const variants = colorVariants[color];

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className={cn('p-3 rounded-lg', variants.bg)}>
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: cn('h-6 w-6', variants.icon) })}
        </div>
        <Badge variant={percentage >= 90 ? 'destructive' : percentage >= 70 ? 'warning' : 'success'}>
          {percentage}%
        </Badge>
      </div>
      
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {module}
      </h3>
      
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {used.toLocaleString()}
        </span>
        <span className="text-lg text-gray-500"> / {limit > 0 ? limit.toLocaleString() : '∞'}</span>
        {unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
      </div>
      
      <Progress 
        value={percentage} 
        className="mt-4 h-2"
        indicatorClassName={variants.progress}
      />
      
      {percentage >= 80 && (
        <Alert variant="warning" className="mt-3">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {percentage >= 90 
              ? "Cerca del límite. Considere actualizar su plan."
              : "Uso elevado. Monitoree su consumo."}
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
};

export default UsageKpiCard;