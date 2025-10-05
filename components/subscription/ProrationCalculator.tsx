import React from 'react';
import { Plan } from '../../types';
import Button from '../ui/Button';

interface ProrationCalculatorProps {
  currentPlan: Plan;
  newPlan: Plan;
  onConfirm: () => void;
  isUpdating: boolean;
}

const ProrationCalculator: React.FC<ProrationCalculatorProps> = ({ currentPlan, newPlan, onConfirm, isUpdating }) => {
  // Mock proration logic
  const daysInMonth = 30;
  const daysRemaining = 15; // Assume 15 days left in the billing cycle
  
  const isUpgrade = newPlan.price.monthly > currentPlan.price.monthly;

  const credit = (currentPlan.price.monthly / daysInMonth) * daysRemaining;
  const newCost = (newPlan.price.monthly / daysInMonth) * daysRemaining;
  const immediatePayment = Math.max(0, newCost - credit);

  return (
    <div className="mt-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-border-color">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Resumen del Cambio</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Crédito por días no usados de {currentPlan.name}:</span>
          <span className="font-medium text-green-500">- ${credit.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Costo por días restantes de {newPlan.name}:</span>
          <span className="font-medium text-text-primary">+ ${newCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-border-color pt-3 mt-3">
          <span className="font-bold text-text-primary">Total a pagar hoy:</span>
          <span className="font-bold text-text-primary">${immediatePayment.toFixed(2)} USD</span>
        </div>
      </div>
      <p className="text-xs text-text-muted mt-4">
        Tu próxima factura el mes que viene será de ${newPlan.price.monthly.toFixed(2)} USD.
      </p>
      <div className="mt-6 text-right">
        <Button onClick={onConfirm} disabled={isUpdating}>
          {isUpdating ? 'Actualizando...' : `Confirmar y Pagar $${immediatePayment.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default ProrationCalculator;
