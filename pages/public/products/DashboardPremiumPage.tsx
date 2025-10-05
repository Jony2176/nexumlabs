import React from 'react';
import { LayoutDashboard, BarChart3, DollarSign, FolderKanban, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: BarChart3, title: "Analytics Avanzados", description: "Visualice el rendimiento de su estudio en tiempo real: desde la captación de clientes hasta la rentabilidad por caso." },
  { icon: DollarSign, title: "Métricas Financieras", description: "Controle la facturación, los ingresos recurrentes (MRR) y el valor de vida del cliente (LTV) con dashboards intuitivos." },
  { icon: FolderKanban, title: "Gestión de Casos Optimizada", description: "Identifique cuellos de botella, supervise el progreso de los casos y asigne recursos de manera más eficiente." },
  { icon: Users, title: "Rendimiento del Equipo", description: "Mida la productividad de sus abogados, analice la carga de trabajo y tome decisiones basadas en datos para el crecimiento." },
];

const DashboardPremiumPage = () => {
  return (
    <div className="theme-bg-secondary">
      {/* Hero */}
      <section className="py-20 theme-bg-card border-b theme-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold uppercase theme-accent">DASHBOARD PREMIUM</span>
            <h1 className="text-4xl md:text-5xl font-bold theme-text-primary mt-4 mb-6">La Inteligencia de Negocio para su Estudio Jurídico</h1>
            <p className="text-lg theme-text-secondary mb-8">
              Tome decisiones estratégicas basadas en datos. Nuestro Dashboard Premium transforma la información de su estudio en insights accionables para impulsar el crecimiento y la rentabilidad.
            </p>
            <Link to="/contacto">
              <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-bold hover:shadow-xl transition-all inline-flex items-center">
                  Ver en Acción
                  <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
          <div className="flex justify-center">
            <LayoutDashboard className="h-64 w-64 text-purple-500" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold theme-text-primary">Todo lo que Necesita para Gestionar con Éxito</h2>
            <p className="mt-4 text-lg theme-text-secondary">Deje de adivinar y comience a dirigir con precisión.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 theme-bg-card rounded-lg border theme-border">
                <div className="flex-shrink-0 p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <feature.icon className="h-6 w-6 text-purple-500" />
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

export default DashboardPremiumPage;