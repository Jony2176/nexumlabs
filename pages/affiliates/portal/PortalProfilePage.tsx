
import React from 'react';
import Card from '../../../components/ui/Card';
import { useAuthStore } from '../../../store/authStore';
import Button from '../../../components/ui/Button';

const PortalProfilePage: React.FC = () => {
    const { user } = useAuthStore();
  
  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Actualiza tu información personal y de pago.</p>
      </div>
      
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Información del Afiliado</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Nombre</label>
                        <input 
                            className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 opacity-70 cursor-not-allowed focus:outline-none"
                            value={user?.firstName} 
                            disabled 
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Apellido</label>
                        <input 
                            className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 opacity-70 cursor-not-allowed focus:outline-none"
                            value={user?.lastName} 
                            disabled 
                        />
                    </div>
                </div>
                 <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                    <input 
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 opacity-70 cursor-not-allowed focus:outline-none"
                        value={user?.email} 
                        disabled 
                    />
                 </div>
                 
                 <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configuración de Pagos</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Esta sección se gestiona desde la pestaña "Mi Billetera".</p>
                 </div>
            </form>
        </div>
         <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 text-right rounded-b-lg border-t border-gray-200 dark:border-gray-700">
            <Button disabled className="opacity-50 cursor-not-allowed bg-gray-400 dark:bg-gray-600">Guardar Cambios</Button>
        </div>
      </Card>
    </div>
  );
};

export default PortalProfilePage;
