import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { Award } from 'lucide-react';

interface TopAffiliatesProps {
  affiliates: { nombre: string; revenue: number; }[];
}

const TopAffiliates: React.FC<TopAffiliatesProps> = ({ affiliates }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Award size={18}/> Top Afiliados (Mes)</h3>
      <ul className="space-y-3">
        {affiliates.map((aff, index) => (
          <li key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="text-gray-500 font-semibold w-6">{index + 1}.</span>
              <span className="text-gray-300">{aff.nombre}</span>
            </div>
            <span className="font-semibold text-green-400">{formatCurrency(aff.revenue)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAffiliates;