import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { USE_MOCK } from '../services/api';
import DemoBanner from '../components/ui/DemoBanner';
import PremiumBackground from '../components/ui/PremiumBackground';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return (
        <ProtectedRoute allowedRoles={['super_admin']}>
            <div className="theme-bg-primary theme-text-primary flex min-h-screen relative dark">
                <PremiumBackground />
                
                {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden" aria-hidden="true"></div>}
                
                <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
                    <Sidebar onLinkClick={handleSidebarClose} />
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                    {USE_MOCK && <DemoBanner />}
                    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                        <div className="mx-auto">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminLayout;