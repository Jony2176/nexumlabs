


import React from 'react';
// FIX: Changed import from 'react-router' to 'react-router-dom' for web compatibility.
import { Outlet } from 'react-router-dom';
import PublicHeader from '../components/layout/PublicHeader';
import PublicFooter from '../components/layout/PublicFooter';
import PremiumBackground from '../components/ui/PremiumBackground';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen theme-bg-primary flex flex-col relative">
      <PremiumBackground />
      <div className="z-10 flex flex-col flex-grow">
        <PublicHeader />
        <main className="flex-grow">
          <Outlet />
        </main>
        <PublicFooter />
      </div>
    </div>
  );
};

export default PublicLayout;