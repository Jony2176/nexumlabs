
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { USE_MOCK } from '../services/api';
import { useRoleBasedNavigation } from '../hooks/useRoleBasedNavigation';
import { CheckCircle, AlertTriangle, User, Shield, Users as AffiliateIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { User as UserType } from '../types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const { navigateToHome } = useRoleBasedNavigation();

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
      const apiResponse = await api.login(email, password);
      
      // Handle n8n sometimes wrapping the response in an array
      const responseData = Array.isArray(apiResponse) ? apiResponse[0] : apiResponse;
      
      // Flexible check for flat response from n8n backend
      if (!responseData || !responseData.api_key) {
          console.error("Respuesta de inicio de sesión inválida:", JSON.stringify(apiResponse, null, 2));
          throw new Error("Credenciales incorrectas o el usuario no existe.");
      }
      
      // Infer role from email for demo users, as backend doesn't provide it
      let role: UserType['role'] = 'owner'; // Default role
      if (responseData.email === 'superadmin@nexum.com') {
          role = 'super_admin';
      } else if (responseData.email === 'affiliate@nexum.com') {
          role = 'affiliate';
      } else if (responseData.role) {
          role = responseData.role;
      }

      const authData = {
        token: responseData.api_key,
        user: {
          id: responseData.id || `usr_${Date.now()}`,
          email: responseData.email,
          firstName: responseData.name || 'Usuario',
          lastName: responseData.last_name || '',
          phone: responseData.phone,
          role: role,
          orgId: responseData.id,
          onboardingCompleted: responseData.onboarding_completed ?? true,
        },
        organization: {
          id: responseData.id,
          name: responseData.name || 'Mi Estudio',
          slug: responseData.slug,
          email: responseData.email,
          phone: responseData.phone,
          modules: {}, // Let useModules hook handle the real module state
          subscription_status: responseData.subscription_status || 'trialing',
          trial_ends_at: responseData.trial_ends_at || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        }
      };
      
      setAuth(authData);
      loginSuccess = true;
      showSuccessToast(authData.user.firstName);
      
      setTimeout(() => {
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
      <Card>
          <div className="p-8">
              <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-text-primary mb-2">
                      Bienvenido de nuevo
                  </h1>
                  <p className="text-text-secondary">Inicia sesión en la cuenta de tu organización.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                      id="email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@dominio.com"
                      required
                      autoComplete="email"
                  />
                  <Input
                      id="password"
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
                      <Link to="/register" className="font-medium text-primary hover:underline">
                          Regístrate
                      </Link>
                  </p>
              </form>
          </div>
          
          <div className="bg-black/20 p-6 rounded-b-xl border-t border-white/10">
              <h3 className="font-bold text-center text-white mb-4">🚀 ACCESO DEMO</h3>
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
      </Card>
  );
};

export default LoginPage;