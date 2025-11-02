import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { Award } from 'lucide-react';
import Card from '../../ui/Card';

interface TopAffiliatesProps {
  affiliates: { nombre: string; revenue: number; }[];
}

const TopAffiliates: React.FC<TopAffiliatesProps> = ({ affiliates }) => {
  return (
    <Card className="p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"><Award size={18}/> Top Afiliados (Mes)</h3>
      <ul className="space-y-3">
        {affiliates.map((aff, index) => (
          <li key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="text-text-muted font-semibold w-6">{index + 1}.</span>
              <span className="text-text-secondary">{aff.nombre}</span>
            </div>
            <span className="font-semibold text-green-400">{formatCurrency(aff.revenue)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default TopAffiliates;