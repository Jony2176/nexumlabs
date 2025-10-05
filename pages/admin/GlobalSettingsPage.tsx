


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    Settings, Briefcase, Tag, Puzzle, Link as LinkIcon, Shield, Bell, HardDrive, SlidersHorizontal,
    Save, UploadCloud, Info, CheckCircle, AlertTriangle, Trash2, RotateCcw, DatabaseZap, Power,
    Globe, Clock, Calendar, Hash, Mail, KeyRound, Lock, Eye, EyeOff, PlusCircle, ExternalLink,
    Terminal
} from 'lucide-react';
import { cn } from '../../utils/cn';

// --- Reusable UI Components ---

const SettingsCard = ({ title, description, children, footer }: { title: string, description: string, children?: React.ReactNode, footer?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg"
    >
        <div className="p-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 mt-1">{description}</p>
            <div className="mt-6 border-t border-gray-700 pt-6">
                {children}
            </div>
        </div>
        {footer && (
            <div className="bg-gray-900/50 px-6 py-4 rounded-b-xl border-t border-gray-700 text-right">
                {footer}
            </div>
        )}
    </motion.div>
);

const SettingsInput = ({ id, label, type = 'text', value, onChange, placeholder, hint, isPassword = false }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <div className="relative">
                <input
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
                {isPassword && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
            {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
        </div>
    );
};

const SettingsToggle = ({ id, label, checked, onChange, description }: any) => (
    <div className="flex items-center justify-between">
        <div>
            <label htmlFor={id} className="font-medium text-gray-200">{label}</label>
            {description && <p className="text-xs text-gray-400">{description}</p>}
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800',
                checked ? 'bg-blue-600' : 'bg-gray-600'
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    checked ? 'translate-x-5' : 'translate-x-0'
                )}
            />
        </button>
    </div>
);

const ProgressBar = ({ value, max }: { value: number, max: number }) => {
    const percentage = (value / max) * 100;
    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};


// --- Tab Content Components ---

const GeneralTab = ({ onSave }: { onSave: () => void }) => (
    <div className="space-y-8">
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="Información de la Empresa" description="Datos públicos y branding de la plataforma." footer={<button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500">Guardar Cambios</button>}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsInput id="companyName" label="Nombre empresa" defaultValue="NEXUM Labs" />
                <SettingsInput id="tagline" label="Tagline" defaultValue="Automatizando la inteligencia legal" />
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Logo Principal</label>
                    <div className="mt-1 flex items-center space-x-4 p-2 border-2 border-dashed border-gray-600 rounded-lg">
                        <img src="https://i.ibb.co/fVJqkRjm/logo-Saa-S-1.png" alt="Current Logo" className="h-12 bg-gray-700 p-1 rounded" />
                        <button type="button" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 px-3 py-2 text-sm">
                            <span>Subir un archivo</span>
                            <input id="logo-upload" name="logo-upload" type="file" className="sr-only" />
                        </button>
                    </div>
                </div>
            </div>
            
        </SettingsCard>
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="Configuración Regional" description="Ajustes de localización para la plataforma." footer={<button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500">Guardar Cambios</button>}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <SettingsInput id="timezone" label="Zona horaria" defaultValue="GMT-3 Buenos Aires" />
                 <SettingsInput id="currency" label="Moneda principal" defaultValue="USD" />
                 <SettingsInput id="exchangeRate" label="Tasa de cambio ARS/USD" type="number" defaultValue="1263" />
                 <SettingsToggle id="autoUpdateRate" label="Actualizar tasa automáticamente" checked={true} onChange={() => {}} />
            </div>
            
        </SettingsCard>
    </div>
);

const PricingTab = ({ onSave }: { onSave: () => void }) => (
     <div className="space-y-8">
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="Gestión de Planes" description="Define los precios y características de tus planes." footer={<button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500">Guardar Cambios</button>}>
            
             <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-700 text-left text-gray-400">
                           <th className="p-2">Plan</th><th className="p-2">Precio Mensual</th><th className="p-2">Precio Anual</th><th className="p-2">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 font-medium">ELIAS Lite</td>
                            <td className="p-2"><input type="number" defaultValue="79" className="w-24 bg-gray-700 p-1 rounded border border-gray-600" /> USD</td>
                            <td className="p-2"><input type="number" defaultValue="632" className="w-24 bg-gray-700 p-1 rounded border border-gray-600" /> USD</td>
                            <td className="p-2"><span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">Activo</span></td>
                        </tr>
                         <tr>
                            <td className="p-2 font-medium">ELIAS Pro</td>
                            <td className="p-2"><input type="number" defaultValue="199" className="w-24 bg-gray-700 p-1 rounded border border-gray-600" /> USD</td>
                            <td className="p-2"><input type="number" defaultValue="1592" className="w-24 bg-gray-700 p-1 rounded border border-gray-600" /> USD</td>
                            <td className="p-2"><span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-300">Activo</span></td>
                        </tr>
                    </tbody>
                 </table>
            </div>
            
        </SettingsCard>
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="Códigos Promocionales" description="Gestiona descuentos y ofertas especiales." footer={<button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500">Guardar Cambios</button>}>
            
            <button className="flex items-center gap-2 text-sm text-blue-400 mb-4"><PlusCircle size={16}/> Crear nuevo código</button>
            {/* Table for codes would go here */}
            
        </SettingsCard>
    </div>
);

const ModulesTab = ({ onSave }: { onSave: () => void }) => (
    <div className="space-y-8">
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="ELIAS WhatsApp Bot" description="Límites y costos del módulo de WhatsApp." footer={<button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500">Guardar Cambios</button>}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsToggle id="whatsapp-active" label="Módulo Activo" checked={true} onChange={() => {}} />
                <SettingsInput id="whatsapp-launch" label="Fecha Lanzamiento" type="date" defaultValue="2025-10-01" />
                <SettingsInput id="whatsapp-lite-limit" label="Mensajes Plan Lite" type="number" defaultValue="500" />
                <SettingsInput id="whatsapp-cost" label="Costo por mensaje extra" type="number" defaultValue="0.02" />
            </div>
            
        </SettingsCard>
    </div>
);

const IntegrationsTab = ({ onSave }: { onSave: () => void }) => (
     <div className="space-y-8">
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="MercadoPago" description="Configura tu pasarela de pagos principal." footer={<><button onClick={() => toast.success("Conexión exitosa!")} className="text-blue-400 mr-4 text-sm">Test conexión</button><button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500">Guardar Cambios</button></>}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <SettingsInput id="mp-public-key" label="Public Key" defaultValue="TEST-xxxx-xxxx-xxxx" />
                 <SettingsInput id="mp-access-token" label="Access Token" defaultValue="supersecrettoken" isPassword />
                 <SettingsToggle id="mp-production" label="Modo Producción" checked={true} onChange={() => {}} />
            </div>
            
        </SettingsCard>
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="Google API" description="Conecta tu cuenta de Google para Calendar y otros servicios.">
            <div className="text-center p-4 text-gray-400">
                Próximamente.
            </div>
        </SettingsCard>
        {/* FIX: Added children prop to satisfy component's type definition. */}
        <SettingsCard title="N8N Webhooks" description="Automatiza flujos de trabajo con webhooks personalizados.">
            <div className="text-center p-4 text-gray-400">
                Próximamente.
            </div>
        </SettingsCard>
    </div>
);

// --- Main Page Component ---

const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'pricing', label: 'Precios y Planes', icon: Tag },
    { id: 'modules', label: 'Módulos', icon: Puzzle },
    { id: 'integrations', label: 'Integraciones', icon: LinkIcon },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'system', label: 'Sistema', icon: Terminal },
];

const GlobalSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');

    const handleSave = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: 'Guardando configuración...',
                success: '¡Configuración guardada con éxito!',
                error: 'Error al guardar.',
            }
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'general': return <GeneralTab onSave={handleSave} />;
            case 'pricing': return <PricingTab onSave={handleSave} />;
            case 'modules': return <ModulesTab onSave={handleSave} />;
            case 'integrations': return <IntegrationsTab onSave={handleSave} />;
            default: return <div className="text-center p-8 bg-gray-800/50 border border-gray-700 rounded-xl"><p className="text-gray-400">Esta sección estará disponible próximamente.</p></div>;
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Configuración Global</h1>
                <p className="text-gray-400 mt-1">Administra la configuración de toda la plataforma NEXUM.</p>
            </div>

            <div className="flex border-b border-gray-700">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2',
                            activeTab === tab.id
                                ? 'border-blue-500 text-white'
                                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
export default GlobalSettingsPage;