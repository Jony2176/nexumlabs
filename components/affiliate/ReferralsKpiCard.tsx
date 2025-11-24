import React from 'react';
import Card from '../ui/Card';
import { Users } from 'lucide-react';

interface ReferralsKpiCardProps {
  active: number;
  total: number;
}

const ReferralsKpiCard: React.FC<ReferralsKpiCardProps> = ({ active, total }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
          <Users className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Referidos</h3>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{active}</span>
        <span className="text-lg text-gray-500"> / {total}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Activos / Totales</p>
    </Card>
  );
};

export default ReferralsKpiCard;
