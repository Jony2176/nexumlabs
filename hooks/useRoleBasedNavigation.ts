import { useNavigate } from 'react-router-dom';
import { User } from '../types';

export const homePaths: { [key in User['role']]: string } = {
  super_admin: '/admin/panel',
  user: '/app/panel-control',
  affiliate: '/portal/panel',
};

export const useRoleBasedNavigation = () => {
  const navigate = useNavigate();

  const navigateToHome = (role: User['role']) => {
    const destination = homePaths[role] || '/login';
    navigate(destination, { replace: true });
  };

  return { navigateToHome };
};