import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// Define the shape of the context value
interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

// Create the context
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Hook personalizado para manejar el tema
const useThemeHook = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar preferencia guardada
    const saved = localStorage.getItem('nexum-theme');
    if (saved) return saved;
    
    // Detectar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Aplicar tema al documento
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Guardar preferencia
    localStorage.setItem('nexum-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};

// Proveedor de contexto para el tema
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeValue = useThemeHook();
  
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
