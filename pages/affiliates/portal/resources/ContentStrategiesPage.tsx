import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Video, Share2, Mail, Award } from 'lucide-react';
import Card from '../../../../components/ui/Card';

const ContentStrategiesPage: React.FC = () => {
  const strategies = [
    {
      icon: Edit3,
      title: 'Artículos de Blog Optimizados (SEO)',
      description: 'Crea contenido que responda a las preguntas y necesidades de tu audiencia. Un buen posicionamiento en Google te traerá tráfico calificado de forma constante.',
      ideas: [
        'Review Completa: "Analizamos NEXUM Platform: ¿La mejor herramienta para abogados en 2025?"',
        'Comparativa: "NEXUM vs. [Competidor]: ¿Cuál es mejor para tu estudio jurídico?"',
        'Resolución de Problemas: "Cómo automatizar la captación de clientes en tu estudio con IA"',
        'Listado: "5 herramientas de IA que todo abogado debería conocer"',
      ],
    },
    {
      icon: Video,
      title: 'Video Marketing Atractivo',
      description: 'El video es el formato con mayor engagement. Muestra la plataforma en acción para generar confianza y demostrar su valor de forma clara y directa.',
      ideas: [
        'Tutorial: "Primeros pasos con ELIAS WhatsApp: Configuración en 5 minutos"',
        'Demostración: "Viendo en vivo cómo ELIAS Llamadas agenda una cita"',
        'Entrevista: "Hablamos con un abogado que triplicó sus consultas gracias a NEXUM"',
        'Shorts/Reels: "Un tip de 30 segundos para mejorar la gestión de tu estudio"',
      ],
    },
    {
      icon: Share2,
      title: 'Redes Sociales (LinkedIn es Clave)',
      description: 'LinkedIn es la red social profesional por excelencia para llegar a abogados y dueños de estudios. Aporta valor y construye tu autoridad en el sector.',
      ideas: [
        'Publica casos de éxito (anónimos) y cómo NEXUM ayudó a resolverlos.',
        'Comparte estadísticas del sector legal y cómo la IA está impactando.',
        'Crea encuestas: "¿Cuál es el mayor cuello de botella en tu estudio?" y luego presenta la solución.',
        'Participa en grupos de abogados aportando valor antes de promocionar.',
      ],
    },
    {
      icon: Mail,
      title: 'Email Marketing y Newsletters',
      description: 'Si tienes una lista de suscriptores, el email es un canal directo y efectivo para comunicar los beneficios de NEXUM. Segmenta tu lista para enviar mensajes más relevantes.',
      ideas: [
        'Incluye un banner o una sección fija sobre NEXUM en tu newsletter semanal.',
        'Envía un email dedicado explicando cómo resolviste un problema con la plataforma.',
        'Ofrece un bonus exclusivo (ej. una guía tuya) a quienes se registren con tu enlace.',
        'Crea una secuencia de emails automatizada para educar sobre la legal tech.',
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <Link to="/portal/resources" className="flex items-center text-sm theme-accent hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Recursos
        </Link>
        <h1 className="text-3xl font-bold theme-text-primary">Estrategias de Marketing de Contenidos</h1>
        <p className="theme-text-secondary mt-1">Aprende a crear contenido de valor que atraiga, convenza y convierta a tu audiencia.</p>
      </div>

      <div className="space-y-6">
        {strategies.map((strategy, index) => (
          <Card key={index}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                  <strategy.icon className="h-6 w-6 text-primary-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold theme-text-primary">{strategy.title}</h2>
                  <p className="text-sm theme-text-secondary">{strategy.description}</p>
                </div>
              </div>
              <div>
                <h3 className="text-md font-semibold theme-text-primary mb-2">💡 Ideas de Contenido:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm theme-text-secondary">
                  {strategy.ideas.map((idea, i) => (
                    <li key={i}>{idea}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
       <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="p-6 flex items-center gap-6">
                 <div className="p-4 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                  <Award className="h-8 w-8 text-primary-500" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold theme-text-primary">Pro Tip: La Regla 80/20</h2>
                    <p className="theme-text-secondary mt-1">
                        Dedica el 80% de tu contenido a aportar valor y educar a tu audiencia sobre sus problemas, y solo el 20% a promocionar directamente NEXUM como la solución. Esto construye confianza y autoridad, resultando en conversiones de mayor calidad a largo plazo.
                    </p>
                </div>
            </div>
        </Card>

    </div>
  );
};

export default ContentStrategiesPage;