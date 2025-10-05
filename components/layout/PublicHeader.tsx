
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { ThemeContext } from '../../context/ThemeContext';
import { Menu, X } from 'lucide-react';

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
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
      ) : (
        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path></svg>
      )}
    </button>
  );
};


const PublicHeader: React.FC = () => {
    const { isAuthenticated, user } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinkClass = "text-sm font-medium text-gray-300 hover:text-white transition-colors";
    const dashboardPath = user?.role === 'affiliate' ? '/portal/dashboard' : '/app/dashboard';

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <Logo className="h-16 w-auto" />
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map(item => (
                            <NavLink key={item.name} to={item.path} className={({isActive}) => `${navLinkClass} ${isActive ? 'text-white' : ''}`}>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
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
                                    <Link to="/login">
                                        <Button variant="ghost" className="text-gray-300 hover:text-white">Iniciar Sesión</Button>
                                    </Link>
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
                                <Link to="/login">
                                    <Button size="sm">Acceder</Button>
                                </Link>
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
