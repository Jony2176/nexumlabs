
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PublicHeader from '../components/layout/PublicHeader';
import PublicFooter from '../components/layout/PublicFooter';
import PremiumBackground from '../components/ui/PremiumBackground';

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen theme-bg-primary flex flex-col relative">
      <PremiumBackground />
      <div className="z-10 flex flex-col flex-grow">
        <PublicHeader onLoginClick={() => navigate('/login')} />
        <main className="flex-grow">
          <Outlet />
        </main>
        <PublicFooter />
      </div>
    </div>
  );
};

export default PublicLayout;
