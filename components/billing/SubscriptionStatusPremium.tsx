import React from 'react';
// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import CircularProgress from './CircularProgress';

type Status = 'pending_payment' | 'processing' | 'active' | 'failed';

interface SubscriptionStatusPremiumProps {
    status: Status;
    planName: string;
}

// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
const MotionDiv = motion.div;

const SubscriptionStatusPremium: React.FC<SubscriptionStatusPremiumProps> = ({ status, planName }) => {
  
  const statusConfig = {
    pending_payment: {
      gradient: 'from-yellow-500/20 via-yellow-500/10 to-transparent',
      border: 'border-yellow-500/50',
      glow: 'shadow-yellow-500/20',
      icon: <Loader2 className="w-6 h-6 animate-spin text-yellow-500" />,
      title: 'Procesando tu pago',
      subtitle: 'Verificando con la pasarela de pagos...',
      progress: 33
    },
    processing: {
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      border: 'border-blue-500/50',
      glow: 'shadow-blue-500/20',
      icon: <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse" />,
      title: 'Activando suscripción',
      subtitle: 'Configurando tus módulos y preparando el dashboard...',
      progress: 66
    },
    active: {
      gradient: 'from-green-500/20 via-green-500/10 to-transparent',
      border: 'border-green-500/50',
      glow: 'shadow-green-500/20',
      icon: <CheckCircle2 className="w-6 h-6 text-green-500" />,
      title: `Plan ${planName} activado`,
      subtitle: '¡Todo está listo para comenzar! Bienvenido a NEXUM.',
      progress: 100
    },
    failed: {
      gradient: 'from-red-500/20 via-red-500/10 to-transparent',
      border: 'border-red-500/50',
      glow: 'shadow-red-500/20',
      icon: <CheckCircle2 className="w-6 h-6 text-red-500" />,
      title: `Falló la activación`,
      subtitle: 'Hubo un problema. Contacta a soporte.',
      progress: 0
    }
  }

  const current = statusConfig[status];

  return (
    <div className="relative mb-12">
      <div className={`absolute -inset-4 bg-gradient-to-r ${current.gradient} rounded-2xl blur-xl ${current.glow} transition-all duration-500`} />
      
      <div className={`relative bg-bg-secondary/50 dark:bg-nexum-surface/50 backdrop-blur-xl border ${current.border} rounded-2xl p-8 shadow-2xl transition-all duration-500`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-4">
            <MotionDiv
              key={status}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {current.icon}
            </MotionDiv>
            <div>
              <h2 className="text-xl md:text-2xl font-light text-text-primary">
                {current.title}
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                {current.subtitle}
              </p>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <CircularProgress value={current.progress} />
          </div>
        </div>

        <div className="relative h-1 bg-border-color dark:bg-nexum-border rounded-full overflow-hidden">
          <MotionDiv
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-nexum-gradient-start to-nexum-gradient-end"
            initial={{ width: '0%' }}
            animate={{ width: `${current.progress}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {['Pago recibido', 'Activando módulos', 'Listo para usar'].map((step, idx) => (
            <div 
              key={idx}
              className={`text-center text-xs sm:text-sm transition-colors duration-500 ${
                (idx * 33) < current.progress ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mx-auto mb-2 transition-colors duration-500 ${
                (idx * 33) < current.progress ? 'bg-primary' : 'bg-border-color'
              }`} />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatusPremium;