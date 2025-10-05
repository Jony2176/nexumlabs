
import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DemoBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  if (!showBanner) return null;
  
  return (
    <div className="bg-amber-50 border-b border-t border-amber-200 dark:bg-yellow-900/20 dark:border-yellow-700/50 text-amber-900 dark:text-yellow-300 px-4 py-3" role="alert">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-3 text-amber-600" />
          <p className="text-sm font-medium">
            ⚠️ <span className="font-bold">Modo Demo Activo</span> - Backend en configuración.
            <Link to="/app/subscription/change-plan" className="underline ml-2 hover:text-amber-700 dark:hover:text-yellow-200 font-semibold">
                ¡Actualiza tu plan ahora!
            </Link>
          </p>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="p-1 rounded-md hover:bg-amber-200/50 dark:hover:bg-yellow-500/20"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;