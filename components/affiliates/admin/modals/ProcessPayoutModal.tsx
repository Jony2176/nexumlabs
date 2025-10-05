import React, { useState } from 'react';
import { Affiliate } from '../../../../types';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { X, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../../../utils/formatters';
import { processAffiliatePayout } from '../../../../services/affiliateApi';
import toast from 'react-hot-toast';

interface ProcessPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  affiliate: Affiliate;
}

const ProcessPayoutModal: React.FC<ProcessPayoutModalProps> = ({ isOpen, onClose, onConfirm, affiliate }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    
    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsProcessing(true);
        const toastId = toast.loading(`Procesando pago para ${affiliate.nombre}...`);
        try {
            await processAffiliatePayout(affiliate.id, affiliate.commission.pending);
            toast.success('Pago procesado con éxito.', { id: toastId });
            onConfirm();
        } catch (error) {
            toast.error('Error al procesar el pago.', { id: toastId });
        } finally {
            setIsProcessing(false);
            onClose();
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Procesar Pago</h2>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
            </div>
            
            <div className="p-6 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
                    <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Estás a punto de procesar un pago de <br/>
                    <strong className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(affiliate.commission.pending)}</strong>
                    <br/> para el afiliado <strong className="text-gray-900 dark:text-white">{affiliate.nombre}</strong>.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Método de pago preferido: <span className="font-medium capitalize">{affiliate.metodo_pago}</span>.
                </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>Cancelar</Button>
                <Button onClick={handleConfirm} disabled={isProcessing || affiliate.commission.pending === 0}>
                    {isProcessing ? "Procesando..." : "Confirmar Pago"}
                </Button>
            </div>
        </Card>
        </div>
    );
};

export default ProcessPayoutModal;
