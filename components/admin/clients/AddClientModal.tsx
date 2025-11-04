import React, { useState } from 'react';
import { ClientData } from '../../../types';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { X, PlusCircle } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (clientData: Omit<ClientData, 'id' | 'consumoWhatsApp' | 'consumoLlamadas' | 'healthScore' | 'ultimoPago' | 'logoUrl' | 'cuit' | 'direccion'>) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onAddClient }) => {
  const [empresa, setEmpresa] = useState('');
  const [contacto, setContacto] = useState('');
  const [plan, setPlan] = useState<'Lite' | 'Pro' | 'Professional' | 'Business' | 'Enterprise'>('Pro');
  const [estado, setEstado] = useState<'active' | 'trial' | 'cancelled' | 'suspended'>('active');
  const [mrr, setMrr] = useState(199);
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClient({ empresa, contacto, plan, mrr, estado, fechaInicio });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <Card className="w-full max-w-lg animate-slideIn" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b theme-border flex justify-between items-center">
            <h2 className="text-xl font-bold">Agregar Nuevo Cliente</h2>
            <Button variant="ghost" size="icon" onClick={onClose} type="button"><X /></Button>
          </div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium mb-1">Empresa</label>
              <input id="empresa" type="text" value={empresa} onChange={e => setEmpresa(e.target.value)} className="input-premium w-full" required />
            </div>
            <div>
              <label htmlFor="contacto" className="block text-sm font-medium mb-1">Contacto</label>
              <input id="contacto" type="text" value={contacto} onChange={e => setContacto(e.target.value)} className="input-premium w-full" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="plan" className="block text-sm font-medium mb-1">Plan</label>
                <select id="plan" value={plan} onChange={e => setPlan(e.target.value as any)} className="input-premium w-full">
                  <option value="Lite">Lite</option>
                  <option value="Pro">Pro</option>
                  <option value="Professional">Professional</option>
                  <option value="Business">Business</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label htmlFor="mrr" className="block text-sm font-medium mb-1">Ingreso Mensual (USD)</label>
                <input id="mrr" type="number" value={mrr} onChange={e => setMrr(Number(e.target.value))} className="input-premium w-full" required />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium mb-1">Estado</label>
                  <select id="estado" value={estado} onChange={e => setEstado(e.target.value as any)} className="input-premium w-full">
                    <option value="active">Activo</option>
                    <option value="trial">Trial</option>
                    <option value="cancelled">Cancelado</option>
                    <option value="suspended">Suspendido</option>
                  </select>
                </div>
                 <div>
                    <label htmlFor="fechaInicio" className="block text-sm font-medium mb-1">Fecha de Inicio</label>
                    <input id="fechaInicio" type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="input-premium w-full" required />
                </div>
             </div>
          </div>
          <div className="p-4 theme-bg-secondary rounded-b-xl flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit"><PlusCircle className="h-4 w-4 mr-2" />Guardar Cliente</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddClientModal;