import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Subscription } from '../../types';
import { useSubscription } from '../../hooks/useSubscription';

import LoadingSpinner from '../../components/ui/LoadingSpinner';
import CurrentPlan from '../../components/subscription/CurrentPlan';
import Addons from '../../components/subscription/Addons';
import PaymentMethods from '../../components/subscription/PaymentMethods';
import InvoiceHistory from '../../components/subscription/InvoiceHistory';
import CancelSubscriptionFlow from '../../components/subscription/modals/CancelSubscriptionFlow';
import Roadmap from '../../components/pricing/Roadmap';
import DashboardPremiumSkeleton from '../../components/dashboard/DashboardPremiumSkeleton';

const MotionDiv = motion.div;

const MySubscriptionPage: React.FC = () => {
  const { subscription: initialSubscription, isLoading } = useSubscription();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isCancelFlowOpen, setIsCancelFlowOpen] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (initialSubscription) {
      setSubscription(initialSubscription);
    }
  }, [initialSubscription]);


  const handleSubscriptionUpdate = (updatedSubscription: Subscription) => {
    setSubscription(updatedSubscription);
    setIsCancelFlowOpen(false);
  };
  
  if (isLoading) {
    return <DashboardPremiumSkeleton />;
  }

  return (
    <>
      <div className="space-y-12">
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-text-primary">Mi Suscripción</h1>
          <p className="text-text-secondary mt-1">Gestiona tu plan, add-ons y facturación en un solo lugar.</p>
        </MotionDiv>

        {subscription && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
               <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <CurrentPlan 
                    subscription={subscription} 
                    onChangePlan={() => navigate('/app/subscription/change-plan')}
                    onCancel={() => setIsCancelFlowOpen(true)}
                  />
               </MotionDiv>
               <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Addons />
               </MotionDiv>
            </div>
            <div className="lg:col-span-1 space-y-8">
              <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <PaymentMethods />
              </MotionDiv>
              <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <InvoiceHistory />
              </MotionDiv>
            </div>
          </div>
        )}
        
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Roadmap />
        </MotionDiv>
      </div>

      {subscription && (
        <CancelSubscriptionFlow
          isOpen={isCancelFlowOpen}
          onClose={() => setIsCancelFlowOpen(false)}
          subscription={subscription}
          onSubscriptionUpdate={handleSubscriptionUpdate}
        />
      )}
    </>
  );
};

export default MySubscriptionPage;