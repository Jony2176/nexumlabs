
import React from 'react';
import { Server, Zap, Wrench, Users, BarChart, Percent, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface Cost {
    category: string;
    amount: number;
    color: string;
}

interface CostBreakdownPanelProps {
  costs: {
    breakdown: Cost[];
    total: number;
    grossMargin: number;
    netMargin: number;
  };
}

const iconMap: { [key: string]: React.ElementType } = {
    Infraestructura: Server,
    "APIs externas": Zap,
    Herramientas: Wrench,
    "Comisiones afiliados": Users,
    Marketing: BarChart,
};

const colorClasses: { [key: string]: string } = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
}

const CostBreakdownPanel: React.FC<CostBreakdownPanelProps> = ({ costs }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg h-full p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Desglose de Costos (Mensual)</h3>
      
      <div className="space-y-3 mb-6">
        {costs.breakdown.map((cost, index) => {
          const Icon = iconMap[cost.category.split(' ')[0]] || PiggyBank;
          return (
            <div key={index} className="flex items-center justify-between text-sm p-3 bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${colorClasses[cost.color]}`} />
                    <span className="text-gray-300">{cost.category}</span>
                </div>
                <span className="font-mono text-white">{formatCurrency(cost.amount)}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-700 pt-4 space-y-3">
          <div className="flex justify-between font-semibold">
              <span className="text-gray-300">Total Gastos:</span>
              <span className="text-red-400">{formatCurrency(costs.total)}</span>
          </div>
           <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-400">Margen Bruto</p>
                  <p className="text-lg font-bold text-green-400 flex items-center justify-center gap-1"><Percent size={16}/> {costs.grossMargin}%</p>
              </div>
               <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                  <p className="text-xs text-gray-400">Ganancia Neta</p>
                  <p className="text-lg font-bold text-green-400 flex items-center justify-center gap-1"><Percent size={16}/>{costs.netMargin}%</p>
              </div>
           </div>
      </div>
    </div>
  );
};

export default CostBreakdownPanel;