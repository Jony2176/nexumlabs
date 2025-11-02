

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { USE_MOCK } from '../../services/api';
import { useRoleBasedNavigation } from '../../hooks/useRoleBasedNavigation';
import { CheckCircle, AlertTriangle, User, Shield, Users as AffiliateIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { User as UserType } from '../../types';
import * as Dialog from '@radix-ui/react-dialog';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const { navigateToHome } = useRoleBasedNavigation();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
        setEmail('');
        setPassword('');
        setIsLoading(false);
    }
  }, [isOpen]);

  const showSuccessToast = (name: string) => {
    toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-md w-full glass-card shadow-lg rounded-lg pointer-events-auto flex"
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    ¡Bienvenido, {name}!
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Redirigiendo a tu panel...
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ),
        { duration: 4000 }
      );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let loginSuccess = false;
    try {
      const responseData = await api.login(email, password);

      // --- SPECIAL USER: SUPERADMIN ---
      if (responseData && email === 'superadmin@nexum.com') {
          const authData = {
              token: responseData.api_key || `MOCK_SUPERADMIN_TOKEN_${Date.now()}`,
              user: {
                  id: 'usr_superadmin',
                  email: email,
                  firstName: 'Super', lastName: 'Admin', role: 'super_admin' as const,
                  orgId: 'org_admin', onboardingCompleted: true,
              },
              organization: {
                  id: 'org_admin', name: 'NEXUM Labs HQ', slug: 'nexum-hq',
                  email: email, phone: '', modules: {},
                  subscription_status: 'active' as const,
                  trial_ends_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
              }
          };
          setAuth(authData);
          loginSuccess = true;
          showSuccessToast(authData.user.firstName);
          setTimeout(() => {
              onClose();
              navigateToHome(authData.user.role);
          }, 500);
          return;
      }

      // --- SPECIAL USER: AFFILIATE ---
      if (responseData && email === 'affiliate@nexum.com') {
          const authData = {
              token: responseData.api_key || `MOCK_AFFILIATE_TOKEN_${Date.now()}`,
              user: {
                  id: 'usr_affiliate_1',
                  email: email,
                  firstName: 'Juan', lastName: 'Afiliado', role: 'affiliate' as const,
                  orgId: 'org_affiliate', onboardingCompleted: true,
              },
              organization: {
                  id: 'org_affiliate', name: 'Marketing Pro', slug: 'marketing-pro',
                  email: email, phone: '', modules: {},
                  subscription_status: 'active' as const,
                  trial_ends_at: new Date().toISOString(),
              }
          };
          setAuth(authData);
          loginSuccess = true;
          showSuccessToast(authData.user.firstName);
          setTimeout(() => {
              onClose();
              navigateToHome(authData.user.role);
          }, 500);
          return;
      }
      
      // --- REGULAR USER FLOW ---
      if (!responseData || !responseData.id || !responseData.api_key) {
          console.error("Respuesta de inicio de sesión inválida:", JSON.stringify(responseData, null, 2));
          throw new Error("Credenciales incorrectas o el usuario no existe.");
      }
      
      const authData = {
        token: responseData.api_key,
        user: {
          id: responseData.id,
          email: responseData.email,
          firstName: responseData.name || 'Usuario',
          lastName: responseData.last_name || '',
          phone: responseData.phone,
          role: (responseData.role || 'owner') as UserType['role'],
          orgId: responseData.org_id || responseData.id,
          onboardingCompleted: responseData.onboarding_completed ?? true,
        },
        organization: {
          id: responseData.org_id || responseData.id,
          name: responseData.organization_name || responseData.name || 'Mi Estudio',
          slug: responseData.slug || responseData.name || 'mi-estudio',
          email: responseData.email,
          phone: responseData.phone,
          modules: responseData.modules || {},
          subscription_status: (responseData.subscription_status || 'trialing'),
          trial_ends_at: responseData.trial_ends_at || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        }
      };
      
      setAuth(authData);
      loginSuccess = true;
      showSuccessToast(authData.user.firstName);
      setTimeout(() => {
          onClose();
          navigateToHome(authData.user.role);
      }, 500);

    } catch (error: any) {
      const title = "Error de Inicio de Sesión";
      const description = error.message || "No se pudo iniciar sesión. Revisa tus datos e intenta de nuevo.";
      
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-md w-full glass-card shadow-lg rounded-lg pointer-events-auto flex"
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-text-primary">{title}</p>
                  <p className="mt-1 text-sm text-text-secondary">{description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ),
        { duration: 8000 }
      );
      console.error('Login failed:', error);
    } finally {
      if (!loginSuccess) {
        setIsLoading(false);
      }
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPass: string) => {
      setEmail(demoEmail);
      setPassword(demoPass);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md"
              >
                  <div className="w-full">
                    <div className="glass-card shadow-2xl shadow-black/20 relative">
                      <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-white z-10" aria-label="Cerrar">
                          <X />
                        </button>
                      </Dialog.Close>
                      <div className="p-8">
                          <div className="text-center mb-8">
                              <h1 className="text-3xl font-bold text-text-primary mb-2">
                                  Bienvenido de nuevo
                              </h1>
                              <p className="text-text-secondary">Inicia sesión en la cuenta de tu organización.</p>
                          </div>
                          <form onSubmit={handleSubmit} className="space-y-4">
                              <Input
                                  id="modal-email"
                                  label="Email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="nombre@dominio.com"
                                  required
                                  autoComplete="email"
                              />
                              <Input
                                  id="modal-password"
                                  label="Contraseña"
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="••••••••"
                                  required
                                  autoComplete="current-password"
                              />
                              
                              <div className="pt-2">
                                <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                                    {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                                </Button>
                              </div>

                              <p className="text-sm text-center text-text-secondary !mt-6">
                                  ¿Aún no tienes una cuenta?{' '}
                                  <Link to="/register" onClick={onClose} className="font-medium text-primary hover:underline">
                                      Regístrate
                                  </Link>
                              </p>
                          </form>
                      </div>
                      
                      {USE_MOCK && (
                        <div className="bg-black/20 p-6 rounded-b-xl border-t border-white/10">
                          <h3 className="font-bold text-center text-white mb-4">🚀 MODO DEMO ACTIVADO</h3>
                          <p className="text-xs text-center text-gray-400 mb-4">Haz clic en un rol para usar sus credenciales y explorar la plataforma.</p>
                          <div className="space-y-3 text-sm">
                              {[
                                  { role: 'Cliente (Dueño)', email: 'demo@nexum.com', pass: 'demo123', icon: User, color: 'blue' },
                                  { role: 'Super Admin', email: 'superadmin@nexum.com', pass: 'demo123', icon: Shield, color: 'purple' },
                                  { role: 'Afiliado', email: 'affiliate@nexum.com', pass: 'demo123', icon: AffiliateIcon, color: 'green' }
                              ].map(item => (
                                  <button key={item.role} onClick={() => handleDemoLogin(item.email, item.pass)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                                      <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/20 text-${item.color}-300 flex items-center justify-center flex-shrink-0`}>
                                        <item.icon size={16} />
                                      </div>
                                      <div className="text-left">
                                          <p className="font-semibold text-gray-300">{item.role}</p>
                                          <p className="text-xs text-gray-400"><span className="font-mono">{item.email}</span> / <span className="font-mono">{item.pass}</span></p>
                                      </div>
                                  </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;