import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare, Phone, LayoutDashboard, User, BrainCircuit } from 'lucide-react';
import SubscriptionStatusPremium from '../components/billing/SubscriptionStatusPremium';
import ModuleCardPremium from '../components/dashboard/ModuleCardPremium';
import SystemConsole from '../components/billing/SystemConsole';
import ConfettiCelebration from '../components/billing/ConfettiCelebration';
import { useModules } from '../hooks/useModules';
import { Plan } from '../types';

type Status = 'pending_payment' | 'processing' | 'active' | 'failed';

const MotionDiv = motion.div;
const MotionButton = motion.button;

const BillingSuccessPage: React.FC = () => {
  const [status, setStatus] = useState<Status>('pending_payment');
  const location = useLocation();
  const navigate = useNavigate();
  const { mergedModules } = useModules();
  
  const plan = location.state?.plan as Plan || { name: 'Pro', id: 'pro' };

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus('processing'), 2000);
    const timer2 = setTimeout(() => setStatus('active'), 5000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getPlanModules = () => {
    // This is a mock logic based on plan name.
    // In a real app, this would come from an API or constants.
    if (plan.id === 'pro' || plan.id === 'professional' || plan.id === 'business' || plan.id === 'enterprise' ) {
        return mergedModules.map(m => ({ ...m, isActive: true }));
    }
    if (plan.id === 'start') {
        return mergedModules.map(m => ({ ...m, isActive: m.id === 'elias_whatsapp'}));
    }
    return mergedModules.map(m => ({ ...m, isActive: false }));
  }
  const planModules = getPlanModules();

  return (
    <div className="min-h-screen theme-bg-primary relative overflow-hidden text-text-primary p-4 sm:p-6 lg:p-8">
      {status === 'active' && <ConfettiCelebration />}
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary/50 dark:bg-nexum-surface/50 backdrop-blur-sm border border-border-color dark:border-nexum-border mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-text-secondary font-medium">
              Sistema de activación automática
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extralight text-text-primary mb-4">
            <span className="font-light bg-gradient-to-r from-nexum-gradient-start to-nexum-gradient-end bg-clip-text text-transparent">
              NEXUM
            </span>
            {" "}Platform
          </h1>
          <p className="text-xl text-text-secondary">
            Inteligencia legal automatizada
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SubscriptionStatusPremium 
            status={status}
            planName={plan.name}
          />
        </MotionDiv>
        
        <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">Módulos de tu Plan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {planModules.map((module, index) => (
                            <ModuleCardPremium
                                key={module.id}
                                module={module}
                                onAction={() => {}}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">Logs de Activación</h2>
                    <SystemConsole status={status} />

                    {status === 'active' && (
                        <MotionButton
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => navigate('/app/dashboard')}
                            className="w-full mt-6 bg-gradient-to-r from-nexum-gradient-start to-nexum-gradient-end text-white py-3 px-6 rounded-lg font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                            Ir al Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </MotionButton>
                    )}
                </div>
            </div>
        </MotionDiv>

      </div>
    </div>
  );
};

export default BillingSuccessPage;