import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ModuleCardProps {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  isActive?: boolean;
  isTrial?: boolean;
  showStatus?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ id, icon: Icon, title, description, isActive = true, isTrial = false, showStatus = false }) => {
  const navigate = useNavigate();
  
  const handleModuleAction = () => {
    if (!isActive) {
      navigate('/billing');
      return;
    }
    
    switch(id) {
        case 'elias_whatsapp':
            const whatsappNumber = process.env.WHATSAPP_NUMBER || '5491150499608';
            window.open(`https://wa.me/${whatsappNumber}?text=Hola!%20Vengo%20desde%20NEXUM%20Platform`, '_blank');
            break;
        case 'elias_llamadas':
            alert("El módulo de llamadas se está configurando. Será notificado cuando esté listo.");
            break;
        case 'dashboard_premium':
            window.open('https://dashboard-solmeza.com', '_blank');
            break;
        case 'elias_avatar_partner':
            alert("Avatar Partner se activará próximamente.");
            break;
        case 'jurispredict_ai':
            alert("JurisPredict AI estará disponible pronto.");
            break;
        default:
            navigate('/modules');
    }
  };
  
  return (
    <Card className="flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg mb-4">
              <Icon className="h-7 w-7 text-primary-500" />
            </div>
            {showStatus && (
                <div className="flex flex-col items-end space-y-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                        {isActive ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1"/>}
                        {isActive ? 'Activo' : 'Inactivo'}
                    </span>
                    {isActive && isTrial && (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                            <Clock className="h-3 w-3 mr-1" />
                            Trial
                        </span>
                    )}
                </div>
            )}
        </div>
        <h3 className="text-lg font-semibold theme-text-primary">{title}</h3>
        <p className="mt-2 text-sm theme-text-secondary">{description}</p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 rounded-b-lg">
        <Button 
          variant={isActive ? 'default' : 'secondary'} 
          className="w-full" 
          onClick={handleModuleAction}
        >
          {isActive ? 'Acceder al Módulo' : 'Activar Ahora'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default ModuleCard;