import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart, CheckCircle, Users } from 'lucide-react';

const caseStudies = [
  {
    firm: "Estudio Pérez & Asociados",
    location: "Palermo, Buenos Aires",
    logo: "🏢",
    contact: {
      name: "Dr. Juan Pérez",
      title: "Socio Fundador",
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
    },
    challenge: "El equipo dedicaba más del 60% de su tiempo a tareas administrativas repetitivas, quitando foco de los casos complejos y la estrategia.",
    solution: "Implementaron ELIAS WhatsApp para automatizar la captación inicial y el Dashboard Premium para obtener visibilidad total de la operación.",
    quote: "Pasamos de ahogarnos en papeleo a tomar decisiones basadas en datos. NEXUM no solo nos devolvió tiempo, nos dio una ventaja competitiva real.",
    results: [
      { metric: "70%", label: "Reducción Tiempo Admin." },
      { metric: "45%", label: "Aumento en Captación" },
      { metric: "2.5 Meses", label: "Retorno de Inversión" },
      { metric: "180/mes", label: "Consultas Atendidas" }
    ]
  },
  {
    firm: "González Legal",
    location: "Córdoba",
    logo: "🏛️",
    contact: {
      name: "Dra. María González",
      title: "Socia Directora",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
    },
    challenge: "Perdían clientes potenciales valiosos, especialmente fuera de horario, debido a la incapacidad de ofrecer respuestas inmediatas a las consultas.",
    solution: "Integraron ELIAS WhatsApp Bot para garantizar una atención 24/7 y calificar automáticamente las nuevas consultas.",
    quote: "Dejamos de perder dinero. El bot no duerme, no se toma vacaciones y convierte prospectos en clientes mientras nosotros nos enfocamos en ganar casos.",
    results: [
      { metric: "24/7", label: "Respuesta Instantánea" },
      { metric: "80%", label: "Consultas Automatizadas" },
      { metric: "35%", label: "Incremento en Conversión" },
      { metric: "+$12k", label: "Ingresos Adicionales" }
    ]
  },
  {
    firm: "Martinez & Partners",
    location: "Rosario",
    logo: "⚖️",
    contact: {
      name: "Dr. Carlos Martinez",
      title: "Socio Gerente",
      photoUrl: "https://images.unsplash.com/photo-1590650213165-c2618f44c505?w=300&h=300&fit=crop"
    },
    challenge: "Operaban a ciegas, sin métricas claras sobre la productividad del equipo, la rentabilidad por caso o la efectividad de sus canales de captación.",
    solution: "Adoptaron la suite completa de NEXUM, incluyendo el programa de afiliados para diversificar la captación de leads.",
    quote: "NEXUM nos dio el 'cerebro' que le faltaba a nuestro estudio. Ahora cada decisión, desde la asignación de un caso hasta una campaña de marketing, está respaldada por datos.",
    results: [
      { metric: "50%", label: "Mejora en Productividad" },
      { metric: "25%", label: "Reducción Costos Op." },
      { metric: "30%", label: "Leads por Afiliados" },
      { metric: "360°", label: "Visibilidad de KPIs" }
    ]
  },
  {
    firm: "Consultoría Jurídica Digital",
    location: "Mendoza (100% Remoto)",
    logo: "🌐",
    contact: {
      name: "Dra. Laura Fernández",
      title: "Fundadora",
      photoUrl: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=300&h=300&fit=crop"
    },
    challenge: "Como estudio boutique 100% digital, necesitaban proyectar una imagen profesional y tener una capacidad de respuesta similar a la de los grandes estudios.",
    solution: "Utilizaron ELIAS Llamadas y WhatsApp para crear una 'recepción virtual' inteligente y siempre disponible.",
    quote: "Nuestros clientes creen que somos un estudio de 20 personas. La realidad es que somos 3, pero con la potencia de NEXUM. Nos permitió escalar de forma impensada.",
    results: [
      { metric: "5x", label: "Crecimiento de Clientes" },
      { metric: "90%", label: "Satisfacción Cliente" },
      { metric: "24/7", label: "Presencia Profesional" },
      { metric: "3", label: "Provincias de Expansión" }
    ]
  }
];

const CaseStudiesPage: React.FC = () => {
  return (
    <div className="theme-bg-secondary">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Resultados Reales para Estudios Reales</h1>
          <p className="text-xl opacity-90">
            Descubre cómo estudios jurídicos de toda Argentina han transformado 
            su práctica con las soluciones de NEXUM Labs.
          </p>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-6 py-16">
        {/* General Stats */}
        <section className="mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="theme-bg-card rounded-lg p-6 shadow-lg border theme-border">
              <div className="text-4xl font-bold text-blue-500 mb-2">70%</div>
              <div className="theme-text-secondary">Reducción de Tiempo Administrativo</div>
            </div>
            <div className="theme-bg-card rounded-lg p-6 shadow-lg border theme-border">
              <div className="text-4xl font-bold text-green-500 mb-2">45%</div>
              <div className="theme-text-secondary">Aumento en Captación de Clientes</div>
            </div>
            <div className="theme-bg-card rounded-lg p-6 shadow-lg border theme-border">
              <div className="text-4xl font-bold text-purple-500 mb-2">3</div>
              <div className="theme-text-secondary">Meses para ver el Retorno de Inversión</div>
            </div>
            <div className="theme-bg-card rounded-lg p-6 shadow-lg border theme-border">
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="theme-text-secondary">Tasa de Satisfacción del Cliente</div>
            </div>
          </div>
        </section>

        {/* Detailed Cases */}
        <section className="space-y-16">
          {caseStudies.map((study, index) => (
            <div key={index} className="theme-bg-card rounded-xl shadow-xl p-8 lg:p-12 border theme-border overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-12 items-center">
                {/* Firm Info */}
                <div className="text-center lg:text-left">
                  <span className="text-7xl">{study.logo}</span>
                  <h2 className="text-3xl font-bold theme-text-primary mt-4">{study.firm}</h2>
                  <p className="theme-text-secondary">{study.location}</p>
                  <div className="mt-8 flex flex-col items-center lg:items-start">
                      <img src={study.contact.photoUrl} alt={study.contact.name} className="w-20 h-20 rounded-full object-cover mb-4" />
                      <p className="font-semibold theme-text-primary">{study.contact.name}</p>
                      <p className="text-sm theme-text-secondary">{study.contact.title}</p>
                  </div>
                </div>
                
                {/* Details */}
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h3 className="font-semibold text-primary mb-2">EL DESAFÍO</h3>
                    <p className="theme-text-secondary">{study.challenge}</p>
                  </div>
                  <div className="mb-8">
                    <h3 className="font-semibold text-primary mb-2">LA SOLUCIÓN</h3>
                    <p className="theme-text-secondary">{study.solution}</p>
                  </div>
                  <blockquote className="border-l-4 border-primary pl-4 italic theme-text-secondary my-8">
                    "{study.quote}"
                  </blockquote>
                  
                  <h3 className="font-semibold text-primary mb-4">LOS RESULTADOS</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {study.results.map(res => (
                      <div key={res.label} className="theme-bg-secondary p-4 rounded-lg">
                        <p className="text-2xl font-bold theme-text-primary">{res.metric}</p>
                        <p className="text-xs theme-text-muted">{res.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        
        {/* CTA */}
        <section className="text-center mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-xl mb-8">
              Agenda una demostración gratuita y descubre el potencial de NEXUM para tu estudio.
            </p>
            <Link to="/contacto" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all inline-flex items-center">
              Obtén Resultados Similares <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudiesPage;