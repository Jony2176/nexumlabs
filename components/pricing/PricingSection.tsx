import React, { useState } from 'react';
import PlanSelector from './PlanSelector';
import { Plan } from '../../types';
import AnnualSavingsBanner from './AnnualSavingsBanner';

interface PricingSectionProps {
  onPlanSelect: (plan: Plan) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onPlanSelect }) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-16 theme-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold theme-text-primary mb-3">Planes Flexibles para tu Estudio</h2>
          <p className="text-lg text-text-secondary">Elige el plan que mejor se adapte a tus necesidades.</p>
        </div>
        
        <div className="flex justify-center items-center mb-12">
            <div className="relative flex w-auto items-center rounded-full bg-gray-800 p-1">
                <div
                    className={`absolute left-1 top-1 h-10 rounded-full bg-gradient-to-r shadow-lg transition-transform duration-300 ease-in-out
                    ${billingPeriod === 'annual' 
                        ? 'w-[152px] translate-x-[108px] from-green-500 to-teal-500' 
                        : 'w-[100px] translate-x-0 from-blue-500 to-blue-600'
                    }`}
                />
                <button
                    onClick={() => setBillingPeriod('monthly')}
                    className="relative z-10 w-[100px] rounded-full py-2 text-center text-sm font-semibold transition-colors duration-300"
                    aria-pressed={billingPeriod === 'monthly'}
                >
                    <span className={billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}>
                        Mensual
                    </span>
                </button>
                <button
                    onClick={() => setBillingPeriod('annual')}
                    className="relative z-10 w-[152px] rounded-full py-2 text-center text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                    aria-pressed={billingPeriod === 'annual'}
                >
                    <span className={billingPeriod === 'annual' ? 'text-white' : 'text-gray-400'}>
                        Anual
                    </span>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold transition-all duration-300 ${
                        billingPeriod === 'annual' ? 'bg-yellow-400 text-black animate-pulse' : 'bg-gray-700 text-gray-400'
                        }`}
                    >
                        Ahorra 20%
                    </span>
                </button>
            </div>
        </div>
        
        <AnnualSavingsBanner isAnnual={billingPeriod === 'annual'} />
        
        <PlanSelector 
            onPlanSelect={onPlanSelect} 
            isAnnual={billingPeriod === 'annual'} 
            currency="USD"
            view="all"
        />

      </div>
    </section>
  );
};

export default PricingSection;