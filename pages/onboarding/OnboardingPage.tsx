
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Check, ChevronRight, ChevronLeft, MessageSquare, CreditCard, Building, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import { PRICING_PLANS } from '../../constants';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Logo from '../../components/ui/Logo';
import PremiumBackground from '../../components/ui/PremiumBackground';
import { Plan } from '../../types';

type Step = 1 | 2 | 3 | 4;

interface OnboardingData {
  // Step 1
  studioName: string;
  email: string;
  phone: string;
  cuit: string;
  // Step 2
  selectedPlanId: string;
  // Step 3 (WhatsApp)
  whatsappNumber: string;
  welcomeMessage: string;
  schedule: string;
  areas: string[];
}

const OnboardingPage: React.FC = () => {
  const { user, setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<OnboardingData>({
    studioName: user?.firstName ? `${user.firstName}'s Studio` : '',
    email: user?.email || '',
    phone: user?.phone || '',
    cuit: '',
    selectedPlanId: 'pro',
    whatsappNumber: '549',
    welcomeMessage: 'Hola, gracias por contactar a nuestro estudio. ¿En qué podemos ayudarte?',
    schedule: 'Lun-Vie 09:00 - 18:00',
    areas: ['Laboral', 'Civil'],
  });

  const handleNext = () => {
    if (step === 1) {
        if (!formData.studioName || !formData.cuit) {
            toast.error('Por favor completa todos los campos obligatorios.');
            return;
        }
    }
    setStep((prev) => Math.min(prev + 1, 4) as Step);
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  const updateField = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArea = (area: string) => {
    setFormData(prev => {
        const areas = prev.areas.includes(area) 
            ? prev.areas.filter(a => a !== area)
            : [...prev.areas, area];
        return { ...prev, areas };
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    const toastId = toast.loading('Procesando pago y configurando entorno...');

    try {
        // 1. Register/Update Organization Data
        // 2. Create Subscription
        // 3. Configure Module (WhatsApp)
        
        // We use a new API endpoint for this aggregate action
        const response = await api.completeOnboarding({
            userId: user?.id,
            organizationData: {
                name: formData.studioName,
                email: formData.email,
                phone: formData.phone,
                cuit: formData.cuit
            },
            planId: formData.selectedPlanId,
            whatsappConfig: {
                number: formData.whatsappNumber,
                welcomeMessage: formData.welcomeMessage,
                schedule: formData.schedule,
                areas: formData.areas
            }
        }) as any;

        // Update local auth store with new data (e.g. onboardingCompleted = true)
        if (user) {
             // Force update user state
             const updatedUser = { ...user, onboardingCompleted: true };
             // We need to fetch the fresh org data ideally, but for now we update locally
             setAuth({ 
                 user: updatedUser, 
                 organization: response.organization, // Assuming API returns the updated org
                 token: useAuthStore.getState().token! 
             });
        }

        toast.success('¡Bienvenido a NEXUM! Tu estudio está listo.', { id: toastId });
        navigate('/billing/success', { state: { plan: PRICING_PLANS.find(p => p.id === formData.selectedPlanId) } });

    } catch (error) {
        console.error(error);
        toast.error('Hubo un error al procesar tu solicitud.', { id: toastId });
    } finally {
        setIsLoading(false);
    }
  };

  // Animation variants
  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const selectedPlan = PRICING_PLANS.find(p => p.id === formData.selectedPlanId);
  const includesWhatsApp = selectedPlan?.requiredModules?.includes('elias_whatsapp');

  // Skip Step 3 if plan doesn't have WhatsApp, but for this specific flow requirements, 
  // plans listed (Lite, Start, Pro) usually have it. 
  // If we were strict: 
  // if (step === 3 && !includesWhatsApp) setStep(4); 

  return (
    <div className="min-h-screen theme-bg-primary flex flex-col relative overflow-hidden">
      <PremiumBackground />
      
      {/* Header */}
      <header className="p-6 flex justify-between items-center z-10">
        <Logo className="w-32" />
        <div className="text-sm font-medium theme-text-secondary">
            Paso {step} de 4
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 z-10">
        <Card className="w-full max-w-2xl p-0 overflow-hidden shadow-2xl border-border-color/50">
            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-200 dark:bg-gray-800 w-full">
                <div 
                    className="h-full bg-gradient-to-r from-nexum-primary to-nexum-secondary transition-all duration-500 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>

            <div className="p-8 min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" variants={variants} initial="enter" animate="center" exit="exit" className="flex-grow">
                            <div className="text-center mb-8">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building size={24} />
                                </div>
                                <h2 className="text-2xl font-bold theme-text-primary">Datos del Estudio</h2>
                                <p className="theme-text-secondary">Comencemos con la información básica de tu organización.</p>
                            </div>
                            <div className="space-y-4">
                                <Input id="studioName" label="Nombre del Estudio" value={formData.studioName} onChange={e => updateField('studioName', e.target.value)} placeholder="Ej. Martínez & Asociados" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input id="email" label="Email Corporativo" value={formData.email} onChange={e => updateField('email', e.target.value)} type="email" />
                                    <Input id="phone" label="Teléfono de Contacto" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
                                </div>
                                <Input id="cuit" label="CUIT / Identificación Fiscal" value={formData.cuit} onChange={e => updateField('cuit', e.target.value)} placeholder="20-xxxxxxxx-x" />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" variants={variants} initial="enter" animate="center" exit="exit" className="flex-grow">
                            <div className="text-center mb-8">
                                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <h2 className="text-2xl font-bold theme-text-primary">Elige tu Plan</h2>
                                <p className="theme-text-secondary">Selecciona la potencia que tu estudio necesita.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {PRICING_PLANS.filter(p => ['lite', 'start', 'pro', 'professional'].includes(p.id)).map(plan => (
                                    <div 
                                        key={plan.id}
                                        onClick={() => updateField('selectedPlanId', plan.id)}
                                        className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 flex flex-col relative ${
                                            formData.selectedPlanId === plan.id 
                                            ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-lg scale-[1.02]' 
                                            : 'border-border-color hover:border-gray-400 dark:hover:border-gray-600 bg-bg-secondary'
                                        }`}
                                    >
                                        {formData.selectedPlanId === plan.id && (
                                            <div className="absolute top-3 right-3 text-primary"><Check size={20} /></div>
                                        )}
                                        <h3 className="font-bold text-lg theme-text-primary">{plan.name}</h3>
                                        <div className="text-2xl font-bold mt-2 mb-4 text-text-primary">${plan.price.monthly}<span className="text-sm font-normal text-text-secondary">/mes</span></div>
                                        <ul className="space-y-2 mb-4 flex-grow">
                                            {plan.features.slice(0, 3).map((f, i) => (
                                                <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                                                    <span className="text-green-500 mt-0.5">•</span> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                         <motion.div key="step3" variants={variants} initial="enter" animate="center" exit="exit" className="flex-grow">
                            <div className="text-center mb-8">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare size={24} />
                                </div>
                                <h2 className="text-2xl font-bold theme-text-primary">Configura ELIAS WhatsApp</h2>
                                <p className="theme-text-secondary">Personaliza tu asistente virtual inicial.</p>
                            </div>
                            
                            <div className="space-y-4">
                                <Input id="whatsappNumber" label="Número de WhatsApp (con código de país)" value={formData.whatsappNumber} onChange={e => updateField('whatsappNumber', e.target.value)} placeholder="54911..." />
                                
                                <div>
                                    <label className="block text-sm font-medium theme-text-primary mb-1">Mensaje de Bienvenida</label>
                                    <textarea 
                                        className="input-premium w-full h-24" 
                                        value={formData.welcomeMessage}
                                        onChange={e => updateField('welcomeMessage', e.target.value)}
                                    />
                                    <p className="text-xs theme-text-muted mt-1">Este es el primer mensaje que recibirán tus clientes.</p>
                                </div>

                                <Input id="schedule" label="Horarios de Atención" value={formData.schedule} onChange={e => updateField('schedule', e.target.value)} />

                                <div>
                                    <label className="block text-sm font-medium theme-text-primary mb-2">Áreas de Práctica (para calificar)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Laboral', 'Civil', 'Penal', 'Familia', 'Comercial', 'Administrativo'].map(area => (
                                            <button
                                                key={area}
                                                onClick={() => toggleArea(area)}
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                                    formData.areas.includes(area)
                                                    ? 'bg-primary text-white'
                                                    : 'bg-bg-secondary text-text-secondary border border-border-color hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                            >
                                                {formData.areas.includes(area) && <Check size={14} className="inline mr-1" />}
                                                {area}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" variants={variants} initial="enter" animate="center" exit="exit" className="flex-grow flex flex-col items-center justify-center text-center">
                             <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-6">
                                <CreditCard size={32} />
                            </div>
                            <h2 className="text-2xl font-bold theme-text-primary mb-2">Resumen y Pago</h2>
                            <p className="theme-text-secondary mb-8">Revisa los detalles antes de confirmar.</p>

                            <div className="w-full bg-bg-secondary rounded-xl p-6 text-left space-y-3 border border-border-color mb-8">
                                <div className="flex justify-between">
                                    <span className="theme-text-muted">Estudio:</span>
                                    <span className="font-medium theme-text-primary">{formData.studioName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="theme-text-muted">Plan Seleccionado:</span>
                                    <span className="font-medium theme-text-primary text-primary">{selectedPlan?.name}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-border-color pt-3 mt-2">
                                    <span className="theme-text-primary font-bold">Total a Pagar:</span>
                                    <span className="text-2xl font-bold theme-text-primary">${selectedPlan?.price.monthly}</span>
                                </div>
                            </div>

                            <Button size="lg" onClick={handlePayment} disabled={isLoading} className="w-full py-4 text-lg shadow-xl shadow-primary/20">
                                {isLoading ? 'Procesando...' : 'Pagar con MercadoPago'}
                            </Button>
                             <p className="text-xs theme-text-muted mt-4">
                                Al continuar, aceptas nuestros Términos y Condiciones. Transacción segura vía MercadoPago.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 flex justify-between items-center pt-6 border-t border-border-color">
                    {step > 1 ? (
                         <Button variant="ghost" onClick={handlePrev} disabled={isLoading}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                        </Button>
                    ) : <div></div>}

                    {step < 4 && (
                        <Button onClick={handleNext}>
                            Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </Card>
      </main>
    </div>
  );
};

export default OnboardingPage;
