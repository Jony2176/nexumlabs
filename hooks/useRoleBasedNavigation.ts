import { useNavigate } from 'react-router-dom';
import { User } from '../types';

export const homePaths: { [key in User['role']]: string } = {
  super_admin: '/admin/dashboard',
  owner: '/app/dashboard',
  admin: '/app/dashboard',
  user: '/app/modules', // As per spec, 'user' has a more restricted default view
  affiliate: '/portal/dashboard',
};

export const useRoleBasedNavigation = () => {
  const navigate = useNavigate();

  const navigateToHome = (role: User['role']) => {
    const destination = homePaths[role] || '/login';
    navigate(destination, { replace: true });
  };

  return { navigateToHome };
};