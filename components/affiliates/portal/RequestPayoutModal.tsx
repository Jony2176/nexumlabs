import React, { useState, useEffect } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { X } from 'lucide-react';
import { submitPayoutRequest } from '../../../services/affiliateApi';
import toast from 'react-hot-toast';
import { useDualPrice } from '../../../hooks/useDualPrice';

interface RequestPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableAmountUSD: number;
  onSubmit: (requestData: any) => void;
}

const RequestPayoutModal: React.FC<RequestPayoutModalProps> = ({ isOpen, onClose, availableAmountUSD, onSubmit }) => {
  const { priceInfo, isLoading } = useDualPrice(availableAmountUSD);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('transferencia');
  const [cbu, setCbu] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (priceInfo) {
      setAmount(priceInfo.ars.toString());
    }
  }, [priceInfo]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!priceInfo || isNaN(numericAmount) || numericAmount <= 0 || numericAmount > priceInfo.ars) {
      toast.error('Por favor, ingresa un monto válido.');
      return;
    }
     if (method === 'transferencia' && !cbu) {
        toast.error('Por favor, ingresa tu CBU/CVU.');
        return;
    }
    
    setIsSubmitting(true);
    const toastId = toast.loading('Enviando solicitud...');

    try {
        const requestData = { 
            amount: numericAmount, 
            currency: 'ARS',
            method, 
            details: method === 'transferencia' ? { cbu } : {} 
        };
        await submitPayoutRequest(requestData);
        onSubmit(requestData);
        toast.success('¡Solicitud de pago enviada!', { id: toastId });
        onClose();
    } catch (error) {
        toast.error('Error al enviar la solicitud.', { id: toastId });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Solicitar Pago</h2>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Monto disponible</p>
                    {isLoading || !priceInfo ? (
                        <div className="h-10 my-1 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 mx-auto animate-pulse"></div>
                    ) : (
                        <>
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{priceInfo.formattedARS}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">({priceInfo.formattedUSD})</p>
                        </>
                    )}
                </div>
                
                <Input
                    id="amount"
                    label="Monto a solicitar (ARS)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={priceInfo?.ars}
                    step="0.01"
                    required
                    disabled={isLoading}
                />
                
                 <div>
                    <label htmlFor="method" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        Método de Pago
                    </label>
                    <select
                        id="method"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="transferencia">Transferencia Bancaria (CBU/CVU)</option>
                        <option value="mercadopago">MercadoPago</option>
                    </select>
                </div>
                
                {method === 'transferencia' && (
                    <Input
                        id="cbu"
                        label="CBU/CVU o Alias"
                        type="text"
                        value={cbu}
                        onChange={(e) => setCbu(e.target.value)}
                        placeholder="Ingresa tus datos bancarios"
                        required
                    />
                )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </Button>
            </div>
        </form>
      </Card>
    </div>
  );
};

export default RequestPayoutModal;
