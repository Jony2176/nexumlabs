import { useNavigate } from 'react-router-dom';
import { User } from '../types';

export const homePaths: { [key in User['role']]: string } = {
  super_admin: '/admin/panel',
  owner: '/app/panel-control',
  admin: '/app/panel-control',
  user: '/app/modules', // As per spec, 'user' has a more restricted default view
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