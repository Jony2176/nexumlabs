import React from 'react';
import { Subscription, Plan } from '../../types';
import { PRICING_PLANS } from '../../constants';
import { useDualPrice } from '../../hooks/useDualPrice';
import { formatDate } from '../../utils/formatters';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CurrentPlanProps {
  subscription: Subscription;
  onChangePlan: () => void;
  onCancel: () => void;
}

const planBadgeColors: { [key: string]: string } = {
  gray: 'bg-gray-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  gold: 'bg-yellow-500',
};

const CurrentPlan: React.FC<CurrentPlanProps> = ({ subscription, onChangePlan, onCancel }) => {
  const planDetails = PRICING_PLANS.find(p => p.id === subscription.plan_id);
  const { priceInfo, isLoading } = useDualPrice(subscription.price);

  const trialEndsDate = subscription.status === 'trialing' ? new Date(subscription.current_period_end) : null;
  const daysLeft = trialEndsDate ? Math.ceil((trialEndsDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
  if (!planDetails) {
    return <Card><div className="p-6">Error: Plan no encontrado.</div></Card>;
  }

  const badgeColor = planDetails.color ? planBadgeColors[planDetails.color] : 'bg-gray-500';

  return (
    <Card variant="glass">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
          <div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${badgeColor}`}>
                {planDetails.name}
              </span>
              {subscription.status === 'cancelled' && (
                <span className="px-3 py-1 text-sm font-medium rounded-full capitalize bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                  Cancelado
                </span>
              )}
            </div>
            <p className="text-text-secondary mt-2">{planDetails.description}</p>
          </div>
          <div className="mt-4 sm:mt-0 text-left sm:text-right">
            {isLoading || !priceInfo ? (
              <div className="animate-pulse">
                <div className="h-8 w-28 bg-gray-700 rounded-md mb-1"></div>
                <div className="h-5 w-24 bg-gray-700 rounded-md"></div>
              </div>
            ) : (
              <>
                <p className="kpi-value">{priceInfo.formattedUSD}<span className="text-base font-normal text-text-secondary">/mes</span></p>
                <p className="text-sm text-text-muted">≈ {priceInfo.formattedARS}</p>
              </>
            )}
          </div>
        </div>

        {subscription.status === 'trialing' && trialEndsDate && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-900/20 border border-yellow-700/50 mb-4">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <p className="text-sm text-yellow-200">
              Tu período de prueba termina en <strong>{daysLeft} días</strong>. ¡Actualiza para no perder acceso!
            </p>
          </div>
        )}

        <div className="border-t border-border-color pt-4">
          <h4 className="font-semibold text-text-secondary mb-3">Características incluidas:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {planDetails.features.slice(0, 6).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-gray-800/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-b-xl">
        <p className="text-sm text-text-secondary">
          {subscription.status === 'cancelled' ? (
              `El acceso termina el ${formatDate(subscription.current_period_end)}.`
          ) : subscription.status !== 'trialing' ? (
              `Tu plan se renueva el ${formatDate(subscription.current_period_end)}.`
          ) : 'Elige un plan para continuar después de la prueba.'}
        </p>
        <div className="flex gap-2">
          <Button onClick={onChangePlan}>{subscription.status === 'cancelled' ? 'Reactivar' : 'Cambiar Plan'}</Button>
          {subscription.status !== 'cancelled' && (
            <Button onClick={onCancel} variant="outline">Cancelar</Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CurrentPlan;