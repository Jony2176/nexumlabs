import React from 'react';
import { BrainCircuit, MessageSquare, Book, Shield, BarChart, ArrowRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: UserCheck, title: "Consultas Especializadas", description: "Responde preguntas complejas sobre áreas específicas del derecho, actuando como un socio experto para su equipo." },
  { icon: Book, title: "Base de Conocimiento Legal", description: "Integre sus documentos, jurisprudencia y manuales para crear una fuente de verdad instantánea y consultable." },
  { icon: BrainCircuit, title: "Personalización y Entrenamiento", description: "Adaptamos y entrenamos al avatar para que conozca las particularidades y el tono de comunicación de su estudio." },
  { icon: Shield, title: "Seguridad y Confidencialidad", description: "Toda la información y las consultas están encriptadas y se manejan con los más altos estándares de seguridad de datos." },
];

const AvatarPartnerPage = () => {
  return (
    <div className="theme-bg-secondary">
      {/* Hero */}
      <section className="py-20 theme-bg-card border-b theme-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold uppercase theme-accent">ELIAS AVATAR PARTNER</span>
            <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mt-4 mb-6">Su Socio Legal de IA, Disponible 24/7</h1>
            <p className="text-lg theme-text-secondary mb-8">
              Potencie a su equipo con un avatar de IA especializado que ofrece consultas legales precisas, analiza documentos y actúa como un socio experto siempre disponible.
            </p>
            <Link to="/contacto">
              <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-bold hover:shadow-xl transition-all inline-flex items-center">
                  Solicitar una Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <UserCheck className="h-64 w-64 text-blue-500" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary">Funcionalidades Clave</h2>
            <p className="mt-4 text-lg theme-text-secondary">Diseñado para la excelencia legal.</p>
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

    </div>
  );
};

export default AvatarPartnerPage;