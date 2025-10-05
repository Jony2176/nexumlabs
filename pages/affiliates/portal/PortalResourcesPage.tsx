import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FileText, Video, Zap, Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockResources = [
  {
    type: 'Guía PDF',
    title: 'Guía de Inicio Rápido para Afiliados',
    description: 'Todo lo que necesitas saber para empezar a ganar comisiones con NEXUM en menos de 10 minutos.',
    icon: FileText,
    link: '/portal/resources/quick-start-guide'
  },
  {
    type: 'Video Tutorial',
    title: 'Maximizando tus Enlaces de Afiliado',
    description: 'Aprende a usar el generador de URLs y las campañas para rastrear tu rendimiento de forma efectiva.',
    icon: Video,
    link: '/portal/resources/maximizing-links'
  },
  {
    type: 'Estrategia',
    title: 'Estrategias de Marketing de Contenidos',
    description: 'Ideas y ejemplos sobre cómo promocionar NEXUM en tu blog, newsletter o redes sociales.',
    icon: Zap,
    link: '/portal/resources/content-strategies'
  },
  {
    type: 'Caso de Éxito',
    title: 'Audiencia Objetivo y Propuesta de Valor',
    description: 'Comprende a quién te diriges y cómo presentar los beneficios de NEXUM para lograr más conversiones.',
    icon: Target,
    link: '/portal/resources/target-audience'
  }
];

type ResourceCardProps = (typeof mockResources)[0];

const ResourceCard: React.FC<ResourceCardProps> = ({ icon: Icon, type, title, description, link }) => {
    const navigate = useNavigate();
    return (
        <Card className="flex flex-col p-6 hover:shadow-lg hover:border-primary-500/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                    <Icon className="h-6 w-6 text-primary-500" />
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
                    {type}
                </span>
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <Button 
                variant="outline" 
                className="mt-6 w-full"
                onClick={() => navigate(link)}
            >
                Acceder al Recurso
                <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
        </Card>
    );
};


const PortalResourcesPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Recursos para Afiliados</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Guías, tutoriales y consejos para maximizar tus ganancias.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
};

export default PortalResourcesPage;