import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import PremiumBackground from '../components/ui/PremiumBackground';
import { ShieldCheck, Users, Zap } from 'lucide-react';

const AuthLayout: React.FC = () => {
  useEffect(() => {
    const originalClassName = document.documentElement.className;
    // Forcibly apply dark theme for auth pages to ensure consistency and logo visibility
    document.documentElement.className = 'dark';
    
    // Cleanup on unmount to restore original theme
    return () => {
      document.documentElement.className = originalClassName;
    };
  }, []);

  return (
    <div className="min-h-screen bg-nexum-dark flex flex-col relative">
      <PremiumBackground />
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 z-10">
        
        {/* Left Panel - Info */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 text-white">
            <div className="max-w-md w-full">
                <Link to="/" className="block mb-12">
                     <Logo className="h-20 w-auto" />
                </Link>
                <h1 className="text-4xl font-bold leading-tight mb-6">
                    El Futuro de la <span className="text-gradient">Gestión Legal</span> ya está aquí.
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    Centraliza, automatiza y escala tu estudio jurídico con la potencia de la inteligencia artificial.
                </p>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-nexum-primary/20 text-nexum-primary flex items-center justify-center flex-shrink-0 mt-1">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                        <h3 className="font-semibold text-lg text-white">Arquitectura Multi-Tenant Segura</h3>
                        <p className="text-gray-400 text-sm">Aislamiento de datos de nivel empresarial para tu tranquilidad.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-nexum-primary/20 text-nexum-primary flex items-center justify-center flex-shrink-0 mt-1">
                           <Zap className="w-5 h-5" />
                        </div>
                        <div>
                        <h3 className="font-semibold text-lg text-white">Módulos de IA Avanzados</h3>
                        <p className="text-gray-400 text-sm">Desde asistentes virtuales hasta predicción de resultados de casos.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-[var(--bg-secondary)] bg-opacity-50 backdrop-blur-sm border-l border-[var(--border-color)]">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center lg:hidden">
              <Link to="/" aria-label="Ir a la página de inicio">
                <Logo className="h-16 w-auto" />
              </Link>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
