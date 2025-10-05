import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Settings, Users, Puzzle, Link as LinkIcon, Bell, Shield, Save, PlusCircle, MoreVertical, Check, X, UploadCloud } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { cn } from '../utils/cn';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import InviteUserModal from '../components/users/InviteUserModal';
import { User } from '../types';

// Mock user data, now used as initial state for the user management tab
const initialUsers: User[] = [
    { id: '1', firstName: 'Juan', lastName: 'Perez', email: 'juan.perez@ejemplo.com', role: 'owner', orgId: 'org1' },
    { id: '2', firstName: 'Ana', lastName: 'Gomez', email: 'ana.gomez@ejemplo.com', role: 'admin', orgId: 'org1' },
    { id: '3', firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos.r@ejemplo.com', role: 'user', orgId: 'org1' },
    { id: '4', firstName: 'Maria', lastName: 'Lopez', email: 'maria.l@ejemplo.com', role: 'user', orgId: 'org1' },
];

const ROLES: Array<User['role']> = ['owner', 'admin', 'user'];

const tabs = [
    { id: 'general', label: 'Información General', icon: Settings },
    { id: 'usuarios', label: 'Usuarios y Permisos', icon: Users },
    { id: 'modulos', label: 'Módulos ELIAS', icon: Puzzle },
    { id: 'integraciones', label: 'Integraciones', icon: LinkIcon },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
];

// --- Sub-Components for each Tab ---

const InformacionGeneralTab = ({ onSave }: { onSave: () => void }) => {
    const { organization } = useAuthStore();
    return (
        <Card>
            <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                <div className="p-6 space-y-6">
                    <h3 className="text-lg font-medium theme-text-primary">Datos del Estudio Jurídico</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input id="orgName" label="Nombre del Estudio" defaultValue={organization?.name} />
                        <Input id="cuit" label="CUIT/CUIL" placeholder="ej. 20-12345678-9" />
                        <Input id="phone" label="Teléfono principal" defaultValue={organization?.phone} />
                        <Input id="email" label="Email de contacto" type="email" defaultValue={organization?.email} />
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium theme-text-primary mb-2">Logo del Estudio</label>
                             <div className="mt-1 flex items-center space-x-4 p-4 border-2 border-dashed theme-border rounded-lg">
                                <span className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl theme-text-secondary">
                                    {organization?.name?.charAt(0)}
                                </span>
                                <Button type="button" variant="outline"><UploadCloud className="w-4 h-4 mr-2"/> Cambiar Logo</Button>
                             </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 text-right rounded-b-lg">
                     <Button type="submit">Guardar Cambios</Button>
                </div>
            </form>
        </Card>
    );
};

const UsuariosPermisosTab = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [targetRole, setTargetRole] = useState<User['role'] | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setActiveDropdown(null);
        };
        if (activeDropdown) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

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
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(users.map(u => (u.id === selectedUser.id ? { ...u, role: targetRole! } : u)));
        toast.success(`Rol de ${selectedUser.firstName} actualizado.`);
        setIsUpdating(false);
        setIsRoleModalOpen(false);
    };

    const handleInviteUser = async (email: string, role: User['role']) => {
        setIsInviting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const newUser: User = { id: `usr_${Date.now()}`, firstName: 'Usuario', lastName: 'Invitado', email, role, orgId: 'org1' };
        setUsers(prev => [...prev, newUser]);
        toast.success('Invitación enviada.');
        setIsInviteModalOpen(false);
        setIsInviting(false);
    };

    return (
        <>
            <Card>
                 <div className="p-4 border-b theme-border flex justify-between items-center">
                    <h3 className="text-lg font-medium theme-text-primary">Listado de Usuarios</h3>
                    <Button onClick={() => setIsInviteModalOpen(true)}><PlusCircle className="h-4 w-4 mr-2"/> Invitar Usuario</Button>
                </div>
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

            <ConfirmationModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} onConfirm={handleConfirmRoleChange} title="Confirmar Cambio de Rol" isLoading={isUpdating}>
                <p>¿Cambiar el rol de <strong className="theme-text-primary">{selectedUser?.firstName}</strong> a <strong className="theme-text-primary capitalize">{targetRole}</strong>?</p>
            </ConfirmationModal>
            
            <InviteUserModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} onInvite={handleInviteUser} isInviting={isInviting} />
        </>
    );
};

const PlaceholderTab = ({ title }: { title: string }) => (
    <Card>
        <div className="p-8 text-center">
            <h3 className="text-lg font-semibold theme-text-primary">{title}</h3>
            <p className="theme-text-secondary mt-2">Esta sección estará disponible próximamente.</p>
        </div>
    </Card>
);

const ConfiguracionPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const renderContent = () => {
        switch(activeTab) {
            case 'general': return <InformacionGeneralTab onSave={() => toast.success('Información guardada.')} />;
            case 'usuarios': return <UsuariosPermisosTab />;
            case 'modulos': return <PlaceholderTab title="Gestión de Módulos ELIAS" />;
            case 'integraciones': return <PlaceholderTab title="Gestión de Integraciones" />;
            case 'notificaciones': return <PlaceholderTab title="Gestión de Notificaciones" />;
            case 'seguridad': return <PlaceholderTab title="Gestión de Seguridad" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold theme-text-primary">Configuración del Estudio</h1>
                <p className="theme-text-secondary mt-1">Gestiona usuarios, módulos y preferencias de tu organización.</p>
            </div>

            <div className="border-b theme-border">
                 <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                                activeTab === tab.id
                                    ? 'border-primary theme-text-primary'
                                    : 'border-transparent theme-text-muted hover:theme-text-secondary'
                            )}
                        >
                            <tab.icon className="h-5 w-5" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ConfiguracionPage;