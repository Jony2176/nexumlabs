
import React, { useContext } from 'react';
import { Search, Menu } from 'lucide-react';
import TimeDisplay from '../ui/TimeDisplay';
import dollarBlueService from '../../services/dollarBlueService';
import { ThemeContext } from '../../context/ThemeContext';
import NotificationCenter from './NotificationCenter';
import { useAuthStore } from '../../store/authStore';

const ThemeToggle = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    // Return a disabled or placeholder button if context is not available
    return (
      <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800" disabled>
        <div className="w-5 h-5"></div>
      </button>
    );
  }
  
  const { theme, toggleTheme } = context;
  
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      style={{
        backgroundColor: theme === 'dark' ? '#374151' : '#E5E7EB'
      }}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {/* Círculo deslizante */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === 'dark' 
            ? 'left-7 bg-gray-700' 
            : 'left-1 bg-white'
        }`}
      >
        {/* Iconos */}
        {theme === 'dark' ? (
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
    </button>
  );
};

const DollarRateDisplay: React.FC = () => {
    const [rate, setRate] = React.useState<number | null>(null);
    React.useEffect(() => {
        const fetchRate = async () => {
            const currentRate = await dollarBlueService.getCurrentRate();
            if (currentRate) {
                setRate(currentRate.sell);
            }
        };
        fetchRate();
        const interval = setInterval(fetchRate, 5 * 60 * 1000); // Update every 5 mins
        return () => clearInterval(interval);
    }, []);

    if (!rate) return null;

    return (
        <div className="hidden sm:flex items-center text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded-md font-semibold">
            Dólar Blue: ${rate.toLocaleString('es-AR')}
        </div>
    );
};


interface HeaderProps {
    onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore();
    
  return (
    <header className="h-20 bg-bg-secondary/30 dark:bg-nexum-dark/50 backdrop-blur-xl border-b border-border-color dark:border-nexum-border px-6 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        {onMenuClick && (
            <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-nexum-surface">
                <Menu className="w-6 h-6 theme-text-secondary" />
            </button>
        )}
        <TimeDisplay />
        <DollarRateDisplay />
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-64 px-4 py-2 pl-10 bg-bg-secondary dark:bg-nexum-surface border theme-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notifications Dropdown */}
        <NotificationCenter />
        
        {/* User Menu */}
        <button className="flex items-center gap-3 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-nexum-surface">
          <div className="w-9 h-9 bg-gradient-to-br from-nexum-gradient-start to-nexum-gradient-end rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;