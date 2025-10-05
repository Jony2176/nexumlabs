import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { USE_MOCK } from '../services/api';
import { useRoleBasedNavigation } from '../hooks/useRoleBasedNavigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const { navigateToHome } = useRoleBasedNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.login(email, password);
      
      setAuth(response);

      const welcomeMessages: { [key: string]: string } = {
        super_admin: `👋 Hola ${response.user.firstName}, bienvenido al panel de control.`,
        owner: `¡Bienvenido ${response.user.firstName}! Tu estudio te está esperando.`,
        user: `Hola ${response.user.firstName}, listo para trabajar.`,
        affiliate: `¡Hola ${response.user.firstName}! Revisa tus comisiones.`,
      };
      
      toast.success(welcomeMessages[response.user.role] || '¡Inicio de sesión exitoso!', {
        icon: '🚀'
      });
      
      navigateToHome(response.user.role);

    } catch (error: any) {
      toast.error(error.message || 'Credenciales inválidas.');
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="theme-bg-card border theme-border rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-bold theme-text-primary mb-1">
            Bienvenido de nuevo
        </h1>
        <p className="theme-text-secondary mb-6">Inicia sesión en la cuenta de tu organización.</p>
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
            <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
            <p className="text-sm text-center theme-text-secondary">
                ¿Aún no tienes una cuenta?{' '}
                <Link to="/register" className="font-medium theme-accent hover:underline">
                    Regístrate
                </Link>
            </p>
        </form>
        
        {USE_MOCK && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-900">
            <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                🔐 Credenciales de Dueño (Cliente):
                </p>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <p><strong className="font-semibold">Email:</strong> demo@nexum.com</p>
                <p><strong className="font-semibold">Contraseña:</strong> demo123</p>
                </div>
            </div>
            <div className="mt-3 border-t border-blue-200 dark:border-blue-900 pt-3">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                👑 Credenciales de Super Admin:
                </p>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <p><strong className="font-semibold">Email:</strong> superadmin@nexum.com</p>
                    <p><strong className="font-semibold">Contraseña:</strong> demo123</p>
                </div>
            </div>
            <div className="mt-3 border-t border-blue-200 dark:border-blue-900 pt-3">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                👤 Credenciales de Afiliado:
                </p>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <p><strong className="font-semibold">Email:</strong> affiliate@nexum.com</p>
                    <p><strong className="font-semibold">Contraseña:</strong> demo123</p>
                </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default LoginPage;