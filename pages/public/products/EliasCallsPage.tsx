import React from 'react';
import { Phone, Calendar, Zap, Bot, ArrowRight, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: UserPlus, title: "Calificación de Clientes Potenciales", description: "Filtre automáticamente las llamadas entrantes para identificar y priorizar a los clientes con mayor potencial." },
  { icon: Calendar, title: "Agendamiento Automático", description: "La IA coordina y agenda reuniones directamente en su calendario, eliminando la gestión manual." },
  { icon: Bot, title: "Respuestas a Preguntas Frecuentes", description: "Proporcione información básica como horarios, dirección o servicios, liberando a su personal." },
  { icon: Zap, title: "Recordatorios de Citas", description: "Reduzca las ausencias con recordatorios de citas automáticos y personalizables por voz." },
];

const EliasCallsPage = () => {
  return (
    <div className="theme-bg-secondary">
      {/* Hero */}
      <section className="py-20 theme-bg-card border-b theme-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold uppercase theme-accent">ELIAS LLAMADAS</span>
            <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mt-4 mb-6">No Pierda Ni un Cliente Más por una Llamada no Atendida</h1>
            <p className="text-lg theme-text-secondary mb-8">
              Nuestro asistente de voz con IA atiende, califica y agenda clientes 24/7 con una voz hiperrealista. Potenciado por la tecnología de Retell AI.
            </p>
            <Link to="/contacto">
              <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-bold hover:shadow-xl transition-all inline-flex items-center">
                  Probar Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
             <Phone className="h-64 w-64 text-green-500" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary">Convierta cada llamada en una oportunidad</h2>
            <p className="mt-4 text-lg theme-text-secondary">Automatice su primera línea de comunicación.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 theme-bg-card rounded-lg border theme-border">
                <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <feature.icon className="h-6 w-6 text-green-500" />
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

export default EliasCallsPage;