
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PaymentConfiguration } from '../../../../types';
import { updatePaymentConfig } from '../../../../services/walletApi';
import Card from '../../../ui/Card';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface PaymentConfigProps {
  initialConfig: PaymentConfiguration;
  onSave: () => void;
}

const PaymentConfigComponent: React.FC<PaymentConfigProps> = ({ initialConfig, onSave }) => {
  const [config, setConfig] = useState(initialConfig);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setConfig(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveConfig = async () => {
    if (!config.cuit || !config.mp_email) {
      toast.error('CUIT/CUIL y Email de MercadoPago son obligatorios.');
      return;
    }
    setIsSaving(true);
    const toastId = toast.loading('Guardando configuración...');
    try {
      await updatePaymentConfig(config);
      toast.success('Configuración guardada.', { id: toastId });
      setIsEditing(false);
      onSave();
    } catch (error) {
      toast.error('No se pudo guardar la configuración.', { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
      setConfig(initialConfig);
      setIsEditing(false);
  }

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Configuración de Pagos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Datos Fiscales */}
          <div className="space-y-4">
            <h4 className="font-medium text-text-secondary border-b border-border-color pb-2">Datos Fiscales</h4>
            <Input label="CUIT/CUIL *" id="cuit" value={config.cuit} onChange={handleChange} disabled={!isEditing} placeholder="20-12345678-9" />
            <Input label="Razón Social / Nombre" id="business_name" value={config.business_name} onChange={handleChange} disabled={!isEditing} />
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Dirección Fiscal</label>
              <textarea id="address" value={config.address} onChange={handleChange} disabled={!isEditing} rows={2} className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:bg-gray-100 dark:disabled:bg-gray-700" />
            </div>
          </div>

          {/* Datos MercadoPago */}
          <div className="space-y-4">
            <h4 className="font-medium text-text-secondary border-b border-border-color pb-2">MercadoPago</h4>
            <Input label="Email de MercadoPago *" id="mp_email" type="email" value={config.mp_email} onChange={handleChange} disabled={!isEditing} placeholder="tu-email@ejemplo.com" />
            <Input label="Alias de MercadoPago" id="mp_alias" value={config.mp_alias} onChange={handleChange} disabled={!isEditing} placeholder="tu.alias.mp" />

            <div className={`flex items-center space-x-2 p-3 rounded-lg ${config.mp_verified ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
              {config.mp_verified ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
              <span className={`text-sm font-medium ${config.mp_verified ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                {config.mp_verified ? 'Cuenta verificada' : 'Pendiente de verificación'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
          {isEditing ? (
            <>
              <Button onClick={handleSaveConfig} disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Editar Configuración
            </Button>
          )}
        </div>
    </Card>
  );
};

export default PaymentConfigComponent;
