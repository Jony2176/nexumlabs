import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { X, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface RequestChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestChangeModal: React.FC<RequestChangeModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Por favor, describe el cambio que necesitas.');
      return;
    }
    setIsSending(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Tu solicitud ha sido enviada. El equipo técnico se pondrá en contacto pronto.');
    setIsSending(false);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <Card className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b theme-border flex justify-between items-center">
            <h2 className="text-xl font-bold theme-text-primary">Solicitar Cambio Técnico</h2>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm theme-text-secondary">
              Describe detalladamente el cambio o ajuste que necesitas en tu Bot de WhatsApp. Por ejemplo: "Agregar una pregunta sobre horarios de atención" o "Cambiar el mensaje de bienvenida".
            </p>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              className="w-full p-2 theme-bg-secondary border theme-border rounded-lg"
              placeholder="Describe tu solicitud aquí..."
            />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSending}>Cancelar</Button>
            <Button type="submit" disabled={isSending}>
              {isSending ? 'Enviando...' : <><Send className="h-4 w-4 mr-2" /> Enviar Solicitud</>}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RequestChangeModal;
