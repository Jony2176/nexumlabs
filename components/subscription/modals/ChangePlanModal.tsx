import React, { useState, useEffect } from 'react';
// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plan, Subscription } from '../../../types';
import * as mockApi from '../../../services/mockApi';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { X } from 'lucide-react';
import PlanComparisonCard from '../PlanComparisonCard';
import ProrationCalculator from '../ProrationCalculator';

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubscription: Subscription;
  onPlanChanged: (subscription: Subscription) => void;
}

// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
const MotionDiv = motion.div;

const ChangePlanModal: React.FC<ChangePlanModalProps> = ({ isOpen, onClose, currentSubscription, onPlanChanged }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchPlans = async () => {
        setIsLoading(true);
        try {
          const { data } = await mockApi.default.getAllPlans();
          setPlans(data);
        } catch (error) {
          toast.error('No se pudieron cargar los planes.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPlans();
    }
  }, [isOpen]);
  
  const handleSelectPlan = (plan: Plan) => {
    if (plan.id === currentSubscription.plan_id) return;
    setSelectedPlan(plan);
  };
  
  const handleConfirmChange = async () => {
    if (!selectedPlan) return;
    setIsUpdating(true);
    const toastId = toast.loading(`Actualizando al plan ${selectedPlan.name}...`);
    try {
        const { data } = await mockApi.default.changePlan(selectedPlan.id);
        toast.success('¡Plan actualizado con éxito!', { id: toastId });
        onPlanChanged(data);
        onClose();
    } catch {
        toast.error('No se pudo actualizar el plan.', { id: toastId });
    } finally {
        setIsUpdating(false);
    }
  };

  if (!isOpen) return null;
  
  const currentPlan = plans.find(p => p.id === currentSubscription.plan_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <MotionDiv initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-4xl">
        <Card onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-border-color flex justify-between items-center">
            <h2 className="text-xl font-bold text-text-primary">Cambiar de Plan</h2>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
          </div>
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {isLoading ? (
              <div className="grid grid-cols-3 gap-4 animate-pulse">
                <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.filter(p => !p.enterprise).map(plan => (
                        <PlanComparisonCard
                            key={plan.id}
                            plan={plan}
                            isCurrent={plan.id === currentSubscription.plan_id}
                            isSelected={plan.id === selectedPlan?.id}
                            onSelect={() => handleSelectPlan(plan)}
                        />
                        ))}
                    </div>
                    {selectedPlan && currentPlan && (
                        <div className="mt-8">
                            <ProrationCalculator 
                                currentPlan={currentPlan}
                                newPlan={selectedPlan}
                                onConfirm={handleConfirmChange}
                                isUpdating={isUpdating}
                            />
                        </div>
                    )}
                </>
            )}
          </div>
        </Card>
      </MotionDiv>
    </div>
  );
};

export default ChangePlanModal;