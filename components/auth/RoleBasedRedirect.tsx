import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useRoleBasedNavigation } from '../../hooks/useRoleBasedNavigation';

const RoleBasedRedirect: React.FC = () => {
    const { isAuthenticated, user } = useAuthStore();
    const { navigateToHome } = useRoleBasedNavigation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login', { replace: true });
        } else {
            navigateToHome(user.role);
        }
    }, [isAuthenticated, user, navigate, navigateToHome]);

    return (
      <div className="flex items-center justify-center h-screen theme-bg-secondary">
        <LoadingSpinner />
      </div>
    );
};

export default RoleBasedRedirect;