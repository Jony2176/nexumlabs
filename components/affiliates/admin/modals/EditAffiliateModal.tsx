import React, { useState, useEffect } from 'react';
import { Affiliate, AffiliateStatus } from '../../../../types';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import Input from '../../../ui/Input';
import { X } from 'lucide-react';
import { updateAffiliate } from '../../../../services/affiliateApi';
import toast from 'react-hot-toast';

interface EditAffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (affiliate: Affiliate) => void;
  affiliate: Affiliate;
}

const EditAffiliateModal: React.FC<EditAffiliateModalProps> = ({ isOpen, onClose, onSave, affiliate }) => {
  const [formData, setFormData] = useState(affiliate);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    setFormData(affiliate);
  }, [affiliate]);

  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData(prev => ({ ...prev, [id]: value === '' ? '' : Number(value) }));
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      const toastId = toast.loading('Guardando cambios...');
      try {
          await updateAffiliate(affiliate.id, formData);
          onSave(formData);
          toast.success('Afiliado actualizado con éxito.', { id: toastId });
          onClose();
      } catch (error) {
          toast.error('Error al guardar los cambios.', { id: toastId });
      } finally {
          setIsSaving(false);
      }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editar Afiliado</h2>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
        </div>
        
        <form onSubmit={handleSubmit}>
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                <Input id="nombre" label="Nombre Completo" value={formData.nombre} onChange={handleChange} required/>
                <Input id="user_email" label="Email" type="email" value={formData.user_email} onChange={handleChange} required/>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="tasa_primer_mes" label="Tasa 1er Mes (%)" type="number" value={formData.tasa_primer_mes} onChange={handleNumericChange} />
                    <Input id="tasa_recurrente" label="Tasa Recurrente (%)" type="number" value={formData.tasa_recurrente} onChange={handleNumericChange} />
                </div>
                
                 <div>
                  <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    Estado
                  </label>
                  <select
                    id="estado"
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={formData.estado}
                    onChange={handleChange}
                  >
                    <option value="active">Activo</option>
                    <option value="pending">Pendiente</option>
                    <option value="inactive">Inactivo</option>
                    <option value="rejected">Rechazado</option>
                  </select>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>Cancelar</Button>
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
            </div>
        </form>
      </Card>
    </div>
  );
};

export default EditAffiliateModal;
