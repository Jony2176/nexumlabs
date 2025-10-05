import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { useAuthStore } from '../store/authStore';
import { Info } from 'lucide-react';
import { USE_MOCK } from '../services/api';
import DemoBanner from '../components/ui/DemoBanner';
import PremiumBackground from '../components/ui/PremiumBackground';
import { FEATURE_FLAGS } from '../config/featureFlags';
import toast from 'react-hot-toast';


const TrialBanner: React.FC = () => {
    const { organization } = useAuthStore();

    if (organization?.subscription_status !== 'trialing' || !organization.trial_ends_at) {
        return null;
    }

    const trialEndDate = new Date(organization.trial_ends_at);
    const now = new Date();
    const diffTime = trialEndDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return null;

    return (
        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-600" role="alert">
            <div className="flex items-center">
                <Info className="h-5 w-5 mr-3 text-amber-600"/>
                <p className="font-bold">
                    Período de prueba: {diffDays} {diffDays === 1 ? 'día restante' : 'días restantes'}.{' '}
                    <Link to="/app/subscription" className="underline hover:text-amber-950 dark:hover:text-yellow-200">
                        ¡Actualiza tu plan ahora!
                    </Link>
                </p>
            </div>
        </div>
    );
};


const DashboardLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        const checkNewModules = () => {
            try {
                const notifiedModulesJSON = localStorage.getItem('nexum_notified_modules');
                const notifiedModules: string[] = notifiedModulesJSON ? JSON.parse(notifiedModulesJSON) : [];
                const today = new Date();
                let updated = false;

                Object.values(FEATURE_FLAGS).forEach(flag => {
                    const launchDate = new Date(flag.launchDate);
                    if (launchDate <= today && !notifiedModules.includes(flag.id)) {
                        toast.success(`🎉 ¡${flag.name} ya está disponible!`, {
                            duration: 8000,
                            icon: '🚀'
                        });
                        notifiedModules.push(flag.id);
                        updated = true;
                    }
                });

                if (updated) {
                    localStorage.setItem('nexum_notified_modules', JSON.stringify(notifiedModules));
                }
            } catch (error) {
                console.error("Failed to check for new modules:", error);
            }
        };
        checkNewModules();
    }, []);

    return (
        <div className="theme-bg-primary theme-text-primary flex min-h-screen relative">
            <PremiumBackground />
            
            {/* Mobile overlay */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden" aria-hidden="true"></div>}
            
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
                <Sidebar onLinkClick={handleSidebarClose} />
            </div>

            <div className="flex-1 flex flex-col overflow-hidden pl-0 lg:pl-[280px]">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                {USE_MOCK && <DemoBanner />}
                <TrialBanner />
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;