import React from 'react';
import Card from '../ui/Card';
import { DollarSign } from 'lucide-react';

interface EarningsKpiCardProps {
  amount: number;
  firstMonth: number;
  recurring: number;
}

const EarningsKpiCard: React.FC<EarningsKpiCardProps> = ({ amount, firstMonth, recurring }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
          <DollarSign className="h-6 w-6 text-yellow-500" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ganancias (Este Mes)</h3>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">${amount.toFixed(2)}</span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 space-y-1">
        <p>Primer Mes: <strong>${firstMonth.toFixed(2)}</strong></p>
        <p>Recurrente: <strong>${recurring.toFixed(2)}</strong></p>
      </div>
    </Card>
  );
};

export default EarningsKpiCard;
