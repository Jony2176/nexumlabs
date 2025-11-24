

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
    { id: '1', firstName: 'Juan', lastName: 'Perez', email: 'juan.perez@ejemplo.com', role: 'user', orgId: 'org1' },
    { id: '2', firstName: 'Ana', lastName: 'Gomez', email: 'ana.gomez@ejemplo.com', role: 'user', orgId: 'org1' },
    { id: '3', firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos.r@ejemplo.com', role: 'user', orgId: 'org1' },
    { id: '4', firstName: 'Maria', lastName: 'Lopez', email: 'maria.l@ejemplo.com', role: 'user', orgId: 'org1' },
];

const ROLES: Array<User['role']> = ['user'];

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
        await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
        setUsers(users.map(u => (u.id === selectedUser.id ? { ...u, role: targetRole! } : u)));
        toast.success(`Rol de ${selectedUser.firstName} actualizado.`);
        setIsUpdating(false);
        setIsRoleModalOpen(false);
    };

    const handleInviteUser = async (email: string, role: User['role']) => {
        setIsInviting(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API call
        const newUser: User = { id: `usr_${Date.now()}`, firstName: 'Usuario', lastName: 'Invitado', email, role, orgId: 'org1' };
        setUsers(prev => [...prev, newUser]);
        toast.success('Invitación enviada.');
        setIsInviteModalOpen(false);
        setIsInviting(false);
    };

    return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">Usuarios y Permisos</h1>
                <p className="theme-text-secondary mt-1">Gestiona los miembros de tu organización.</p>
            </div>
            <Button onClick={() => setIsInviteModalOpen(true)}><PlusCircle className="h-4 w-4 mr-2"/> Invitar Usuario</Button>
        </div>
        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left theme-text-secondary">
                        <thead className="text-xs theme-text-secondary uppercase theme-bg-secondary">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Rol</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="theme-bg-card border-b theme-border hover:theme-bg-secondary">
                                <td className="px-6 py-4">
                                    <div className="font-medium theme-text-primary">{user.firstName} {user.lastName}</div>
                                    <div className="text-xs theme-text-muted">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 capitalize">{user.role}</td>
                                <td className="px-6 py-4 text-right">
                                        <div className="relative inline-block text-left">
                                        <Button variant="ghost" size="icon" onClick={() => setActiveDropdown(prev => (prev === user.id ? null : user.id))}>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                        {activeDropdown === user.id && (
                                        <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg theme-bg-card ring-1 ring-black ring-opacity-5 z-10 border theme-border">
                                            <div className="py-1">
                                                <p className="px-4 pt-2 pb-1 text-xs font-semibold theme-text-secondary">Cambiar Rol a</p>
                                                {ROLES.map((role) => (
                                                    <button key={role} onClick={() => handleRoleSelect(user, role)} disabled={user.role === role} className="w-full text-left block px-4 py-2 text-sm theme-text-primary hover:theme-bg-secondary disabled:opacity-50">
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

      <ConfirmationModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} onConfirm={handleConfirmRoleChange} title="Confirmar Cambio de Rol" isLoading={isUpdating}>
          <p>¿Cambiar el rol de <strong className="theme-text-primary">{selectedUser?.firstName}</strong> a <strong className="theme-text-primary capitalize">{targetRole}</strong>?</p>
      </ConfirmationModal>
      
      <InviteUserModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} onInvite={handleInviteUser} isInviting={isInviting} />
    </>
  );
};

export default UsersPage;