import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { homePaths } from '../../hooks/useRoleBasedNavigation';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  // FIX: Changed type from React.ReactElement to React.ReactNode to allow for more flexible children, such as comments or multiple elements.
  children: React.ReactNode;
  allowedRoles: Array<keyof typeof homePaths>;
  requireCompletedOnboarding?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles, requireCompletedOnboarding = false }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if the user's role is allowed for this route
  if (!allowedRoles.includes(user.role)) {
      const defaultPath = homePaths[user.role] || '/login';
      toast.error('No tienes permisos para acceder a esta sección.');
      return <Navigate to={defaultPath} replace />;
  }

  // Check if onboarding is required and not completed
  if (requireCompletedOnboarding && user.onboardingCompleted === false) {
      // Assuming an onboarding page exists at this route
      return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;