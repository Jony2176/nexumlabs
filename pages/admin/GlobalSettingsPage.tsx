import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    Settings, Briefcase, Tag, Puzzle, Link as LinkIcon, Shield, Bell, HardDrive, SlidersHorizontal,
    Save, UploadCloud, Info, CheckCircle, AlertTriangle, Trash2, RotateCcw, DatabaseZap, Power,
    Globe, Clock, Calendar, Hash, Mail, KeyRound, Lock, Eye, EyeOff, PlusCircle, ExternalLink,
    Terminal,
    // FIX: Imported the 'X' icon from lucide-react to resolve 'Cannot find name' error.
    X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSettingsStore } from '../../store/settingsStore';
import { usePlatformConfigStore } from '../../store/authStore';
import { EXTERNAL_ASSETS } from '../../config/assets.config';
import Button from '../../components/ui/Button';
import { PromoCode } from '../../types';
import { formatDate } from '../../utils/formatters';

// --- Reusable UI Components ---

const SettingsCard = ({ title, description, children, footer }: { title: string, description: string, children?: React.ReactNode, footer?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="theme-bg-card border theme-border rounded-xl shadow-lg"
    >
        <div className="p-6">
            <h3 className="text-xl font-bold theme-text-primary">{title}</h3>
            <p className="theme-text-secondary mt-1">{description}</p>
            <div className="mt-6 border-t theme-border pt-6">
                {children}
            </div>
        </div>
        {footer && (
            <div className="theme-bg-secondary px-6 py-4 rounded-b-xl border-t theme-border text-right">
                {footer}
            </div>
        )}
    </motion.div>
);

const SettingsInput = ({ id, label, type = 'text', value, onChange, placeholder, hint, isPassword = false, ...props }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium theme-text-primary mb-1">{label}</label>
            <div className="relative">
                <input
                    type={isPassword ? (showPassword ? 'text' : 'password') : type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={cn(
                        "input-premium w-full",
                        type === 'date' && 'pr-10' // Add padding for the icon
                    )}
                    {...props}
                />
                {isPassword && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center theme-text-muted">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
                {type === 'date' && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                )}
            </div>
            {hint && <p className="text-xs theme-text-muted mt-1">{hint}</p>}
        </div>
    );
};

const SettingsToggle = ({ id, label, checked, onChange, description }: any) => (
    <div className="flex items-center justify-between p-3 theme-bg-secondary rounded-lg">
        <div>
            <label htmlFor={id} className="font-medium theme-text-primary">{label}</label>
            {description && <p className="text-xs theme-text-secondary">{description}</p>}
        </div>
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-surface',
                checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
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

// --- Tab Content Components ---

const GeneralTab = ({ onSave }: { onSave: () => void }) => {
    const {
        globalLogoUrl, setGlobalLogoUrl,
        globalLogoSize, setGlobalLogoSize,
        useRetinaLogo, setUseRetinaLogo,
        retinaLogoUrl, setRetinaLogoUrl
    } = useSettingsStore();
    
    const mainFileInputRef = useRef<HTMLInputElement>(null);
    const retinaFileInputRef = useRef<HTMLInputElement>(null);

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>, isRetina: boolean) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                toast.error('La imagen no debe superar los 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (isRetina) {
                    setRetinaLogoUrl(reader.result as string);
                } else {
                    setGlobalLogoUrl(reader.result as string);
                }
                toast.success('Logo previsualizado. Guarda los cambios para aplicarlo.');
            };
            reader.readAsDataURL(file);
        }
    };
    
    const currentLogo = globalLogoUrl || EXTERNAL_ASSETS.logos.default;
    const currentRetinaLogo = retinaLogoUrl || EXTERNAL_ASSETS.logos.default;
    
    return (
    <div className="space-y-8">
        <SettingsCard title="Información de la Empresa" description="Datos públicos y branding de la plataforma." footer={<Button onClick={onSave}>Guardar Cambios</Button>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsInput id="companyName" label="Nombre empresa" defaultValue="NEXUM Labs" />
                <SettingsInput id="tagline" label="Tagline" defaultValue="Automatizando la inteligencia legal" />
                <div className="md:col-span-2 space-y-6">
                    {/* Main Logo */}
                    <div>
                        <label className="block text-sm font-medium theme-text-primary mb-1">Logo Principal</label>
                        <div className="mt-1 p-4 border-2 border-dashed theme-border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <img src={currentLogo} alt="Logo preview" className="h-auto theme-bg-secondary p-1 rounded-md" style={{ width: `${globalLogoSize}px` }} />
                                <input type="file" ref={mainFileInputRef} onChange={(e) => handleLogoChange(e, false)} accept="image/png, image/jpeg, image/svg+xml" className="hidden" />
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="secondary" onClick={() => mainFileInputRef.current?.click()}><UploadCloud className="w-4 h-4 mr-2"/>Subir un archivo</Button>
                                    {globalLogoUrl && <Button type="button" variant="ghost" onClick={() => { setGlobalLogoUrl(null); toast.success('Logo quitado.'); }}><Trash2 className="w-4 h-4 mr-2 text-red-500"/> Quitar</Button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Width Slider */}
                    <div>
                        <label htmlFor="logoSize" className="block text-sm font-medium theme-text-primary mb-2">Ancho del logo</label>
                        <div className="flex items-center gap-4">
                            <input id="logoSize" type="range" min="80" max="300" step="1" value={globalLogoSize} onChange={(e) => setGlobalLogoSize(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer" />
                            <span className="text-sm font-mono theme-text-secondary w-20 text-center border theme-border rounded-md p-1">{globalLogoSize}px</span>
                        </div>
                    </div>

                    {/* Retina Toggle */}
                    <SettingsToggle id="useRetina" label="¿Un logo diferente para dispositivos de retina?" checked={useRetinaLogo} onChange={setUseRetinaLogo} description="Sube una versión del logo al doble de tamaño." />

                    {/* Retina Logo Upload */}
                    {useRetinaLogo && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                            <div>
                                <label className="block text-sm font-medium theme-text-primary mb-1">Logo Retina</label>
                                <div className="mt-1 p-4 border-2 border-dashed theme-border rounded-lg">
                                     <div className="flex items-center space-x-4">
                                        {retinaLogoUrl && <img src={currentRetinaLogo} alt="Retina logo preview" className="h-auto theme-bg-secondary p-1 rounded-md" style={{ width: `${globalLogoSize}px` }} />}
                                        <input type="file" ref={retinaFileInputRef} onChange={(e) => handleLogoChange(e, true)} accept="image/png, image/jpeg" className="hidden" />
                                        <div className="flex items-center gap-2">
                                            <Button type="button" variant="secondary" onClick={() => retinaFileInputRef.current?.click()}><UploadCloud className="w-4 h-4 mr-2"/>Cambiar Imagen</Button>
                                            {retinaLogoUrl && <Button type="button" variant="ghost" onClick={() => { setRetinaLogoUrl(null); toast.success('Logo Retina quitado.'); }}><Trash2 className="w-4 h-4 mr-2 text-red-500"/> Quitar</Button>}
                                        </div>
                                    </div>
                                    <p className="text-xs theme-text-muted mt-2">Sube una imagen con el doble de las dimensiones del logo principal (ej. {globalLogoSize*2}px de ancho).</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </SettingsCard>
        <SettingsCard title="Configuración Regional" description="Ajustes de localización para la plataforma." footer={<Button onClick={onSave}>Guardar Cambios</Button>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <SettingsInput id="timezone" label="Zona horaria" defaultValue="GMT-3 Buenos Aires" />
                 <SettingsInput id="currency" label="Moneda principal" defaultValue="USD" />
                 <SettingsInput id="exchangeRate" label="Tasa de cambio ARS/USD" type="number" defaultValue="1263" />
                 <SettingsToggle id="autoUpdateRate" label="Actualizar tasa automáticamente" checked={true} onChange={() => {}} description="" />
            </div>
        </SettingsCard>
    </div>
)};

const PricingTab = ({ onSave }: { onSave: () => void }) => {
    const { plans, updatePlans, promoCodes, addPromoCode, updatePromoCode, deletePromoCode } = usePlatformConfigStore();
    const [localPlans, setLocalPlans] = useState(plans);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        setLocalPlans(plans);
    }, [plans]);

    const handlePlanChange = (id: string, field: 'monthlyPrice' | 'annualPrice' | 'active', value: string | number | boolean) => {
        setLocalPlans(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleSaveChanges = () => {
        updatePlans(localPlans);
        onSave();
    };

    const handleAddCode = (codeData: Omit<PromoCode, 'id' | 'usageCount' | 'createdAt'>) => {
        addPromoCode(codeData);
        toast.success('Código promocional creado.');
        setIsModalOpen(false);
    };

    const handleToggleStatus = (code: PromoCode) => {
        updatePromoCode(code.id, { status: code.status === 'active' ? 'inactive' : 'active' });
        toast.success(`Estado del código ${code.code} actualizado.`);
    };
    
    const handleDeleteCode = (code: PromoCode) => {
        if(confirm(`¿Estás seguro que quieres eliminar el código ${code.code}?`)) {
            deletePromoCode(code.id);
            toast.success('Código eliminado.');
        }
    };

    return (
     <>
        <div className="space-y-8">
            <SettingsCard title="Gestión de Planes" description="Define los precios y características de tus planes." footer={<Button onClick={handleSaveChanges}>Guardar Cambios</Button>}>
                 <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b theme-border text-left theme-text-secondary">
                            <th className="p-2">Plan</th><th className="p-2">Precio Mensual</th><th className="p-2">Precio Anual</th><th className="p-2">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localPlans.map(plan => (
                                <tr key={plan.id}>
                                    <td className="p-2 font-medium">{plan.name}</td>
                                    <td className="p-2"><input type="number" value={plan.monthlyPrice} onChange={(e) => handlePlanChange(plan.id, 'monthlyPrice', Number(e.target.value))} className="w-24 bg-gray-700 text-white p-1 rounded border border-gray-600" /> USD</td>
                                    <td className="p-2"><input type="number" value={plan.annualPrice} onChange={(e) => handlePlanChange(plan.id, 'annualPrice', Number(e.target.value))} className="w-24 bg-gray-700 text-white p-1 rounded border border-gray-600" /> USD</td>
                                    <td className="p-2">
                                        <button onClick={() => handlePlanChange(plan.id, 'active', !plan.active)} className={cn('px-2 py-1 text-xs font-semibold rounded-full', 
                                            plan.active 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' 
                                                : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300'
                                        )}>
                                            {plan.active ? 'Activo' : 'Inactivo'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>
            </SettingsCard>
            <SettingsCard title="Códigos Promocionales" description="Gestiona descuentos y ofertas especiales.">
                <Button onClick={() => setIsModalOpen(true)} className="mb-4">
                    <PlusCircle size={16} className="mr-2"/> Crear nuevo código
                </Button>
                <div className="overflow-x-auto">
                     <table className="w-full text-sm">
                        <thead className="text-xs text-text-secondary uppercase theme-bg-secondary">
                            <tr>
                                <th className="p-2 text-left">Código</th>
                                <th className="p-2 text-left">Descuento</th>
                                <th className="p-2 text-center">Usos</th>
                                <th className="p-2 text-center">Estado</th>
                                <th className="p-2 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promoCodes.map(code => (
                                <tr key={code.id} className="border-b theme-border last:border-0">
                                    <td className="p-2 font-mono theme-text-primary">{code.code}</td>
                                    <td className="p-2 theme-text-secondary">{code.discountType === 'percentage' ? `${code.discountValue}%` : `$${code.discountValue}`}</td>
                                    <td className="p-2 text-center theme-text-secondary">{code.usageCount}{code.usageLimit ? ` / ${code.usageLimit}` : ''}</td>
                                    <td className="p-2 text-center">
                                        <button onClick={() => handleToggleStatus(code)} className={cn('px-2 py-0.5 text-xs rounded-full capitalize', 
                                            code.status === 'active' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' 
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300'
                                        )}>{code.status}</button>
                                    </td>
                                    <td className="p-2 text-right"><Button variant="ghost" size="sm" onClick={() => handleDeleteCode(code)}><Trash2 size={14} className="text-red-500"/></Button></td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>
            </SettingsCard>
        </div>
        <PromoCodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddCode} />
     </>
)};

const ModulesTab = ({ onSave }: { onSave: () => void }) => {
    const { moduleSettings, updateModuleSettings } = usePlatformConfigStore();
    const [localSettings, setLocalSettings] = useState(moduleSettings);

    const handleSettingChange = (id: string, field: keyof typeof localSettings.elias_whatsapp, value: any) => {
        setLocalSettings(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };
    
    const handleSaveChanges = () => {
        updateModuleSettings(localSettings);
        onSave();
    };
    
    const whatsappSettings = localSettings['elias_whatsapp'];

    return (
    <div className="space-y-8">
        <SettingsCard title="ELIAS WhatsApp Bot" description="Límites y costos del módulo de WhatsApp." footer={<Button onClick={handleSaveChanges}>Guardar Cambios</Button>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SettingsToggle id="whatsapp-active" label="Módulo Activo" checked={whatsappSettings.active} onChange={(val: boolean) => handleSettingChange('elias_whatsapp', 'active', val)} />
                <SettingsInput id="whatsapp-launch" label="Fecha Lanzamiento" type="date" value={whatsappSettings.launchDate} onChange={(e: any) => handleSettingChange('elias_whatsapp', 'launchDate', e.target.value)} />
                <SettingsInput id="whatsapp-lite-limit" label="Mensajes Plan Lite" type="number" value={whatsappSettings.liteMessageLimit} onChange={(e: any) => handleSettingChange('elias_whatsapp', 'liteMessageLimit', Number(e.target.value))} />
                <SettingsInput id="whatsapp-cost" label="Costo por mensaje extra" type="number" value={whatsappSettings.extraMessageCost} onChange={(e: any) => handleSettingChange('elias_whatsapp', 'extraMessageCost', Number(e.target.value))} />
            </div>
        </SettingsCard>
    </div>
)};

const IntegrationsTab = ({ onSave }: { onSave: () => void }) => {
    const { integrations, updateIntegrations } = usePlatformConfigStore();
    const [localIntegrations, setLocalIntegrations] = useState(integrations);

    const handleIntegrationChange = (id: 'mercadopago', field: keyof typeof localIntegrations.mercadopago, value: any) => {
        setLocalIntegrations(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };
    
    const handleSaveChanges = () => {
        updateIntegrations(localIntegrations);
        onSave();
    };
    
    const mpSettings = localIntegrations['mercadopago'];
    
     return (
     <div className="space-y-8">
        <SettingsCard title="MercadoPago" description="Configura tu pasarela de pagos principal." footer={<><Button variant="outline" size="sm" onClick={() => toast.success("Conexión exitosa!")}>Test conexión</Button><Button onClick={handleSaveChanges} className="ml-2">Guardar Cambios</Button></>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <SettingsInput id="mp-public-key" label="Public Key" value={mpSettings.publicKey} onChange={(e: any) => handleIntegrationChange('mercadopago', 'publicKey', e.target.value)} />
                 <SettingsInput id="mp-access-token" label="Access Token" value={mpSettings.accessToken} onChange={(e: any) => handleIntegrationChange('mercadopago', 'accessToken', e.target.value)} isPassword />
                 <SettingsToggle id="mp-production" label="Modo Producción" checked={mpSettings.productionMode} onChange={(val: boolean) => handleIntegrationChange('mercadopago', 'productionMode', val)} />
            </div>
        </SettingsCard>
        <SettingsCard title="Google API" description="Conecta tu cuenta de Google para Calendar y otros servicios.">
            <div className="text-center p-4 theme-text-secondary">
                Próximamente.
            </div>
        </SettingsCard>
        <SettingsCard title="N8N Webhooks" description="Automatiza flujos de trabajo con webhooks personalizados.">
            <div className="text-center p-4 theme-text-secondary">
                Próximamente.
            </div>
        </SettingsCard>
    </div>
)};

const PromoCodeModal = ({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) => {
    const [code, setCode] = useState('');
    const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
    const [discountValue, setDiscountValue] = useState(10);
    const [usageLimit, setUsageLimit] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            code: code.toUpperCase(),
            discountType,
            discountValue,
            usageLimit: usageLimit ? Number(usageLimit) : undefined,
            status: 'active'
        });
        // Reset form
        setCode('');
        setDiscountType('percentage');
        setDiscountValue(10);
        setUsageLimit('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="theme-bg-card rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-4 border-b theme-border flex justify-between items-center">
                        <h3 className="text-lg font-bold">Crear Código Promocional</h3>
                        <Button type="button" variant="ghost" size="icon" onClick={onClose}><X size={16}/></Button>
                    </div>
                    <div className="p-4 space-y-4">
                        <SettingsInput id="code" label="Código" value={code} onChange={(e: any) => setCode(e.target.value)} placeholder="EJ: BLACKFRIDAY25" required />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="discountType" className="block text-sm font-medium mb-1">Tipo</label>
                                <select id="discountType" value={discountType} onChange={(e: any) => setDiscountType(e.target.value)} className="input-premium w-full">
                                    <option value="percentage">Porcentaje (%)</option>
                                    <option value="fixed">Monto Fijo (USD)</option>
                                </select>
                            </div>
                            <SettingsInput id="discountValue" label="Valor" type="number" value={discountValue} onChange={(e: any) => setDiscountValue(Number(e.target.value))} required />
                        </div>
                        <SettingsInput id="usageLimit" label="Límite de Usos (Opcional)" type="number" value={usageLimit} onChange={(e: any) => setUsageLimit(e.target.value)} placeholder="Ej: 100" />
                    </div>
                    <div className="p-4 theme-bg-secondary rounded-b-xl flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Crear Código</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

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
            default: return <div className="text-center p-8 theme-bg-card border theme-border rounded-xl"><p className="theme-text-secondary">Esta sección estará disponible próximamente.</p></div>;
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">Configuración Global</h1>
                <p className="theme-text-secondary mt-1">Administra la configuración de toda la plataforma NEXUM.</p>
            </div>

            <div className="flex border-b theme-border overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap',
                            activeTab === tab.id
                                ? 'border-primary theme-text-primary'
                                : 'border-transparent theme-text-muted hover:theme-text-primary'
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