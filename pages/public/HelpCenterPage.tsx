import React from 'react';
import { Search, Bot, Phone, CreditCard, Handshake, MessageCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const categories = [
    { name: 'Empezando', icon: Bot, href: '#faq' },
    { name: 'ELIAS WhatsApp', icon: Bot, href: '#faq' },
    { name: 'ELIAS Llamadas', icon: Phone, href: '#faq' },
    { name: 'Facturación y Pagos', icon: CreditCard, href: '#faq' },
    { name: 'Programa de Afiliados', icon: Handshake, href: '#faq' },
    { name: 'Integraciones', icon: Handshake, href: '#faq' },
];

const faqs = [
    {
        q: '¿Cómo integro ELIAS WhatsApp con mi número existente?',
        a: 'Nuestro equipo de soporte te guiará en un proceso simple que toma menos de 10 minutos. Usamos la API oficial de Meta para garantizar la seguridad y estabilidad, por lo que tu número actual se conectará a nuestra plataforma sin problemas.'
    },
    {
        q: '¿Los minutos de ELIAS Llamadas son acumulables?',
        a: 'Los minutos incluidos en tu plan se renuevan mensualmente y no son acumulables. Sin embargo, puedes adquirir paquetes de minutos adicionales en cualquier momento si prevés un mayor volumen de llamadas.'
    },
    {
        q: '¿Qué métodos de pago aceptan en Argentina?',
        a: 'Aceptamos todas las principales tarjetas de crédito y débito a través de MercadoPago. Para planes Enterprise, también ofrecemos la opción de transferencia bancaria en pesos o USD.'
    },
     {
        q: '¿Cómo se rastrean las conversiones de afiliados?',
        a: 'Utilizamos un sistema de cookies de 30 días. Cuando un visitante hace clic en tu enlace de afiliado, se almacena una cookie en su navegador. Si se suscribe a un plan dentro de los 30 días, la comisión se te atribuye automáticamente.'
    },
     {
        q: '¿Tienen garantía de devolución de dinero?',
        a: 'Sí, ofrecemos una garantía de satisfacción de 30 días en todos nuestros planes. Si no estás completamente satisfecho con nuestro servicio en tu primer mes, te devolvemos tu dinero, sin preguntas.'
    },
    {
        q: '¿Puedo cambiar de plan en cualquier momento?',
        a: '¡Por supuesto! Puedes mejorar o reducir tu plan en cualquier momento desde el panel de facturación de tu cuenta. Los cambios se prorratean automáticamente.'
    }
];

const HelpCenterPage: React.FC = () => {
    return (
        <div className="theme-bg-secondary">
            {/* Hero Section */}
            <section className="theme-bg-card border-b theme-border py-20 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold theme-text-primary">Centro de Ayuda</h1>
                    <p className="mt-4 text-lg theme-text-secondary">Encuentra respuestas, guías y tutoriales para sacar el máximo provecho de NEXUM.</p>
                    <div className="mt-8 relative max-w-xl mx-auto">
                        <input
                            type="search"
                            placeholder="Busca en nuestra base de conocimiento..."
                            className="w-full pl-12 pr-4 py-3 rounded-full text-lg"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 theme-text-muted" />
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-20">
                {/* Categories */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold theme-text-primary mb-8 text-center">Explorar por Categoría</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map(cat => (
                            <Link to={cat.href} key={cat.name} className="block p-6 theme-bg-card rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border theme-border text-center">
                                <cat.icon className="h-10 w-10 theme-accent mb-4 mx-auto" />
                                <h3 className="text-md font-semibold theme-text-primary">{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="mb-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold theme-text-primary mb-8 text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                             <details key={i} className="p-4 theme-bg-card rounded-lg border theme-border group">
                                <summary className="font-semibold theme-text-primary cursor-pointer list-none flex justify-between items-center">
                                    {faq.q}
                                    <div className="transition-transform duration-300 group-open:rotate-180">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </summary>
                                <p className="mt-4 text-base theme-text-secondary">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </section>
                
                {/* Contact Support */}
                <section className="theme-bg-card rounded-lg p-8 border theme-border">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold theme-text-primary">¿No encuentras lo que buscas?</h2>
                        <p className="mt-4 text-lg theme-text-secondary">
                            Nuestro equipo de soporte en Buenos Aires está listo para ayudarte.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link to="/contacto">
                                <Button size="lg">
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Contactar Soporte
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline">
                                <BookOpen className="mr-2 h-5 w-5" />
                                Ver Documentación Técnica
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpCenterPage;
