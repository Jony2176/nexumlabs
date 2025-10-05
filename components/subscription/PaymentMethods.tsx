import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PaymentMethod } from '../../types';
import * as mockApi from '../../services/mockApi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { CreditCard, PlusCircle, X } from 'lucide-react';

// --- AddPaymentMethodModal Component Definition ---
interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newMethod: PaymentMethod) => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setCardNumber('');
        setExpiry('');
        setCvc('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simple validation, can be improved with a library
    if (!cardNumber || !expiry || !cvc || !/^\d{13,16}$/.test(cardNumber.replace(/\s/g, '')) || !/^\d{2}\/\d{2}$/.test(expiry) || !/^\d{3,4}$/.test(cvc)) {
        toast.error('Por favor, completa todos los campos correctamente.');
        setIsSaving(false);
        return;
    }

    setTimeout(() => {
      const newMethod: PaymentMethod = {
        id: `pm_${Date.now()}`,
        type: 'card',
        brand: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        last4: cardNumber.slice(-4),
        expiryMonth: parseInt(expiry.split('/')[0], 10),
        expiryYear: 2000 + parseInt(expiry.split('/')[1], 10),
        isDefault: false,
      };
      onAdd(newMethod);
      toast.success('Método de pago agregado con éxito.');
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <Card className="w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b theme-border flex justify-between items-center">
            <h2 className="text-xl font-bold theme-text-primary">Agregar Método de Pago</h2>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
          </div>
          <div className="p-6 space-y-4">
            <Input
              id="cardNumber"
              label="Número de Tarjeta"
              type="text"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="expiry"
                label="Vencimiento (MM/AA)"
                type="text"
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
                placeholder="MM/AA"
                required
              />
              <Input
                id="cvc"
                label="CVC"
                type="text"
                value={cvc}
                onChange={e => setCvc(e.target.value)}
                placeholder="123"
                required
              />
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>Cancelar</Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Método'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
// --- End of Modal Component ---


const PaymentMethods: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMethods = async () => {
      setIsLoading(true);
      try {
        const { data } = await mockApi.default.getPaymentMethods();
        setMethods(data);
      } catch (error) {
        toast.error('No se pudo cargar los métodos de pago.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMethods();
  }, []);

  const handleAddMethod = (newMethod: PaymentMethod) => {
    setMethods(prev => [...prev, newMethod]);
  };

  return (
    <>
        <Card>
        <div className="p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Métodos de Pago</h2>
            
            {isLoading ? (
            <div className="space-y-3 animate-pulse">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
            ) : (
            <div className="space-y-3">
                {methods.map(method => (
                <div key={method.id} className={`flex items-center justify-between p-3 rounded-lg border ${method.isDefault ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-700/50' : 'bg-gray-50 dark:bg-gray-800/50 border-border-color'}`}>
                    <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-text-secondary" />
                    <div>
                        <p className="font-medium text-text-primary">{method.brand} terminada en {method.last4}</p>
                        <p className="text-xs text-text-muted">Vence {method.expiryMonth}/{method.expiryYear}</p>
                    </div>
                    </div>
                    {method.isDefault && (
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-300">Default</span>
                    )}
                </div>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={() => setIsModalOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Agregar Método de Pago
                </Button>
            </div>
            )}
        </div>
        </Card>
        <AddPaymentMethodModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddMethod}
        />
    </>
  );
};

export default PaymentMethods;
