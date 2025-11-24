import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/badge';

interface PlanStatusCardProps {
  status: string;
  autoRenew: boolean;
  icon: React.ReactNode;
}

const PlanStatusCard: React.FC<PlanStatusCardProps> = ({ status, autoRenew, icon }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'h-6 w-6 text-orange-500' })}
        </div>
        <Badge variant={status === 'active' ? 'success' : 'warning'}>{status}</Badge>
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado del Plan</h3>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {status === 'active' ? 'Activo' : status}
        </span>
      </div>
       <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Auto-renovación: <strong>{autoRenew ? 'Activada' : 'Desactivada'}</strong>
      </p>
    </Card>
  );
};

export default PlanStatusCard;