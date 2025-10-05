import React from 'react';
import { PRICING_PLANS } from '../../constants';
import PricingCard from './PricingCard';
import { Plan } from '../../types';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';

interface PlanSelectorProps {
    onPlanSelect: (plan: Plan) => void;
    isAnnual: boolean;
    currency: 'USD' | 'ARS';
    view: 'available' | 'all';
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ onPlanSelect, isAnnual, currency, view }) => {
  const { isAvailable } = useFeatureFlags();

  const allPlans = PRICING_PLANS;
  
  const displayedPlans = allPlans.filter(plan => {
    if (view === 'all') {
      return true;
    }
    // For 'available' view, we check if all required modules for a plan are launched.
    // For this demonstration, as per the prompt, we will hardcode the first 4 plans as available.
    return ['lite', 'start', 'pro', 'professional'].includes(plan.id);
  });

  return (
    <div className="grid max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {allPlans.map((plan) => {
            const planIsAvailable = ['lite', 'start', 'pro', 'professional'].includes(plan.id);
            if (view === 'available' && !planIsAvailable) return null;
            
            return (
                <PricingCard 
                    key={plan.id} 
                    plan={plan}
                    onSelect={onPlanSelect}
                    isAnnual={isAnnual}
                    currency={currency}
                    isAvailable={planIsAvailable}
                />
            )
        })}
    </div>
  );
};

export default PlanSelector;