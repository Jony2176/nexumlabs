import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Logo from '../ui/Logo';
import { LogOut, ChevronDown } from 'lucide-react';
import { SIDEBAR_CONFIG_BY_ROLE } from '../../constants';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import FeatureBadge from '../features/FeatureBadge';

interface SidebarProps {
  onLinkClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
    const { user, logout: authLogout } = useAuthStore();
    const navigate = useNavigate();
    const { getStatus, getModuleConfig } = useFeatureFlags();
    const [showComingSoon, setShowComingSoon] = useState(true);

    const menuItems = user ? SIDEBAR_CONFIG_BY_ROLE[user.role] || [] : [];

    const visibleItems = menuItems.filter(item => {
        const status = getStatus(item.id);
        return status === 'available' || status === 'waitlist';
    });

    const hiddenItems = menuItems.filter(item => getStatus(item.id) === 'hidden');

    const handleLogout = () => {
        authLogout();
        navigate('/login');
        if (onLinkClick) {
            onLinkClick();
        }
    };
    
    return (
        <aside className="sidebar-premium">
            <div className="h-20 flex items-center px-6 border-b border-border-color flex-shrink-0">
                <Link to="/">
                    <Logo className="h-16 w-auto" />
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <nav className="space-y-1">
                    {visibleItems.map(item => {
                        const moduleConfig = getModuleConfig(item.id);
                        const status = getStatus(item.id);
                        const isAvailable = status === 'available';

                        return (
                            <NavLink
                                key={item.id}
                                to={isAvailable ? item.path : '/app/modules'}
                                onClick={onLinkClick}
                                className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                                title={!isAvailable ? 'Únete a la lista de espera en la página de Módulos' : ''}
                            >
                                <item.icon className="icon" />
                                <span>{item.label}</span>
                                <div className="ml-auto flex items-center gap-2">
                                  {moduleConfig?.badge && !isAvailable && (
                                      <FeatureBadge 
                                          status={moduleConfig.badge.type} 
                                          text={moduleConfig.badge.text}
                                          animation={moduleConfig.badge.animation}
                                      />
                                  )}
                                  {item.notification && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                                </div>
                            </NavLink>
                        );
                    })}
                </nav>

                {hiddenItems.length > 0 && (
                    <div className="mt-8 pt-4 border-t border-border-color">
                        <button 
                            onClick={() => setShowComingSoon(!showComingSoon)}
                            className="flex items-center justify-between w-full px-3 text-xs font-semibold uppercase text-text-secondary tracking-wider mb-2"
                        >
                            Próximamente
                            <ChevronDown className={`w-4 h-4 transition-transform ${showComingSoon ? 'rotate-180' : ''}`} />
                        </button>
                        {showComingSoon && (
                            <div className="space-y-1">
                                {hiddenItems.map(item => {
                                    const moduleConfig = getModuleConfig(item.id);
                                    return (
                                        <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 cursor-default" title={item.label}>
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                            <div className="ml-auto">
                                                {moduleConfig?.badge && (
                                                    <FeatureBadge 
                                                        status={moduleConfig.badge.type} 
                                                        text={moduleConfig.badge.text}
                                                        animation={moduleConfig.badge.animation}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="p-4 border-t border-border-color flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-nexum-primary to-nexum-secondary rounded-full flex items-center justify-center">
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

export default Sidebar;