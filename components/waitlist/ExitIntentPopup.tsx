
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { X, Gift } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set the offer to be valid for 10 minutes from now
  const offerEndDate = new Date(Date.now() + 10 * 60 * 1000);
  const timeLeft = useCountdown(offerEndDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor, ingresa tu email.');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API call
    toast.success('¡Descuento asegurado! Revisa tu email.');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-gray-800 border-2 border-purple-500 rounded-2xl shadow-2xl shadow-purple-500/20 p-8 text-white"
          >
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
            
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 mb-4 animate-pulse">
                    <Gift className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">¡ESPERA! Oferta especial para ti</h2>
                <p className="text-gray-300 mb-4">No te vayas con las manos vacías. Te ofrecemos un descuento exclusivo.</p>

                <div className="my-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="text-4xl font-bold text-yellow-300">65% OFF</p>
                    <p className="font-semibold">Si te registras AHORA</p>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                    <p className="text-sm">Oferta válida por:</p>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-md font-mono font-bold text-lg tracking-wider">
                       {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        id="exit-intent-email"
                        label=""
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu email para recibir el descuento"
                        required
                        className="text-center"
                    />
                    <Button type="submit" size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'QUIERO MI DESCUENTO'}
                    </Button>
                </form>
                <button onClick={onClose} className="text-xs text-gray-500 hover:underline mt-4">
                    No gracias, prefiero pagar más
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
