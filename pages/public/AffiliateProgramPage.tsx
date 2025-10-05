import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Repeat, Wallet, FileText, ArrowRight, BarChart, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const AffiliateProgramPage: React.FC = () => {
  const [referrals, setReferrals] = useState(10);
  const [currency, setCurrency] = useState<'USD' | 'ARS'>('ARS');
  const avgPlanPrice = 199; // Pro Plan
  const commissionRate = 0.10;
  const arsRate = 1100;

  const monthlyEarnings = referrals * avgPlanPrice * commissionRate;
  const firstMonthBonus = referrals * avgPlanPrice * 0.15; // Extra 15% on first month

  const displayEarnings = currency === 'USD' ? monthlyEarnings : monthlyEarnings * arsRate;
  const displayBonus = currency === 'USD' ? firstMonthBonus : firstMonthBonus * arsRate;

  return (
    <div className="theme-bg-secondary">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Ganá Ingresos Recurrentes Recomendando NEXUM</h1>
          <p className="text-2xl font-bold mb-6">
            <span className="text-yellow-300">25%</span> el primer mes + <span className="text-yellow-300">10%</span> de por vida
          </p>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Únete al programa de afiliados más rentable del sector Legal Tech en Latinoamérica y convierte tu red de contactos en una fuente de ingresos pasivos.
          </p>
          <Link to="/register?role=affiliate" className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-bold hover:shadow-xl transition-all inline-flex items-center">
            Únete Ahora Gratis <ArrowRight className="ml-2 h-5 w-5"/>
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* How It Works */}
        <section className="mb-20 text-center">
            <h2 className="text-4xl font-bold theme-text-primary mb-12">Comienza a Ganar en 3 Simples Pasos</h2>
            <div className="grid md:grid-cols-3 gap-8 theme-text-secondary">
                <div className="p-6"><div className="text-6xl mb-4">1️⃣</div><h3 className="text-xl font-bold mb-3 theme-text-primary">Regístrate</h3><p>Completa el formulario en 60 segundos y obtén tu link de afiliado único.</p></div>
                <div className="p-6"><div className="text-6xl mb-4">2️⃣</div><h3 className="text-xl font-bold mb-3 theme-text-primary">Promociona</h3><p>Comparte tu link y nuestro material de marketing con tu red de contactos.</p></div>
                <div className="p-6"><div className="text-6xl mb-4">3️⃣</div><h3 className="text-xl font-bold mb-3 theme-text-primary">Ganá</h3><p>Cobra tus comisiones en USD o ARS directamente desde tu billetera virtual.</p></div>
            </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
            <h2 className="text-4xl font-bold theme-text-primary mb-12 text-center">Beneficios que Marcan la Diferencia</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { icon: DollarSign, title: "25% Comisión Inicial", text: "Gana hasta $125 USD por cada nuevo cliente en su primer mes." },
                    { icon: Repeat, title: "10% Recurrente de por Vida", text: "Mientras tu referido sea cliente, tú sigues ganando. Para siempre." },
                    { icon: Wallet, title: "Pagos Flexibles", text: "Retira tus ganancias en USD o ARS a través de MercadoPago o transferencia." },
                    { icon: BarChart, title: "Dashboard en Tiempo Real", text: "Monitorea tus clics, conversiones y ganancias con total transparencia." },
                    { icon: FileText, title: "Material de Marketing Pro", text: "Accede a banners, emails y contenido listo para usar y maximizar tus resultados." },
                    { icon: CheckCircle, title: "Cookie de 30 Días", text: "Si tu referido se registra hasta 30 días después, la comisión es tuya." }
                ].map(b => (
                    <div key={b.title} className="theme-bg-card p-6 rounded-lg border theme-border">
                        <b.icon className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2 theme-text-primary">{b.title}</h3>
                        <p className="text-sm theme-text-secondary">{b.text}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Earnings Calculator */}
        <section className="mb-20 theme-bg-card p-8 rounded-xl border theme-border">
            <h2 className="text-4xl font-bold theme-text-primary mb-8 text-center">Calcula tus Ganancias Potenciales</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <label htmlFor="referrals-slider" className="block font-medium theme-text-secondary mb-2">Si refieres <span className="text-2xl font-bold text-primary">{referrals}</span> clientes del Plan Pro:</label>
                    <input id="referrals-slider" type="range" min="1" max="100" value={referrals} onChange={(e) => setReferrals(parseInt(e.target.value))} className="w-full" />
                </div>
                <div className="theme-bg-secondary p-6 rounded-lg text-center">
                    <div className="flex justify-center mb-4"><button onClick={() => setCurrency(c => c === 'USD' ? 'ARS' : 'USD')} className="text-sm theme-text-muted hover:text-primary">Cambiar a {currency === 'USD' ? 'ARS' : 'USD'}</button></div>
                    <p className="theme-text-secondary">Ganarías por mes (recurrente):</p>
                    <p className="text-4xl font-bold text-primary my-2">{formatCurrency(displayEarnings, currency)}</p>
                    <p className="text-sm theme-text-secondary">Y un bonus de <span className="font-bold text-primary">{formatCurrency(displayBonus, currency)}</span> el primer mes.</p>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section>
             <h2 className="text-4xl font-bold theme-text-primary mb-8 text-center">Preguntas Frecuentes</h2>
             <div className="max-w-3xl mx-auto space-y-4">
                 {[
                     { q: "¿Necesito ser cliente de NEXUM para ser afiliado?", a: "No, no es necesario ser cliente. Buscamos a cualquiera que crea en el poder de la automatización para el sector legal." },
                     { q: "¿Cuándo y cómo cobro mis comisiones?", a: "Puedes solicitar un retiro desde tu billetera en cualquier momento, con un mínimo de $50 USD. Los pagos se procesan dentro de las 72hs hábiles." },
                     { q: "¿Hay algún costo para unirse?", a: "No, el programa de afiliados es 100% gratuito." }
                 ].map(f => (
                     <details key={f.q} className="p-4 theme-bg-card rounded-lg border theme-border group">
                        <summary className="font-semibold theme-text-primary cursor-pointer list-none flex justify-between items-center">{f.q}<div className="transition-transform duration-300 group-open:rotate-180"><ArrowRight className="h-4 w-4 -rotate-90"/></div></summary>
                        <p className="mt-4 text-sm theme-text-secondary">{f.a}</p>
                    </details>
                 ))}
             </div>
        </section>
      </div>
    </div>
  );
};

export default AffiliateProgramPage;
