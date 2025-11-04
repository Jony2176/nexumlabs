import React, { useState } from 'react';
import { Affiliate, AffiliateStatus, PaymentMethodType } from '../../../types';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { X, PlusCircle } from 'lucide-react';

interface AddAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    nombre: string;
    user_email: string;
    tasa_primer_mes: number;
    tasa_recurrente: number;
    estado: AffiliateStatus;
    metodo_pago: PaymentMethodType;
  }) => void;
}

const AddAffiliateModal: React.FC<AddAffiliateModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [nombre, setNombre] = useState('');
  const [user_email, setEmail] = useState('');
  const [tasa_primer_mes, setTasaPrimerMes] = useState(25);
  const [tasa_recurrente, setTasaRecurrente] = useState(10);
  const [estado, setEstado] = useState<AffiliateStatus>('active');
  const [metodo_pago, setMetodoPago] = useState<PaymentMethodType>('transferencia');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ nombre, user_email, tasa_primer_mes, tasa_recurrente, estado, metodo_pago });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <Card className="w-full max-w-lg animate-slideIn" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b theme-border flex justify-between items-center">
            <h2 className="text-xl font-bold">Añadir Nuevo Afiliado</h2>
            <Button variant="ghost" size="icon" onClick={onClose} type="button"><X /></Button>
          </div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre</label>
              <input id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="input-premium w-full" required />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-sm font-medium mb-1">Email</label>
              <input id="user_email" type="email" value={user_email} onChange={e => setEmail(e.target.value)} className="input-premium w-full" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tasa_primer_mes" className="block text-sm font-medium mb-1">Tasa 1er Mes (%)</label>
                <input id="tasa_primer_mes" type="number" value={tasa_primer_mes} onChange={e => setTasaPrimerMes(Number(e.target.value))} className="input-premium w-full" required />
              </div>
              <div>
                <label htmlFor="tasa_recurrente" className="block text-sm font-medium mb-1">Tasa Recurrente (%)</label>
                <input id="tasa_recurrente" type="number" value={tasa_recurrente} onChange={e => setTasaRecurrente(Number(e.target.value))} className="input-premium w-full" required />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium mb-1">Estado</label>
                  <select id="estado" value={estado} onChange={e => setEstado(e.target.value as any)} className="input-premium w-full">
                    <option value="active">Activo</option>
                    <option value="pending">Pendiente</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
                 <div>
                    <label htmlFor="metodo_pago" className="block text-sm font-medium mb-1">Método de Pago</label>
                    <select id="metodo_pago" value={metodo_pago} onChange={e => setMetodoPago(e.target.value as any)} className="input-premium w-full">
                        <option value="transferencia">Transferencia</option>
                        <option value="mercadopago">MercadoPago</option>
                        <option value="credito">Crédito en cuenta</option>
                    </select>
                </div>
             </div>
          </div>
          <div className="p-4 theme-bg-secondary rounded-b-xl flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit"><PlusCircle className="h-4 w-4 mr-2" />Guardar Afiliado</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddAffiliateModal;