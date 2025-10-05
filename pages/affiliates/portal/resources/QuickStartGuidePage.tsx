import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, LayoutDashboard, Link2, DollarSign, Target } from 'lucide-react';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';

const QuickStartGuidePage: React.FC = () => {
  const steps = [
    {
      icon: LayoutDashboard,
      title: "Paso 1: Conoce tu Dashboard",
      content: "Tu dashboard es tu centro de control. Aquí verás métricas clave como visitas, conversiones, comisiones pendientes y tu ranking. Familiarízate con estos números para entender tu rendimiento.",
      link: "/portal/dashboard",
      linkText: "Ir a mi Dashboard"
    },
    {
      icon: Link2,
      title: "Paso 2: Tu Enlace de Afiliado Único",
      content: "Este es el enlace que compartirás. Cualquier cliente que se registre a través de él quedará asociado a tu cuenta. Usa el generador de enlaces para crear URLs personalizadas para diferentes campañas y medir su efectividad.",
       link: "/portal/urls",
      linkText: "Generar mi Enlace"
    },
    {
      icon: Target,
      title: "Paso 3: Tus Primeros Pasos para Promocionar",
      content: "No necesitas una gran audiencia para empezar. Comienza con acciones sencillas: comparte tu enlace en tu perfil de LinkedIn, agrégalo a tu firma de email o envíalo a colegas que puedan beneficiarse de NEXUM.",
      link: "/portal/resources/content-strategies",
      linkText: "Ver Estrategias de Contenido"
    },
    {
      icon: DollarSign,
      title: "Paso 4: Entendiendo las Comisiones",
      content: "Ganas un 25% del primer pago de tu referido y un 10% de todos sus pagos recurrentes. Puedes seguir todas tus comisiones generadas en la sección 'Referidos' y gestionar tus pagos en 'Mi Billetara'.",
      link: "/portal/referrals",
      linkText: "Ver mis Referidos"
    }
  ];

  return (
    <div className="space-y-8 animate-slideIn">
      <div>
        <Link to="/portal/resources" className="flex items-center text-sm theme-accent hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a Recursos
        </Link>
        <h1 className="text-3xl font-bold theme-text-primary">Guía de Inicio Rápido para Afiliados</h1>
        <p className="theme-text-secondary mt-1">Tu camino para empezar a ganar comisiones en menos de 10 minutos.</p>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="p-6 flex items-center gap-6">
            <div className="p-4 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                <Rocket className="h-8 w-8 text-primary-500" />
            </div>
            <div>
                <h2 className="text-xl font-semibold theme-text-primary">¡Bienvenido al Programa de Afiliados de NEXUM!</h2>
                <p className="theme-text-secondary mt-1">
                    Estamos emocionados de tenerte a bordo. Esta guía te mostrará todo lo que necesitas para comenzar a tener éxito.
                </p>
            </div>
        </div>
      </Card>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <Card key={index}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                  <step.icon className="h-6 w-6 text-primary-500" />
                </div>
                <h2 className="text-xl font-semibold theme-text-primary">{step.title}</h2>
              </div>
              <p className="theme-text-secondary ml-16 mb-4">{step.content}</p>
              <div className="ml-16">
                 <Link to={step.link}>
                    <Button variant="outline" size="sm">{step.linkText}</Button>
                 </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickStartGuidePage;