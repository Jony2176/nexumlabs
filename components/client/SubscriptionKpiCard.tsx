import React from 'react';
import Card from '../ui/Card';

interface SubscriptionKpiCardProps {
  daysUntilRenewal: number;
  amount: number;
  currency: string;
  icon: React.ReactNode;
}

const SubscriptionKpiCard: React.FC<SubscriptionKpiCardProps> = ({ daysUntilRenewal, amount, currency, icon }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'h-6 w-6 text-purple-500' })}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Próxima Factura</h3>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {daysUntilRenewal}
        </span>
        <span className="text-lg text-gray-500"> días</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Monto a renovar: <strong>${amount.toLocaleString()} {currency}</strong>
      </p>
    </Card>
  );
};

export default SubscriptionKpiCard;