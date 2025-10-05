


import React, { useRef, useState, useEffect } from 'react';
// FIX: Changed import from 'react-router' to 'react-router-dom' for web compatibility.
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import PricingSection from '../components/pricing/PricingSection';
import { useSubscription } from '../hooks/useSubscription';
import { Plan, Subscription } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatDate } from '../utils/formatters';
import CountdownTimer from '../components/pricing/CountdownTimer';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import AddOnsSection from '../components/billing/AddOnsSection';
import Roadmap from '../components/pricing/Roadmap';

const BillingPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { subscription, isLoading, error } = useSubscription();

  // Local state to manage the subscription, allowing UI updates after cancellation
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (subscription) {
      setCurrentSubscription(subscription);
    }
  }, [subscription]);

  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handlePlanSelect = (plan: Plan) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/billing/success', { state: { plan } });
  };

  const handleScrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    const toastId = toast.loading('Cancelando suscripción...');
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Tu suscripción ha sido cancelada.', { id: toastId });
    
    // Update local state to reflect the change immediately in the UI
    setCurrentSubscription(prev => {
        if (!prev) return null;
        return { ...prev, status: 'cancelled' };
    });

    setIsCancelling(false);
    setIsCancelModalOpen(false);
  };

  const renderSubscriptionStatus = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-24"><LoadingSpinner /></div>;
    }

    if (error || !currentSubscription) {
      return <p className="text-center text-text-secondary">No tienes una suscripción activa.</p>;
    }

    if (currentSubscription.status === 'cancelled') {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-text-primary">Plan Actual</h2>
                <span className="px-3 py-1 text-sm font-medium rounded-full capitalize bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                    Cancelado
                </span>
                </div>
                <p className="text-text-secondary">
                    Tu suscripción al plan <strong className="text-text-primary capitalize">{currentSubscription.plan_id}</strong> fue cancelada. 
                    Mantendrás el acceso hasta el {formatDate(currentSubscription.current_period_end)}.
                </p>
                <div className="pt-4">
                    <Button onClick={handleScrollToPricing}>Ver Otros Planes</Button>
                </div>
            </div>
        );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-primary">Plan Actual</h2>
          <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
            currentSubscription.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
          }`}>
            {currentSubscription.status}
          </span>
        </div>
        <div className="text-text-secondary">
          <p><strong>Plan:</strong> <span className="text-text-primary font-medium capitalize">{currentSubscription.plan_id} (Mensual)</span></p>
          <p><strong>Precio:</strong> <span className="text-text-primary font-medium">${currentSubscription.price}/mes</span></p>
          <p><strong>Próxima renovación:</strong> <span className="text-text-primary font-medium">{formatDate(currentSubscription.current_period_end)}</span></p>
        </div>
        <div className="pt-4 flex space-x-2">
          <Button onClick={handleScrollToPricing}>Cambiar Plan</Button>
          <Button variant="outline" onClick={() => setIsCancelModalOpen(true)}>Cancelar Suscripción</Button>
        </div>
      </div>
    );
  };
  
  const userPlan = currentSubscription?.plan_id || 'pro';

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Facturación</h1>
          <p className="text-text-secondary mt-1">Gestiona tu suscripción y planes.</p>
        </div>
        
        <Card>
          <div className="p-6">
            {renderSubscriptionStatus()}
          </div>
        </Card>

        <section className="py-16 theme-bg-secondary rounded-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* FIX: Corrected the prop name from 'userPlan' to 'userPlanId' in the AddOnsSection component to match its definition and resolve the TypeScript error. */}
                <AddOnsSection userPlanId={userPlan} />
            </div>
        </section>

        <Roadmap />

        <CountdownTimer />
        
        <div ref={pricingSectionRef}>
            <PricingSection onPlanSelect={handlePlanSelect} />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancelar Suscripción"
        isLoading={isCancelling}
        confirmText="Sí, cancelar"
        cancelText="No, mantener"
      >
        <p>
          ¿Estás seguro de que quieres cancelar tu suscripción? Perderás el acceso a los módulos de tu plan al final del período de facturación actual.
        </p>
      </ConfirmationModal>
    </>
  );
};

export default BillingPage;