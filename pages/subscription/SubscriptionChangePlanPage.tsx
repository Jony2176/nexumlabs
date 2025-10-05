import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';

import * as mockApi from '../../services/mockApi';
import { Plan, Subscription } from '../../types';
import PlanComparisonCard from '../../components/subscription/PlanComparisonCard';
import ProrationCalculator from '../../components/subscription/ProrationCalculator';
import AddOnsSection from '../../components/billing/AddOnsSection';
import { useExitIntent } from '../../hooks/useExitIntent';
import ExitIntentPopup from '../../components/waitlist/ExitIntentPopup';

const MotionDiv = motion.div;

const SubscriptionChangePlanPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useExitIntent(() => setIsPopupOpen(true));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [plansRes, subRes] = await Promise.all([
          mockApi.default.getAllPlans(),
          mockApi.default.getSubscription(),
        ]);
        setPlans(plansRes.data);
        setCurrentSubscription(subRes.data);
      } catch (error) {
        toast.error('Error al cargar los planes.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleSelectPlan = (plan: Plan) => {
    if (plan.id === currentSubscription?.plan_id) {
        setSelectedPlan(null);
    } else {
        setSelectedPlan(plan);
    }
  }

  const handleConfirmChange = async () => {
      if (!selectedPlan) return;
      setIsUpdating(true);
      const toastId = toast.loading(`Cambiando al plan ${selectedPlan.name}...`);
      try {
        await mockApi.default.changePlan(selectedPlan.id);
        toast.success('¡Plan actualizado con éxito!', { id: toastId, duration: 4000 });
        navigate('/app/subscription');
      } catch (error) {
          toast.error('No se pudo actualizar el plan.', { id: toastId });
          setIsUpdating(false);
      }
  }
  
  const currentPlan = plans.find(p => p.id === currentSubscription?.plan_id);
  const userPlanId = currentSubscription?.plan_id || '';

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <ExitIntentPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <div className="space-y-12">
        <Link to="/app/subscription" className="flex items-center text-sm theme-accent hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Mi Suscripción
        </Link>
        
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Elige el Plan Perfecto para tu Estudio</h1>
          <p className="text-text-secondary mt-2 max-w-2xl mx-auto">
            Compara los planes y encuentra el que mejor se adapte a tus necesidades. Puedes cambiar en cualquier momento.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {plans.filter(p => !p.enterprise).map((plan, idx) => (
            <MotionDiv key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <PlanComparisonCard
                  plan={plan}
                  isCurrent={plan.id === currentSubscription?.plan_id}
                  isSelected={plan.id === selectedPlan?.id}
                  onSelect={() => handleSelectPlan(plan)}
              />
            </MotionDiv>
          ))}
        </div>
        
        {selectedPlan && currentPlan && (
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ProrationCalculator
              currentPlan={currentPlan}
              newPlan={selectedPlan}
              onConfirm={handleConfirmChange}
              isUpdating={isUpdating}
            />
          </MotionDiv>
        )}

        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <AddOnsSection userPlanId={userPlanId} />
        </MotionDiv>
      </div>
    </>
  );
};

export default SubscriptionChangePlanPage;