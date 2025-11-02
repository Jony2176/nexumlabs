
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PublicHeader from '../components/layout/PublicHeader';
import PublicFooter from '../components/layout/PublicFooter';
import PremiumBackground from '../components/ui/PremiumBackground';
import LoginModal from '../components/auth/LoginModal';

const PublicLayout: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash === '#login') {
      setIsLoginModalOpen(true);
    }
  }, [location.hash]);

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    // remove the hash from the URL when the modal is closed for a cleaner URL
    if (location.hash === '#login') {
      navigate(location.pathname, { replace: true });
    }
  };

  return (
    <div className="min-h-screen theme-bg-primary flex flex-col relative">
      <PremiumBackground />
      <div className="z-10 flex flex-col flex-grow">
        <PublicHeader onLoginClick={() => setIsLoginModalOpen(true)} />
        <main className="flex-grow">
          <Outlet />
        </main>
        <PublicFooter />
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
    </div>
  );
};

export default PublicLayout;
