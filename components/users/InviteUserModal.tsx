
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X } from 'lucide-react';
import { User } from '../../types';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: User['role']) => void;
  isInviting?: boolean;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ isOpen, onClose, onInvite, isInviting }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<User['role']>('user');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInvite(email, role);
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
        <div className="p-6 border-b theme-border flex justify-between items-center">
          <h2 className="text-xl font-bold theme-text-primary">Invitar Nuevo Usuario</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <Input
              id="invite-email"
              label="Email del Usuario"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@dominio.com"
              required
            />
            <div>
              <label htmlFor="invite-role" className="block mb-2 text-sm font-medium theme-text-primary">
                Asignar Rol
              </label>
              <select
                id="invite-role"
                value={role}
                onChange={(e) => setRole(e.target.value as User['role'])}
                className="w-full px-4 py-2.5 theme-bg-card border theme-border rounded-lg theme-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
            <Button type="button" variant="outline" onClick={onClose} disabled={isInviting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isInviting}>
              {isInviting ? 'Enviando...' : 'Enviar Invitación'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InviteUserModal;
