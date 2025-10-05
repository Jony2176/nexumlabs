
import React from 'react';
import { MessageSquare, Phone, Calendar } from 'lucide-react';
import SupportOption from '../components/support/SupportOption';

const SupportPage: React.FC = () => {
  return (
      <div className="min-h-full theme-bg-secondary p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center">
            <h1 className="text-3xl font-bold theme-text-primary">
              Centro de Soporte
            </h1>
            <p className="theme-text-secondary mt-2">
              Estamos aquí para ayudarte 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SupportOption 
              icon={MessageSquare}
              title="Crear Ticket"
              description="Reporta un problema o solicita ayuda detallada a nuestro equipo técnico."
              action="Crear Ticket"
            />
            <SupportOption 
              icon={Phone}
              title="Chat en Vivo"
              description="Habla en tiempo real con un especialista de soporte para resolver dudas rápidas."
              action="Iniciar Chat"
            />
            <SupportOption 
              icon={Calendar}
              title="Agendar Llamada"
              description="Programa una videollamada con un experto para una demostración o soporte complejo."
              action="Agendar"
            />
          </div>
        </div>
      </div>
  );
};

export default SupportPage;