
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plan } from '../../types';
import toast from 'react-hot-toast';

import PlanSelector from '../../components/pricing/PlanSelector';
import CountdownTimer from '../../components/pricing/CountdownTimer';
import AddonsSection from '../../components/pricing/AddonsSection';
import PricingComparisonTable from '../../components/pricing/PricingComparisonTable';
import PricingFaq from '../../components/pricing/PricingFaq';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');
  const [view, setView] = useState<'available' | 'all'>('available');

  const handlePlanSelect = (plan: Plan) => {
    if(plan.enterprise) {
      navigate('/contacto');
    } else {
      toast.success(`Excelente elección: ${plan.name}`);
      navigate('/register', { state: { selectedPlan: plan.id } });
    }
  };
  
  return (
    <div className="theme-bg-secondary text-text-primary">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
             <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
                🔥 Precios de lanzamiento - Ahorra hasta 40%
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">Planes Simples y Transparentes</h1>
            <p className="text-lg lg:text-xl text-text-secondary">Sin costos ocultos. Cancela cuando quieras.</p>
          </div>
          
          <CountdownTimer />

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            {/* Period Toggle */}
            <div className="relative flex items-center rounded-full bg-gray-800 p-1">
                <div className={cn('absolute top-1 h-10 rounded-full bg-gradient-to-r shadow-lg transition-transform duration-300 ease-in-out', billingPeriod === 'annual' ? 'w-[152px] translate-x-[108px] from-green-500 to-teal-500' : 'w-[100px] translate-x-1 from-blue-500 to-blue-600')}/>
                <button onClick={() => setBillingPeriod('monthly')} className="relative z-10 w-[100px] rounded-full py-2 text-center text-sm font-semibold transition-colors duration-300"><span className={billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}>Mensual</span></button>
                <button onClick={() => setBillingPeriod('annual')} className="relative z-10 w-[152px] rounded-full py-2 text-center text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2"><span className={billingPeriod === 'annual' ? 'text-white' : 'text-gray-400'}>Anual</span><span className={cn('text-xs px-2 py-0.5 rounded-full font-bold transition-all duration-300', billingPeriod === 'annual' ? 'bg-yellow-400 text-black animate-pulse' : 'bg-gray-700 text-gray-400')}>Ahorra 20%</span></button>
            </div>
            {/* Currency Toggle */}
            <div className="flex items-center rounded-full bg-gray-800 p-1">
                <button onClick={() => setCurrency('USD')} className={cn('px-4 py-2 text-sm rounded-full', currency === 'USD' ? 'bg-gray-700 text-white' : 'text-gray-400')}>🇺🇸 USD</button>
                <button onClick={() => setCurrency('ARS')} className={cn('px-4 py-2 text-sm rounded-full', currency === 'ARS' ? 'bg-gray-700 text-white' : 'text-gray-400')}>🇦🇷 ARS</button>
            </div>
            {/* View Toggle */}
            <div className="flex items-center rounded-full bg-gray-800 p-1">
                <button onClick={() => setView('available')} className={cn('px-4 py-2 text-sm rounded-full', view === 'available' ? 'bg-gray-700 text-white' : 'text-gray-400')}>Disponibles</button>
                <button onClick={() => setView('all')} className={cn('px-4 py-2 text-sm rounded-full', view === 'all' ? 'bg-gray-700 text-white' : 'text-gray-400')}>Ver Todos</button>
            </div>
          </div>
          
          <PlanSelector onPlanSelect={handlePlanSelect} isAnnual={billingPeriod === 'annual'} currency={currency} view={view}/>

        </div>
      </section>

      <AddonsSection currency={currency} />
      
      <PricingComparisonTable />

      <PricingFaq />

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <div style={{ background: 'var(--nexum-gradient-primary)' }} className="p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-white">¿Necesitas una solución a medida?</h2>
                <p className="text-white mt-2 mb-6 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">Planes Enterprise personalizados para estudios con +50 abogados, con todo ilimitado, SLA garantizado y soporte dedicado.</p>
                 <Button onClick={() => navigate('/contacto')} size="lg">
                    Hablar con Ventas
                </Button>
            </div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;
