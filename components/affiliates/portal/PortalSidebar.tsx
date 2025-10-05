import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, Wallet, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { SIDEBAR_CONFIG_BY_ROLE } from '../../../constants';

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

  const navItems = user ? SIDEBAR_CONFIG_BY_ROLE[user.role] : [];
  
  const baseLinkClass = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors";
  const activeLinkClass = "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300";
  const inactiveLinkClass = "theme-text-secondary hover:theme-bg-secondary hover:text-primary-600 dark:hover:text-primary-300";

  return (
    <aside className="w-64 flex-shrink-0 theme-bg-card flex flex-col border-r theme-border h-full">
      <div className="h-20 flex items-center px-6 border-b theme-border">
        <div className="flex items-center space-x-3">
            <div className="bg-primary-500/10 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary-400" />
            </div>
            <span className="theme-text-primary text-lg font-bold">Portal Afiliados</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            // FIX: Replaced 'item.name' with 'item.id' for the key prop in the NavLink component to align with the NavItemExpanded interface and resolve the 'property name does not exist' error.
            key={item.id}
            to={item.path}
            className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
            onClick={onLinkClick}
          >
            {item.icon && <item.icon className="h-5 w-5" />}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t theme-border">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
            </div>
            <div>
                <p className="font-semibold text-sm theme-text-primary">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs theme-text-muted">{user?.email}</p>
            </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium theme-text-secondary w-full mt-4 hover:theme-bg-secondary">
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default PortalSidebar;