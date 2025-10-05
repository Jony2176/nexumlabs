import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, User, Users, Building, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../../../../components/ui/Card';

const TargetAudiencePage: React.FC = () => {
  const customerProfiles = [
    { icon: User, name: 'Abogado Independiente', description: 'Profesionales que gestionan su propia cartera de clientes y buscan eficiencia y una imagen profesional.' },
    { icon: Users, name: 'Pequeño Estudio Jurídico (2-10 abogados)', description: 'Equipos que necesitan estandarizar procesos, mejorar la captación y liberar tiempo de tareas repetitivas.' },
    { icon: Building, name: 'Estudio Jurídico Mediano (10-50 abogados)', description: 'Firmas en crecimiento que buscan escalar operaciones, obtener métricas claras y optimizar la rentabilidad.' },
  ];
  
  const painPoints = [
    'Pérdida de clientes potenciales por no responder a tiempo (noches, fines de semana).',
    'El personal invierte demasiado tiempo en calificar consultas básicas.',
    'Falta de un proceso estandarizado para la captación y seguimiento de nuevos casos.',
    'Dificultad para medir la efectividad de sus canales de marketing.',
    'Decisiones de negocio basadas en intuición en lugar de datos concretos.',
    'Incapacidad para ofrecer atención 24/7, perdiendo competitividad.',
  ];

  const solutions = [
    { product: 'ELIAS WhatsApp & Llamadas', solution: 'Capturan y califican clientes 24/7, agendando solo las consultas valiosas. Resuelven el problema de la inmediatez.' },
    { product: 'Dashboard Premium', solution: 'Ofrece una visión 360° del rendimiento del estudio, permitiendo tomar decisiones basadas en datos para mejorar la rentabilidad.' },
    { product: 'JurisPredict AI', solution: 'Reduce la incertidumbre al predecir resultados de casos, permitiendo al abogado enfocar sus esfuerzos en los casos con mayor probabilidad de éxito.' },
  ];

  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <Link to="/portal/resources" className="flex items-center text-sm theme-accent hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Recursos
        </Link>
        <h1 className="text-3xl font-bold theme-text-primary">Audiencia Objetivo y Propuesta de Valor</h1>
        <p className="theme-text-secondary mt-1">Conoce a quién le vendes y qué mensaje resonará con ellos para maximizar tus conversiones.</p>
      </div>

      {/* Perfil del Cliente Ideal */}
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
              <Target className="h-6 w-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-semibold theme-text-primary">¿Quién es el Cliente Ideal de NEXUM?</h2>
          </div>
          <p className="theme-text-secondary mb-6">
            Nos dirigimos a profesionales y estudios del sector legal en Latinoamérica que son conscientes de la necesidad de innovar y buscan herramientas tecnológicas para ser más eficientes, rentables y competitivos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {customerProfiles.map((profile, i) => (
              <div key={i} className="theme-bg-secondary p-4 rounded-lg text-center">
                <profile.icon className="h-8 w-8 mx-auto theme-accent mb-2" />
                <h3 className="font-semibold theme-text-primary">{profile.name}</h3>
                <p className="text-xs theme-text-secondary">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Puntos de Dolor */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold theme-text-primary mb-4 flex items-center text-red-500"><AlertCircle className="h-5 w-5 mr-2" />Puntos de Dolor Comunes</h2>
            <ul className="space-y-2 text-sm theme-text-secondary">
              {painPoints.map((item, i) => <li key={i} className="flex items-start"><span className="mr-2 mt-1">🔴</span><span>{item}</span></li>)}
            </ul>
          </div>
        </Card>
        
        {/* Propuesta de Valor */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold theme-text-primary mb-4 flex items-center text-green-500"><CheckCircle className="h-5 w-5 mr-2" />Nuestra Propuesta de Valor</h2>
             <div className="space-y-4">
              {solutions.map((s, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-md theme-text-primary">{s.product}</h3>
                  <p className="text-sm theme-text-secondary">{s.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="p-6">
            <h2 className="text-xl font-semibold theme-text-primary mb-4">Mensajes Clave para tu Comunicación</h2>
            <p className="theme-text-secondary text-sm">Utiliza estas frases en tus contenidos para conectar con tu audiencia:</p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-sm theme-text-secondary">
                <li>"Deja de perder clientes por no atender el teléfono. Automatiza tu captación 24/7."</li>
                <li>"Transforma tu WhatsApp en una máquina de generar consultas calificadas."</li>
                <li>"Toma decisiones basadas en datos, no en intuición. Conoce la rentabilidad real de tu estudio."</li>
                <li>"Aumenta tu tasa de éxito en juicios utilizando IA para predecir los resultados."</li>
            </ul>
        </div>
      </Card>

    </div>
  );
};

export default TargetAudiencePage;