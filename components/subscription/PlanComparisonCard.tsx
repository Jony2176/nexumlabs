import React from 'react';
import { Plan } from '../../types';
import Button from '../ui/Button';
import { Check } from 'lucide-react';

interface PlanComparisonCardProps {
  plan: Plan;
  isCurrent: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const planColors = {
  gray: 'border-gray-500',
  blue: 'border-blue-500',
  purple: 'border-purple-500',
  gold: 'border-yellow-500',
};

const PlanComparisonCard: React.FC<PlanComparisonCardProps> = ({ plan, isCurrent, isSelected, onSelect }) => {
  const colorClass = plan.color ? planColors[plan.color] : planColors.gray;
  const isUpgrade = !isCurrent && plan.price.monthly > 0; // Simplified logic, assumes current plan details are available elsewhere.
  
  return (
    <div className={`
      flex flex-col rounded-xl p-6 h-full transition-all duration-300
      bg-gray-50 dark:bg-gray-800/50 border-2
      ${isSelected ? `${colorClass} scale-105` : 'border-border-color'}
      ${isCurrent ? 'opacity-70' : ''}
    `}>
      {plan.badge && (
          <div className="text-center mb-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${plan.color === 'purple' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                {plan.badge}
            </span>
          </div>
      )}

      <h3 className="text-xl font-bold text-text-primary text-center">{plan.name}</h3>
      <p className="text-sm text-text-secondary text-center h-10">{plan.description}</p>

      <div className="my-6 text-center">
        <span className="text-4xl font-bold text-text-primary">${plan.price.monthly}</span>
        <span className="text-text-muted">/mes</span>
      </div>

      <ul className="space-y-2 mb-8 flex-grow text-sm">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-text-secondary">
            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onSelect}
        disabled={isCurrent}
        variant={isSelected ? 'default' : 'outline'}
        className="w-full mt-auto"
      >
        {isCurrent ? 'Plan Actual' : isSelected ? 'Seleccionado' : 'Seleccionar'}
      </Button>
    </div>
  );
};

export default PlanComparisonCard;
