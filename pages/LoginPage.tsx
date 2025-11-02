
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the homepage and add a hash to trigger the login modal
    navigate('/#login', { replace: true });
  }, [navigate]);

  return (
    // Show a loading spinner while redirecting to provide user feedback
    <div className="flex items-center justify-center h-full">
      <LoadingSpinner />
    </div>
  );
};

export default LoginPage;
