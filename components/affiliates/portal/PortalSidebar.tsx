import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { SIDEBAR_CONFIG_BY_ROLE } from '../../../constants';
import Logo from '../../ui/Logo';

interface PortalSidebarProps {
  onLinkClick?: () => void;
}

const PortalSidebar: React.FC<PortalSidebarProps> = ({ onLinkClick }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const navItems = user ? SIDEBAR_CONFIG_BY_ROLE[user.role] || [] : [];

  return (
    <aside className="sidebar-premium">
      <div className="h-20 flex items-center justify-center px-6 border-b border-border-color flex-shrink-0">
        <Link to="/portal/panel">
             <div className="flex items-center gap-2">
                <Logo className="w-8 h-auto" variant="icon" />
                <span className="font-bold text-lg text-white tracking-tight">Portal Afiliados</span>
             </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
            {navItems.map((item) => (
            <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                onClick={onLinkClick}
            >
                {item.icon && <item.icon className="icon" />}
                <span>{item.label}</span>
            </NavLink>
            ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border-color flex-shrink-0">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
            </div>
            <div>
                <p className="font-semibold text-sm text-text-primary">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-text-secondary">{user?.email}</p>
            </div>
        </div>
        <button onClick={handleLogout} className="sidebar-item w-full mt-4">
            <LogOut className="icon" />
            <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default PortalSidebar;