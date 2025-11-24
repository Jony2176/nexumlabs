import React from 'react';
import Card from '../ui/Card';
import { Zap } from 'lucide-react';

interface ConversionKpiCardProps {
  rate: number;
  clicks: number;
  conversions: number;
}

const ConversionKpiCard: React.FC<ConversionKpiCardProps> = ({ rate, clicks, conversions }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
          <Zap className="h-6 w-6 text-indigo-500" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasa de Conversión</h3>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{(rate * 100).toFixed(2)}%</span>
      </div>
       <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 space-y-1">
        <p>Clicks: <strong>{clicks.toLocaleString()}</strong></p>
        <p>Conversiones: <strong>{conversions.toLocaleString()}</strong></p>
      </div>
    </Card>
  );
};

export default ConversionKpiCard;
