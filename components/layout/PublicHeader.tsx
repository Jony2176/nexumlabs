

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { ThemeContext } from '../../context/ThemeContext';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';

const ThemeToggle = () => {
  const context = React.useContext(ThemeContext);
  if (!context) return null;
  const { theme, toggleTheme } = context;
  
  return (
     <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};


const PublicHeader: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => {
    const { isAuthenticated, user } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navLinkBaseClass = "relative px-3 py-2 text-sm font-medium text-gray-300 transition-transform duration-200 ease-in-out hover:scale-110";
    const navLinkActiveClass = "text-white";
    const navLinkInactiveClass = "hover:text-white";

    const navLinkClass = ({isActive}: {isActive: boolean}) => 
        cn(navLinkBaseClass, isActive ? navLinkActiveClass : navLinkInactiveClass);


    const dashboardPath = user?.role === 'affiliate' ? '/portal' : '/app';

    const navItems = [
        { name: 'Productos', path: '/productos' },
        { name: 'Precios', path: '/precios' },
        { name: 'Casos de Éxito', path: '/casos-exito' },
        { name: 'Blog', path: '/blog' },
        { name: 'Afiliados', path: '/programa-afiliados' },
        { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
    ];

    return (
        <header className="sticky top-0 z-40 w-full bg-gray-900 border-b border-gray-700 dark">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 md:h-24">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex-shrink-0">
                            <Logo className="w-[calc(var(--logo-base-width,150px)*0.8)] md:w-[var(--logo-base-width,150px)] h-auto transition-all duration-300 ease-in-out" variant="white" />
                        </Link>
                        <nav className="hidden md:flex items-center space-x-1">
                            {navItems.map(item => (
                                <NavLink key={item.name} to={item.path} className={navLinkClass}>
                                    {item.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-2">
                        <ThemeToggle />

                        {/* --- Desktop Buttons --- */}
                        <div className="hidden md:flex items-center space-x-2">
                            {isAuthenticated ? (
                                <Link to={dashboardPath}>
                                    <Button>Ir al Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Button variant="ghost" className="btn-login-ghost" onClick={onLoginClick}>
                                        Iniciar Sesión
                                    </Button>
                                    <Link to="/register">
                                        <Button>Registrarse</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                        
                        {/* --- Mobile Buttons --- */}
                        <div className="flex items-center md:hidden">
                            {isAuthenticated ? (
                                <Link to={dashboardPath}>
                                    <Button size="sm">Dashboard</Button>
                                </Link>
                            ) : (
                                <Button size="sm" onClick={onLoginClick}>Acceder</Button>
                            )}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">Abrir menú principal</span>
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                    {!isAuthenticated && (
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="px-2 space-y-2">
                                <Button className="w-full" variant="outline" onClick={() => { onLoginClick(); setIsMenuOpen(false); }}>
                                    Iniciar Sesión
                                </Button>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full">Registrarse Gratis</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default PublicHeader;