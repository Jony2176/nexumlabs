



import React, { useState } from 'react';
// FIX: Split react-router-dom imports to resolve export errors.
// FIX: Changed import from 'react-router' to 'react-router-dom' for web compatibility.
import { Outlet } from 'react-router-dom';
import PortalSidebar from '../components/affiliates/portal/PortalSidebar';
import Header from '../components/dashboard/Header';

const AffiliatePortalLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen theme-bg-secondary theme-text-primary">
      {/* Mobile overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-20 lg:hidden" aria-hidden="true"></div>}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
        <PortalSidebar onLinkClick={handleSidebarClose} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto theme-bg-secondary p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AffiliatePortalLayout;