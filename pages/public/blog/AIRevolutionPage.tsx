
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../../components/ui/Button';
import SEO from '../../../components/seo/SEO';

// Helper component for styled sections
const BlogSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 border-l-4 border-primary pl-4">{title}</h2>
    <div className="space-y-4 text-text-secondary leading-relaxed">{children}</div>
  </section>
);

const AIRevolutionPage: React.FC = () => {
  const pageTitle = "Cómo la IA está revolucionando los estudios jurídicos en Argentina [2025]";
  const pageDescription = "El sector legal es, por naturaleza, un ámbito conservador. Descubra cómo la IA ya no es el futuro, sino el presente competitivo del derecho en Argentina y cómo puede transformar su estudio.";
  const pageImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const keywords = "inteligencia artificial para abogados en Argentina, software legaltech para estudios jurídicos Buenos Aires, automatización de procesos legales en Argentina, herramientas IA para derecho en Córdoba, transformación digital en estudios de abogados, optimizar gestión de casos con tecnología legal";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDescription,
    "image": pageImage,
    "datePublished": "2025-09-23T09:00:00Z",
    "dateModified": "2025-09-23T09:00:00Z",
    "author": {
      "@type": "Person",
      "name": "Sol Meza"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NEXUM Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://i.ibb.co/fVJqkRjm/logo-Saa-S-1.png"
      }
    },
    "keywords": keywords
  };

  return (
    <>
      <SEO
        title={`${pageTitle} | NEXUM Labs`}
        description={pageDescription}
        keywords={keywords}
        ogImage={pageImage}
        structuredData={structuredData}
      />
      <div className="theme-bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center text-primary font-semibold mb-8 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a todos los artículos
          </Link>
          <article>
            {/* Header */}
            <header>
              <p className="text-primary font-semibold">Tecnología Legal</p>
              <h1 className="text-4xl md:text-5xl font-bold !mb-4 text-text-primary">
                {pageTitle}
              </h1>
              <p className="text-text-secondary text-lg">
                El sector legal se enfrenta a una transformación ineludible. Descubra cómo la inteligencia artificial ya no es el futuro, sino el presente competitivo del derecho en Argentina.
              </p>
              <div className="flex items-center gap-4 my-6 text-sm text-text-secondary border-t border-b border-border-color py-3 flex-wrap">
                <span>Por <strong>Sol Meza</strong></span>
                <span>•</span>
                <span>Publicado el 23 Sep, 2025</span>
                <span>•</span>
                <span>8 min de lectura</span>
              </div>
            </header>

            {/* Image */}
            <figure className="my-8">
              <img 
                src={pageImage} 
                alt="Gráficos y datos de tecnología legal en una pantalla" 
                className="rounded-lg shadow-lg aspect-video object-cover"
              />
              <figcaption className="text-center text-xs text-text-muted mt-2">La analítica de datos es solo una de las áreas transformadas por la IA en el sector legal.</figcaption>
            </figure>

            {/* Content */}
            <div className="text-lg">
              <BlogSection title="Introducción: El Dilema del Abogado Moderno - ¿Tradición o Transformación?">
                <p>El sector legal es, por naturaleza, un ámbito conservador con prácticas tradicionales muy arraigadas. La resistencia al cambio es comprensible y puede deberse a distintos factores como el desconocimiento, el inmovilismo, o malas experiencias previas con la implementación de nuevas tecnologías. Sin embargo, mientras el sector debate internamente sobre la conveniencia de modernizarse, una transformación ineludible ya ha ocurrido fuera de las paredes del despacho: los clientes han cambiado. Hoy, sus futuros clientes no solo esperan, sino que buscan activamente y comparan servicios legales en línea. La pregunta ya no es si la tecnología llegará al derecho, sino si su estudio está preparado para competir en este nuevo escenario digital.</p>
              </BlogSection>
              
              <BlogSection title="No es una Tendencia Pasajera: La Realidad del Legaltech en Argentina">
                <p>La adopción de tecnología en el ámbito jurídico no es una moda importada ni una visión futurista lejana. Es una realidad tangible que está redefiniendo el mercado local. Según un informe de Thomson Reuters, Argentina, junto a Perú, México y Colombia, se posiciona como uno de los países que más ha impulsado el uso de legaltech en el mercado regional. Esta estadística confirma que la transformación digital no es una opción, sino un movimiento estratégico que sus competidores ya están adoptando para ganar eficiencia y relevancia en el país.</p>
              </BlogSection>

              <BlogSection title="Más Allá de la Ciencia Ficción: Aplicaciones Prácticas de la IA en su Despacho">
                <p>La inteligencia artificial no se trata de robots reemplazando abogados, sino de herramientas inteligentes que potencian sus capacidades. Lejos de ser un concepto abstracto, en el mercado ya existen soluciones concretas que demuestran este potencial. A continuación, se detallan tres áreas donde la IA está generando un impacto medible.</p>

                <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">1. Automatización de Tareas Rutinarias y Repetitivas</h3>
                <p>La IA está liberando a los abogados de tareas de bajo valor que consumen tiempo y recursos valiosos. Herramientas especializadas pueden automatizar procesos clave, permitiendo que los profesionales se concentren en el análisis y la estrategia legal.</p>
                <ul className="list-disc list-inside space-y-2 pl-4 my-4">
                  <li><strong className="text-text-primary">Creación de documentos:</strong> Automatización de tareas rutinarias como la generación de contratos, escritos y otros documentos legales a partir de plantillas inteligentes.</li>
                  <li><strong className="text-text-primary">Seguimiento de procesos judiciales:</strong> Monitoreo automatizado de expedientes para reducir la carga de trabajo manual y minimizar el riesgo de errores humanos.</li>
                </ul>

                <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">2. Investigación y Análisis Jurídico Potenciado</h3>
                <p>La investigación de jurisprudencia y legislación se ha transformado radicalmente. Herramientas de vanguardia en el mercado ya demuestran este potencial.</p>
                <ul className="list-disc list-inside space-y-2 pl-4 my-4">
                  <li><strong className="text-text-primary">Motor de búsqueda legal avanzado:</strong> Plataformas como MiDespacho, por ejemplo, incorporan un sistema de búsqueda inteligente que permite filtrar sentencias y legislación con alta precisión, ahorrando horas de investigación.</li>
                  <li><strong className="text-text-primary">Análisis de jurisprudencia mediante IA:</strong> Esta misma tecnología no solo encuentra documentos, sino que también utiliza IA para generar resúmenes automáticos y hallazgos clave, lo que facilita una toma de decisiones más informada y estratégica.</li>
                </ul>

                <h3 className="text-xl font-bold text-text-primary mt-6 mb-3">3. Gestión Proactiva de Casos y Expedientes</h3>
                <p>La automatización mejora drásticamente la organización y el control de los casos, asegurando que ninguna notificación o plazo importante pase desapercibido.</p>
                <ul className="list-disc list-inside space-y-2 pl-4 my-4">
                  <li><strong className="text-text-primary">Integración con portales judiciales:</strong> La principal fortaleza de herramientas como CaseTracking reside en su integración directa con los portales judiciales, actualizando de forma automática los estados procesales y avisos judiciales.</li>
                  <li><strong className="text-text-primary">Expedientes electrónicos centralizados:</strong> Estas soluciones permiten digitalizar y organizar la documentación de un caso en expedientes electrónicos, mejorando la trazabilidad, el acceso remoto a la información y la colaboración entre los miembros del equipo.</li>
                </ul>
              </BlogSection>

              <BlogSection title="Los Beneficios Estratégicos: Más Eficiencia, Mayor Rentabilidad">
                <ol className="list-decimal list-inside space-y-4">
                  <li><strong className="text-text-primary">Recuperar el Tiempo Valioso:</strong> La automatización reduce drásticamente el tiempo dedicado a tareas administrativas y manuales. Esto libera horas que pueden ser invertidas en el análisis estratégico de los casos, la preparación de argumentos sólidos y, en definitiva, en el trabajo de mayor facturación que define el éxito del estudio.</li>
                  <li><strong className="text-text-primary">Decisiones Basadas en Datos:</strong> La capacidad de herramientas de IA, como las que ofrece MiDespacho, para analizar grandes volúmenes de información legal en minutos, permite tomar decisiones más informadas. Esto se traduce en estrategias legales más robustas y una mayor probabilidad de éxito para sus clientes.</li>
                  <li><strong className="text-text-primary">Modernizar la Relación con el Cliente:</strong> La transformación digital no es solo interna. Optimizar los procesos permite interactuar con los clientes de manera más efectiva y transparente, ofreciendo los servicios ágiles y la comunicación fluida que el mercado actual demanda, fortaleciendo la confianza y la fidelidad.</li>
                </ol>
              </BlogSection>

              <BlogSection title="El Verdadero Costo: ¿Cuánto le Cuesta a su Estudio NO Digitalizarse?">
                <p>La conversación sobre la tecnología a menudo se centra en el costo de la inversión, pero el verdadero riesgo financiero reside en la inacción. En un mercado donde los clientes potenciales inician su búsqueda de representación legal en Google y la competencia directa ya está utilizando herramientas de IA para ser más eficiente, no digitalizarse tiene un costo oculto pero real. Significa perder visibilidad frente a quienes sí están en línea, operar con una estructura de costos menos eficiente y, en definitiva, ceder clientes a estudios que han sabido adaptarse a las nuevas reglas del juego.</p>
              </BlogSection>
            </div>
          </article>
          
          {/* CTA Section */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-xl text-center shadow-2xl">
                <h2 className="text-3xl font-bold">Dé el Salto al Futuro Legal con NEXUM Labs</h2>
                <p className="opacity-90 mt-2 mb-6">Si su estudio jurídico busca mejorar su eficiencia operativa, reducir costos y captar más clientes en el competitivo mercado actual, es el momento de descubrir cómo la inteligencia artificial puede transformar su práctica. Le invitamos a ver estas herramientas en acción, sin compromiso.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register">
                        <Button size="lg" className="font-bold w-full sm:w-auto">
                            Iniciar Prueba Gratuita <ArrowRight className="ml-2 h-5 w-5"/>
                        </Button>
                    </Link>
                     <Link to="/contacto">
                        <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 w-full sm:w-auto">
                            Solicitar Demo
                        </Button>
                    </Link>
                </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AIRevolutionPage;
