import React from 'react';
import { ArrowRight } from 'lucide-react';

const faqs = [
    { 
        q: "¿Puedo cambiar de plan en cualquier momento?", 
        a: "Sí, puedes hacer upgrade o downgrade cuando quieras desde tu panel de facturación. Los cambios se prorratean automáticamente para que solo pagues la diferencia."
    },
    { 
        q: "¿Qué pasa si excedo los límites de mi plan (ej. conversaciones, minutos)?", 
        a: "Te notificaremos cuando te estés acercando a tu límite. Los excedentes se facturan a una tarifa transparente por unidad, la cual puedes consultar en tu panel. También puedes hacer un upgrade de plan en cualquier momento."
    },
    { 
        q: "¿Cómo funciona el descuento anual?", 
        a: "Al elegir el plan anual, pagas por 10 meses y obtienes 12 meses de servicio, lo que equivale a un 20% de descuento sobre el precio mensual. El pago es único por adelantado."
    },
    { 
        q: "¿Los precios incluyen impuestos?", 
        a: "No, los precios mostrados no incluyen el IVA (21%) ni otros impuestos aplicables en Argentina, los cuales se agregarán en la factura final."
    },
    { 
        q: "¿Puedo agregar add-ons a cualquier plan?", 
        a: "Los add-ons están diseñados para planes específicos. Por ejemplo, el Dashboard Premium se puede agregar al Plan Professional, pero ya viene incluido en Business y Enterprise."
    },
    { 
        q: "¿Hay costos de instalación o configuración?", 
        a: "No, no hay costos ocultos de instalación. Nuestro equipo te asiste en la configuración inicial sin cargo adicional. Incluimos una sesión de onboarding para que saques el máximo provecho de la plataforma."
    },
];

const PricingFaq: React.FC = () => {
    return (
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="p-4 card-premium group" open={index === 0}>
                            <summary className="font-semibold text-text-primary cursor-pointer list-none flex justify-between items-center">
                                {faq.q}
                                <div className="transition-transform duration-300 group-open:rotate-90">
                                    <ArrowRight className="h-4 w-4 transform -rotate-45" />
                                </div>
                            </summary>
                            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingFaq;