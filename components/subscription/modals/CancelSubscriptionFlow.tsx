import React, { useState } from 'react';
// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import { Subscription } from '../../../types';
import * as mockApi from '../../../services/mockApi';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { X } from 'lucide-react';

type Step = 'reason' | 'offer' | 'confirm';
type Reason = 'price' | 'no_use' | 'technical' | 'other';

interface CancelSubscriptionFlowProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription;
  onSubscriptionUpdate: (subscription: Subscription) => void;
}

// FIX: Define motion component as a variable to resolve TypeScript type inference errors with framer-motion props.
const MotionDiv = motion.div;

const CancelSubscriptionFlow: React.FC<CancelSubscriptionFlowProps> = ({ isOpen, onClose, subscription, onSubscriptionUpdate }) => {
  const [step, setStep] = useState<Step>('reason');
  const [reason, setReason] = useState<Reason | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReasonSelect = (selectedReason: Reason) => {
    setReason(selectedReason);
    setStep('offer');
  };

  const handleAcceptOffer = async () => {
    setIsProcessing(true);
    const toastId = toast.loading('Aplicando oferta...');
    try {
        let updatedSub;
        if (reason === 'no_use') {
            const { data } = await mockApi.default.pauseSubscription();
            updatedSub = data;
            toast.success('Tu cuenta ha sido pausada por 3 meses.', { id: toastId });
        } else {
            const { data } = await mockApi.default.applyRetentionOffer();
            updatedSub = data;
            toast.success('¡Oferta aplicada! Disfruta de tu descuento.', { id: toastId });
        }
        onSubscriptionUpdate(updatedSub);
    } catch {
        toast.error('No se pudo aplicar la oferta.', { id: toastId });
    } finally {
        setIsProcessing(false);
    }
  };

  const handleFinalCancel = async () => {
    setIsProcessing(true);
    const toastId = toast.loading('Procesando cancelación...');
    try {
        const { data } = await mockApi.default.cancelSubscription();
        toast.success('Tu suscripción ha sido cancelada.', { id: toastId });
        onSubscriptionUpdate(data);
    } catch {
        toast.error('No se pudo cancelar la suscripción.', { id: toastId });
    } finally {
        setIsProcessing(false);
    }
  };
  
  const handleClose = () => {
    if (isProcessing) return;
    onClose();
    setTimeout(() => {
        setStep('reason');
        setReason(null);
    }, 300) // Reset after modal closes
  }

  const renderStep = () => {
    switch (step) {
      case 'reason':
        return (
          <>
            <h3 className="text-lg font-semibold text-text-primary text-center">Cuéntanos por qué te vas 😔</h3>
            <div className="space-y-3 mt-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => handleReasonSelect('price')}>Es muy caro</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => handleReasonSelect('no_use')}>No lo uso suficiente</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => handleReasonSelect('technical')}>Problemas técnicos</Button>
            </div>
          </>
        );
      case 'offer':
        return (
            <>
                <h3 className="text-lg font-semibold text-text-primary text-center">¡Espera! Tenemos una oferta para ti</h3>
                <div className="my-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-center">
                    {reason === 'price' && <>
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-300">🎁 50% OFF por 3 meses</p>
                        <p className="text-text-secondary">Pasa de ${subscription.price} a solo ${subscription.price / 2}/mes.</p>
                    </>}
                     {reason === 'no_use' && <>
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-300">⏸️ Pausa tu cuenta 3 meses</p>
                        <p className="text-text-secondary">Mantenemos tus datos y puedes reactivar cuando quieras.</p>
                    </>}
                    {reason === 'technical' && <>
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-300">🔧 Soporte Prioritario</p>
                        <p className="text-text-secondary">Agenda una sesión 1-a-1 con un experto para ayudarte.</p>
                    </>}
                </div>
                <div className="flex flex-col gap-2">
                    <Button onClick={handleAcceptOffer} disabled={isProcessing}>{reason === 'no_use' ? 'Pausar mi Cuenta' : 'Aceptar Oferta'}</Button>
                    <Button variant="link" onClick={() => setStep('confirm')} disabled={isProcessing}>No, gracias. Quiero cancelar.</Button>
                </div>
            </>
        )
      case 'confirm':
        return (
            <>
                <h3 className="text-lg font-semibold text-text-primary text-center">Lamentamos verte partir 💔</h3>
                <div className="my-4 text-center text-sm text-text-secondary space-y-1">
                    <p>Perderás el acceso a tu plan al final del período de facturación.</p>
                    <p>Tus datos se guardarán por 90 días por si decides volver.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Button variant="destructive" onClick={handleFinalCancel} disabled={isProcessing}>Sí, cancelar definitivamente</Button>
                    <Button variant="outline" onClick={handleClose} disabled={isProcessing}>Mejor no, mantener mi cuenta</Button>
                </div>
            </>
        )
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <MotionDiv initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
        <Card className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleClose}><X className="h-4 w-4" /></Button>
            <AnimatePresence mode="wait">
              <MotionDiv
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </MotionDiv>
            </AnimatePresence>
          </div>
        </Card>
      </MotionDiv>
    </div>
  );
};

export default CancelSubscriptionFlow;