
import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PlusCircle, MoreVertical } from 'lucide-react';
import { User } from '../types';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import toast from 'react-hot-toast';
import InviteUserModal from '../components/users/InviteUserModal';

// Mock user data, now used as initial state
const initialUsers: User[] = [
    { id: '1', firstName: 'Juan', lastName: 'Perez', email: 'juan.perez@ejemplo.com', role: 'owner', orgId: 'org1' },
    { id: '2', firstName: 'Ana', lastName: 'Gomez', email: 'ana.gomez@ejemplo.com', role: 'admin', orgId: 'org1' },
    { id: '3', firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos.r@ejemplo.com', role: 'user', orgId: 'org1' },
    { id: '4', firstName: 'Maria', lastName: 'Lopez', email: 'maria.l@ejemplo.com', role: 'user', orgId: 'org1' },
];

const ROLES: Array<User['role']> = ['owner', 'admin', 'user'];

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [targetRole, setTargetRole] = useState<User['role'] | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        // Add listener if a dropdown is active
        if (activeDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        // Cleanup function
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]); // Rerun effect when activeDropdown changes

    const toggleDropdown = (userId: string) => {
        setActiveDropdown(prev => (prev === userId ? null : userId));
    };

    const handleRoleSelect = (user: User, role: User['role']) => {
        if (user.role === role) return;
        setSelectedUser(user);
        setTargetRole(role);
        setIsRoleModalOpen(true);
        setActiveDropdown(null);
    };

    const handleConfirmRoleChange = async () => {
        if (!selectedUser || !targetRole) return;

        setIsUpdating(true);
        toast.loading('Actualizando rol...');

        // Mock API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            // In a real app: await api.patch(`/api/users/${selectedUser.id}`, { role: targetRole });

            setUsers(users.map(u => (u.id === selectedUser.id ? { ...u, role: targetRole! } : u)));
            
            toast.dismiss();
            toast.success(`Rol de ${selectedUser.firstName} actualizado a "${targetRole}".`);
        } catch (error) {
            toast.dismiss();
            toast.error('No se pudo actualizar el rol.');
            console.error("Failed to update role:", error);
        } finally {
            setIsUpdating(false);
            handleCloseRoleModal();
        }
    };
    
    const handleInviteUser = async (email: string, role: User['role']) => {
        setIsInviting(true);
        const toastId = toast.loading(`Enviando invitación a ${email}...`);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API call
            
            const newUser: User = {
                id: `usr_${Date.now()}`,
                firstName: 'Usuario',
                lastName: 'Invitado',
                email,
                role,
                orgId: 'org1',
            };

            setUsers(prevUsers => [...prevUsers, newUser]);
            
            toast.success('¡Invitación enviada con éxito!', { id: toastId });
            setIsInviteModalOpen(false);
        } catch (error) {
            toast.error('No se pudo enviar la invitación.', { id: toastId });
            console.error("Failed to invite user:", error);
        } finally {
            setIsInviting(false);
        }
    };


    const handleCloseRoleModal = () => {
        if (isUpdating) return;
        setIsRoleModalOpen(false);
        // Delay resetting state to allow modal to fade out
        setTimeout(() => {
            setSelectedUser(null);
            setTargetRole(null);
        }, 300);
    }

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold theme-text-primary">Usuarios</h1>
              <p className="theme-text-secondary mt-1">Gestiona los miembros de tu organización.</p>
          </div>
          <Button onClick={() => setIsInviteModalOpen(true)}>
              <PlusCircle className="h-5 w-5 mr-2"/>
              Invitar Usuario
          </Button>
        </div>
        
        <Card>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left theme-text-secondary">
                  <thead className="text-xs theme-text-secondary uppercase theme-bg-secondary">
                      <tr>
                          <th scope="col" className="px-6 py-3">Nombre</th>
                          <th scope="col" className="px-6 py-3">Email</th>
                          <th scope="col" className="px-6 py-3">Rol</th>
                          <th scope="col" className="px-6 py-3">
                              <span className="sr-only">Acciones</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.map(user => (
                          <tr key={user.id} className="theme-bg-card border-b theme-border hover:theme-bg-secondary">
                              <th scope="row" className="px-6 py-4 font-medium theme-text-primary whitespace-nowrap">
                                  {user.firstName} {user.lastName}
                              </th>
                              <td className="px-6 py-4">{user.email}</td>
                              <td className="px-6 py-4">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                                      user.role === 'owner' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300' :
                                      user.role === 'admin' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                  }`}>
                                      {user.role}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="relative inline-block text-left">
                                    <Button variant="ghost" size="icon" onClick={() => toggleDropdown(user.id)} aria-haspopup="true" aria-expanded={activeDropdown === user.id}>
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Abrir opciones para {user.firstName}</span>
                                    </Button>
                                    {activeDropdown === user.id && (
                                      <div
                                          ref={dropdownRef}
                                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg theme-bg-card ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border theme-border"
                                          role="menu"
                                          aria-orientation="vertical"
                                          aria-labelledby="menu-button"
                                      >
                                          <div className="py-1" role="none">
                                              <p className="px-4 pt-2 pb-1 text-xs font-semibold theme-text-secondary">Cambiar Rol a</p>
                                              {ROLES.map((role) => (
                                                  <button
                                                      key={role}
                                                      onClick={() => handleRoleSelect(user, role)}
                                                      disabled={user.role === role}
                                                      className="w-full text-left block px-4 py-2 text-sm theme-text-primary hover:theme-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
                                                      role="menuitem"
                                                  >
                                                      <span className="capitalize">{role}</span>
                                                  </button>
                                              ))}
                                          </div>
                                      </div>
                                    )}
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </Card>
      </div>
      <ConfirmationModal
          isOpen={isRoleModalOpen}
          onClose={handleCloseRoleModal}
          onConfirm={handleConfirmRoleChange}
          title="Confirmar Cambio de Rol"
          isLoading={isUpdating}
          confirmText={isUpdating ? 'Actualizando...' : 'Confirmar'}
      >
          <p>
              ¿Estás seguro de que quieres cambiar el rol de{' '}
              <strong className="theme-text-primary">{selectedUser?.firstName} {selectedUser?.lastName}</strong> a{' '}
              <strong className="theme-text-primary capitalize">{targetRole}</strong>?
          </p>
      </ConfirmationModal>
      
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteUser}
        isInviting={isInviting}
      />
    </>
  );
};

export default UsersPage;
