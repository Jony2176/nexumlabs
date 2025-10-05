
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface QuickActionsProps {
  actions: { icon: LucideIcon; label: string; color: string; key: string }[];
}

const colorClasses: { [key: string]: string } = {
    green: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
    blue: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
    gray: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
    orange: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
    slate: 'bg-slate-500/20 text-slate-300 hover:bg-slate-500/30',
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const navigate = useNavigate();

  const handleActionClick = (key: string) => {
    switch (key) {
      case 'add_client':
        navigate('/admin/clients');
        toast.success('Navegando a la gestión de clientes.');
        break;
      case 'bulk_email':
        navigate('/admin/communications');
        break;
      case 'create_discount':
        // FIX: Replaced toast.info with the base toast function, as 'info' is not a standard method in react-hot-toast.
        toast('La creación de descuentos estará disponible próximamente.');
        break;
      case 'export_data':
        // FIX: Replaced toast.info with the base toast function, as 'info' is not a standard method in react-hot-toast.
        toast('La exportación de datos se está generando en segundo plano.');
        break;
      case 'sync_payments':
        toast.loading('Sincronizando pasarelas de pago...');
        setTimeout(() => toast.success('Sincronización completada.'), 2000);
        break;
      case 'settings':
        navigate('/admin/settings');
        break;
      default:
        toast.error('Acción no reconocida.');
    }
  };
    
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button 
            key={index} 
            onClick={() => handleActionClick(action.key)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${colorClasses[action.color] || colorClasses.gray}`}>
            <action.icon className="w-6 h-6 mb-2" />
            <span className="text-xs font-medium text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
