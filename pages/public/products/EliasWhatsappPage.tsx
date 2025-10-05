import React from 'react';
import { Bot, Calendar, FileText, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Bot, title: "Atención Inteligente 24/7", description: "Responda y califique consultas de clientes al instante, a cualquier hora del día, los 365 días del año." },
  { icon: Calendar, title: "Agendamiento Automático", description: "ELIAS coordina y agenda reuniones directamente en su calendario, sin intervención manual." },
  { icon: FileText, title: "Recopilación de Documentos", description: "Solicite y reciba de forma segura documentos importantes de sus clientes directamente en el chat." },
  { icon: Shield, title: "Seguridad y Cumplimiento", description: "Operamos con la API oficial de WhatsApp Business (Meta), garantizando la máxima seguridad y confidencialidad." },
];

const EliasWhatsappPage: React.FC = () => {
  return (
    <div className="theme-bg-secondary">
      {/* Hero */}
      <section className="py-20 theme-bg-card border-b theme-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold uppercase theme-accent">ELIAS WHATSAPP</span>
            <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mt-4 mb-6">Su Asistente Legal Virtual en WhatsApp</h1>
            <p className="text-lg theme-text-secondary mb-8">
              Automatice la atención al cliente, califique casos y agende citas con nuestro asistente de IA diseñado exclusivamente para estudios jurídicos.
            </p>
            <Link to="/register">
              <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-bold hover:shadow-xl transition-all inline-flex items-center">
                  Empezar Prueba Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Bot className="h-64 w-64 text-blue-500" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary">Transforme su canal de comunicación más importante</h2>
            <p className="mt-4 text-lg theme-text-secondary">Más eficiencia para su estudio, mejor experiencia para sus clientes.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 theme-bg-card rounded-lg border theme-border">
                <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold theme-text-primary">{feature.title}</h3>
                  <p className="mt-2 theme-text-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="py-20 theme-bg-card border-t theme-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
           <p className="text-2xl font-medium theme-text-primary">"ELIAS WhatsApp no solo nos ahorró incontables horas, sino que mejoró radicalmente nuestra imagen profesional. Ahora captamos clientes que antes se perdían por demoras en la respuesta."</p>
           <div className="mt-6">
                <p className="font-semibold theme-text-primary">Dr. Alejandro Martínez</p>
                <p className="theme-text-secondary">Socio, Martínez & Asociados</p>
           </div>
        </div>
      </section>

    </div>
  );
};

export default EliasWhatsappPage;