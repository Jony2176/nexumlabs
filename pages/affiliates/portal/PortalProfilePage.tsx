import React from 'react';
import Card from '../../../components/ui/Card';
import { useAuthStore } from '../../../store/authStore';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PortalProfilePage: React.FC = () => {
    const { user } = useAuthStore();
  
  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mi Perfil</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Actualiza tu información personal y de pago.</p>
      </div>
      
      <Card>
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Información del Afiliado</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input id="firstName" label="Nombre" defaultValue={user?.firstName} disabled />
                    <Input id="lastName" label="Apellido" defaultValue={user?.lastName} disabled />
                </div>
                 <Input id="email" label="Email" type="email" defaultValue={user?.email} disabled />
                 
                 <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Configuración de Pagos</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Esta sección estará disponible próximamente.</p>
                 </div>
            </form>
        </div>
         <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 text-right rounded-b-lg">
            <Button disabled>Guardar Cambios</Button>
        </div>
      </Card>
    </div>
  );
};

export default PortalProfilePage;
