

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Bot, Phone, LayoutDashboard, Zap } from 'lucide-react';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import { MODULES } from '../../constants';
import WaitlistCard from '../../components/features/WaitlistCard';
import { EXTERNAL_ASSETS } from '../../config/assets.config';
// FIX: Imported the Button component to resolve 'Cannot find name' errors.
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useRoleBasedNavigation } from '../../hooks/useRoleBasedNavigation';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Particles: React.FC = () => (
    <div className="particles absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="particle"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${10 + Math.random() * 20}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                }}
            />
        ))}
    </div>
);


const HomePage: React.FC = () => {
    const { isAvailable, getModuleConfig } = useFeatureFlags();


    const testimonials = [
        {
            quote: "Implementamos ELIAS WhatsApp y la satisfacción de nuestros clientes aumentó un 50% por la respuesta inmediata 24/7.",
            name: "Dr. Roberto Martínez",
            firm: "Martínez & Asociados, Buenos Aires"
        },
        {
            quote: "El Panel Premium nos dio una visión 360°. Aumentamos nuestra rentabilidad un 20% en el primer año.",
            name: "Dr. Miguel Fernández",
            firm: "Estudio Corporativo, CABA"
        }
    ];

    const integrations = [
        { name: "WhatsApp Business", logo: "🟢" },
        { name: "MercadoPago", logo: "🔵" },
        { name: "Google Calendar", logo: "📅" },
        { name: "Zoom", logo: "📹" },
        { name: "Slack", logo: "💬" },
        { name: "Mailchimp", logo: "🐵" },
    ];
    
    const launchedProducts = MODULES.filter(m => isAvailable(m.id));
    const upcomingProducts = MODULES.map(m => getModuleConfig(m.id)).filter(mc => mc && mc.status === 'waitlist');

    const getProductPath = (id: string) => {
        if (id === 'dashboard_premium') return 'panel-premium';
        return id.replace('elias_', '').replace('_premium', '');
    }

    return (
        <div className="theme-bg-secondary text-text-primary">
            {/* Hero Section */}
            <section className="hero-section relative text-center py-20 px-6 overflow-hidden min-h-screen flex items-center justify-center">
                <Particles />
                <div className="relative z-10">
                    <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6">Automatiza tu Estudio Jurídico con IA</h1>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                        Reduce el 70% del tiempo administrativo y potencia tu captación de clientes con la suite de inteligencia artificial líder en Latinoamérica.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button size="lg">
                                Prueba Gratis 14 Días
                            </Button>
                        </Link>
                         <Link to="/contacto">
                            <Button size="lg" variant="outline" className="demo-live-btn">
                                Ver Demo en Vivo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="py-8">
                <div className="max-w-screen-2xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-3xl font-bold text-primary">25+</p>
                            <p className="text-text-secondary">Estudios Activos</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-primary">$31k+</p>
                            <p className="text-text-secondary">USD Procesados</p>
                        </div>
                         <div>
                            <p className="text-3xl font-bold text-primary">89</p>
                            <p className="text-text-secondary">Afiliados Activos</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-primary">87%</p>
                            <p className="text-text-secondary">Precisión Predictiva</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16">
                 <div className="max-w-screen-2xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Una Plataforma, Todas las Soluciones</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {launchedProducts.map(product => (
                             <Link to={`/productos/${getProductPath(product.id)}`} key={product.id} className="block group">
                                <div className="card-premium p-6 h-full">
                                    <product.icon className="h-10 w-10 text-nexum-primary mb-4"/>
                                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                                    <p className="text-text-secondary">{product.description}</p>
                                </div>
                            </Link>
                        ))}
                         {upcomingProducts.map(moduleConfig => moduleConfig && (
                           <WaitlistCard key={moduleConfig.id} moduleConfig={moduleConfig} />
                        ))}
                    </div>
                 </div>
            </section>

             {/* Benefits Section */}
            <section className="py-16 bg-nexum-dark dark border-y border-gray-700">
                <div className="max-w-screen-2xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        <h2 className="text-4xl font-bold mb-6">Resultados, no promesas.</h2>
                        <p className="opacity-90 mb-6">NEXUM no es solo software, es tu socio estratégico para el crecimiento. Nuestros clientes experimentan mejoras medibles desde el primer mes.</p>
                        <ul className="space-y-4 opacity-90">
                            <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-green-500"/><span>Atención 24/7 y calificación automática de clientes.</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-green-500"/><span>Ahorro promedio del 70% en tiempo administrativo.</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-green-500"/><span>Incremento del 40% en captación de casos viables.</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6 text-green-500"/><span>Retorno de la inversión (ROI) visible en menos de 3 meses.</span></li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <img src={EXTERNAL_ASSETS.logos.default} alt="NEXUM Dashboard" className="rounded-lg shadow-2xl w-full max-w-md"/>
                    </div>
                </div>
            </section>
            
            {/* Testimonials */}
            <section className="py-16">
                 <div className="max-w-5xl mx-auto px-6 text-center">
                     <h2 className="text-4xl font-bold mb-12">Lo que dicen nuestros clientes</h2>
                     <div className="space-y-8">
                         {testimonials.map((t, i) => (
                             <blockquote key={i} className="card-premium p-6">
                                 <p className="text-lg italic text-text-secondary">"{t.quote}"</p>
                                 <footer className="mt-4 font-semibold">{t.name}, <span className="text-text-secondary font-normal">{t.firm}</span></footer>
                             </blockquote>
                         ))}
                     </div>
                 </div>
            </section>
            
             {/* Integrations */}
            <section className="py-16">
                <div className="max-w-screen-2xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">Se Integra con tus Herramientas</h2>
                    <p className="text-text-secondary mb-8">NEXUM se conecta con el software que ya usas.</p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {integrations.map(int => <div key={int.name} className="flex items-center gap-2 text-lg font-medium text-text-secondary"><span className="text-2xl">{int.logo}</span> {int.name}</div>)}
                    </div>
                </div>
            </section>


            {/* Final CTA */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-xl text-center shadow-2xl">
                        <h2 className="text-3xl font-bold">Comienza Hoy y Ahorra 50%</h2>
                        <p className="opacity-90 mt-2 mb-6">Oferta por tiempo limitado para early adopters. Transforma tu estudio jurídico ahora.</p>
                        <Link to="/register">
                            <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-bold transition-colors">
                                Empezar mi Prueba Gratuita <ArrowRight className="ml-2 h-5 w-5"/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;