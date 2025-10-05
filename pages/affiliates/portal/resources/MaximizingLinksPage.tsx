import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Link2, BarChart2, Edit, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';

const MaximizingLinksPage: React.FC = () => {
  const placements = [
    { title: 'Artículos de Blog', description: 'Incrusta tu enlace de forma natural en reseñas, comparativas o tutoriales.' },
    { title: 'Firma de Email', description: 'Una forma sencilla y constante de generar visibilidad con cada correo que envías.' },
    { title: 'Biografía en Redes Sociales', description: 'Especialmente en LinkedIn, es un lugar de alto impacto para tu enlace principal.' },
    { title: 'Páginas de Recursos', description: 'Si tienes una sección de "herramientas recomendadas", NEXUM es un candidato ideal.' },
  ];
  
  const dos = [
    'Sé transparente sobre tu relación de afiliado.',
    'Aporta valor antes de pedir el clic.',
    'Usa campañas para medir qué funciona.',
    'Acorta los enlaces para que sean más amigables.',
  ];
  
  const donts = [
    'No hagas spam con tu enlace en foros o comentarios.',
    'No uses publicidad engañosa o falsas promesas.',
    'No coloques enlaces en sitios de baja calidad.',
    'No te enfoques solo en vender; educa primero.',
  ];

  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <Link to="/portal/resources" className="flex items-center text-sm theme-accent hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Recursos
        </Link>
        <h1 className="text-3xl font-bold theme-text-primary">Maximizando tus Enlaces de Afiliado</h1>
        <p className="theme-text-secondary mt-1">Tu enlace es tu herramienta más importante. Aprende a usarlo como un profesional.</p>
      </div>

      {/* Campaign Tracking */}
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
              <BarChart2 className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold theme-text-primary">El Poder de las Campañas: Mide lo que Importa</h2>
              <p className="text-sm theme-text-secondary">No todos los clics son iguales. Usa el campo "Campaña" en el generador de enlaces para saber exactamente de dónde vienen tus referidos.</p>
            </div>
          </div>
          <div className="theme-bg-secondary p-4 rounded-lg text-sm space-y-2">
            <p><strong>Ejemplo 1:</strong> Si escribes un artículo, tu campaña podría ser <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">review_nexum_mayo24</code>.</p>
            <p><strong>Ejemplo 2:</strong> Para un enlace en tu firma de email, usa <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">firma_email</code>.</p>
            <p className="text-xs theme-text-muted pt-2">Esto te permitirá ver en tus estadísticas qué estrategias te están generando más conversiones y optimizar tus esfuerzos.</p>
          </div>
           <Link to="/portal/urls" className="inline-block mt-4">
              <Button>
                Ir al Generador de Enlaces <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
           </Link>
        </div>
      </Card>

      {/* Link Placement */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold theme-text-primary mb-4">¿Dónde Colocar tus Enlaces?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {placements.map((p, i) => (
              <div key={i} className="theme-bg-secondary p-4 rounded-lg">
                <h3 className="font-semibold theme-text-primary">{p.title}</h3>
                <p className="text-sm theme-text-secondary">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Shorteners */}
       <Card>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
              <Edit className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold theme-text-primary">Acortadores de Enlaces: Estética y Confianza</h2>
              <p className="text-sm theme-text-secondary">Herramientas como <a href="https://bitly.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">Bitly</a> o <a href="https://tinyurl.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">TinyURL</a> hacen tus enlaces más cortos y memorables, lo que aumenta la probabilidad de que la gente haga clic.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold theme-text-primary mb-4 flex items-center text-green-500"><CheckCircle className="h-5 w-5 mr-2" />Buenas Prácticas (Hacer)</h2>
            <ul className="space-y-2 text-sm theme-text-secondary">
              {dos.map((item, i) => <li key={i} className="flex items-start"><span className="mr-2 mt-1">✅</span><span>{item}</span></li>)}
            </ul>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold theme-text-primary mb-4 flex items-center text-red-500"><XCircle className="h-5 w-5 mr-2" />Malas Prácticas (No Hacer)</h2>
            <ul className="space-y-2 text-sm theme-text-secondary">
              {donts.map((item, i) => <li key={i} className="flex items-start"><span className="mr-2 mt-1">❌</span><span>{item}</span></li>)}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MaximizingLinksPage;