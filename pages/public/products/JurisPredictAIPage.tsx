import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExitIntent } from '../../../hooks/useExitIntent';
import ExitIntentPopup from '../../../components/waitlist/ExitIntentPopup';

const JurisPredictAIPage: React.FC = () => {
  const [caseData, setCaseData] = useState({
    type: '',
    amount: '',
  });
  
  const [prediction, setPrediction] = useState<{success: number, amount: string, time: string} | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useExitIntent(() => setIsPopupOpen(true));

  const handleAnalyze = () => {
    if (!caseData.type) {
      // Simple validation
      alert("Por favor, selecciona un tipo de caso.");
      return;
    }
    setPrediction({success: 73, amount: '420,000-680,000', time: '15-20 meses'})
  };

  return (
    <>
      <ExitIntentPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <div className="theme-bg-primary">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="mb-8">
              <span className="bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                🔮 Inteligencia Artificial Avanzada
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              JurisPredict AI
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
              La primera IA que predice el resultado de tus casos judiciales 
              con <span className="text-yellow-300 font-bold">87% de precisión</span>
            </p>
            
            <p className="text-lg mb-12 opacity-80 max-w-3xl mx-auto">
              Transforma la intuición jurídica en ciencia de datos. 
              Toma decisiones estratégicas basadas en análisis predictivo de +50,000 casos argentinos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                  <button className="w-full sm:w-auto bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all">
                  Prueba Gratuita 14 Días
                  </button>
              </Link>
              <Link to="/contacto">
                  <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-all">
                  Ver Demo en Vivo
                  </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 theme-bg-secondary">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 theme-text-primary">
              ¿Cómo JurisPredict AI Revoluciona tu Práctica Legal?
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 theme-text-primary">Análisis Predictivo Preciso</h3>
                <p className="text-lg theme-text-secondary mb-6">
                  Ingresa los datos de tu caso y obtén un análisis completo:
                  probabilidad de éxito, monto estimado, tiempo de resolución
                  y estrategia recomendada.
                </p>
                <ul className="space-y-3 theme-text-primary">
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>87% de precisión en predicciones</li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Análisis en menos de 30 segundos</li>
                  <li className="flex items-center"><span className="text-green-500 mr-3">✓</span>Base en +50,000 casos reales</li>
                </ul>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="theme-bg-card rounded-lg p-6 shadow-xl border theme-border">
                  <h4 className="font-bold mb-4 theme-text-primary">📋 Análisis de Caso #12847</h4>
                  <div className="space-y-3 theme-text-secondary">
                    <div className="flex justify-between"><span>Tipo:</span><span className="font-semibold theme-text-primary">Daños y Perjuicios</span></div>
                    <div className="flex justify-between"><span>Probabilidad Éxito:</span><span className="text-green-600 font-bold">78%</span></div>
                    <div className="flex justify-between"><span>Monto Estimado:</span><span className="font-bold theme-text-primary">$850,000 - $1,200,000</span></div>
                    <div className="flex justify-between"><span>Tiempo Estimado:</span><span className="font-semibold theme-text-primary">18-24 meses</span></div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded mt-4">
                      <p className="text-sm text-blue-800 dark:text-blue-200"><strong>Recomendación:</strong> Proceder con demanda. Casos similares en este tribunal tuvieron éxito en 82% de los casos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 theme-bg-primary">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 theme-text-primary">
              Casos de Uso Reales
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border"><div className="text-4xl mb-4">🚗</div><h3 className="text-xl font-bold mb-4 theme-text-primary">Accidentes de Tránsito</h3><p className="theme-text-secondary mb-4">"JurisPredict AI analizó mi caso de siniestro vial y predijo $750,000 de indemnización. El resultado final fue $820,000."</p><div className="text-sm theme-text-muted">- Dr. Martínez, Especialista en Daños</div></div>
              <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border"><div className="text-4xl mb-4">👨‍⚕️</div><h3 className="text-xl font-bold mb-4 theme-text-primary">Mala Praxis Médica</h3><p className="theme-text-secondary mb-4">"El sistema me advirtió que mi caso tenía solo 34% de probabilidad. Decidí no litigar y me ahorré $200,000 en costos."</p><div className="text-sm theme-text-muted">- Dra. González, Derecho Médico</div></div>
              <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border"><div className="text-4xl mb-4">💼</div><h3 className="text-xl font-bold mb-4 theme-text-primary">Despidos Laborales</h3><p className="theme-text-secondary mb-4">"Analicé 15 casos de despido y JurisPredict AI me ayudó a priorizar los 8 con mayor probabilidad de éxito."</p><div className="text-sm theme-text-muted">- Dr. Pérez, Derecho Laboral</div></div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Prueba JurisPredict AI Ahora</h2>
            <div className="bg-white/10 backdrop-blur rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Ingresa los Datos del Caso</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tipo de Caso</label>
                      <select className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white" value={caseData.type} onChange={(e) => setCaseData({...caseData, type: e.target.value})}>
                        <option value="">Seleccionar...</option><option value="accidente">Accidente de Tránsito</option><option value="laboral">Despido Laboral</option><option value="malapraxis">Mala Praxis Médica</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Monto Reclamado</label>
                      <input type="text" placeholder="$500,000" className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50" value={caseData.amount} onChange={(e) => setCaseData({...caseData, amount: e.target.value})}/>
                    </div>
                    <button className="w-full bg-yellow-500 text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-400 transition-all" onClick={handleAnalyze}>Analizar Caso</button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-6">Resultado del Análisis</h3>
                  {prediction ? (
                    <div className="bg-white/20 rounded-lg p-6"><div className="space-y-4"><div className="flex justify-between items-center"><span>Probabilidad de Éxito:</span><span className="text-2xl font-bold text-green-300">{prediction.success}%</span></div><div className="flex justify-between"><span>Monto Estimado:</span><span className="font-bold">${prediction.amount}</span></div><div className="flex justify-between"><span>Tiempo Estimado:</span><span className="font-bold">{prediction.time}</span></div><div className="bg-green-500/20 p-3 rounded mt-4"><p className="text-sm"><strong>Recomendación:</strong> Proceder con la demanda. Alta probabilidad de éxito según casos similares.</p></div></div></div>
                  ) : (
                    <div className="bg-white/10 rounded-lg p-6 text-center h-full flex items-center justify-center"><p className="text-white/70">Ingresa los datos para ver el análisis predictivo</p></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 theme-bg-secondary">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 theme-text-primary">JurisPredict AI vs Método Tradicional</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="theme-bg-card rounded-lg p-8 shadow-lg border theme-border"><h3 className="text-2xl font-bold mb-6 text-red-600">❌ Método Tradicional</h3><div className="space-y-4"><div className="flex items-start"><span className="text-red-500 mr-3 mt-1">×</span><div><strong>Análisis basado en intuición</strong><p className="text-sm theme-text-muted">Decisiones subjetivas sin datos</p></div></div><div className="flex items-start"><span className="text-red-500 mr-3 mt-1">×</span><div><strong>Investigación manual de precedentes</strong><p className="text-sm theme-text-muted">Horas de búsqueda en jurisprudencia</p></div></div><div className="flex items-start"><span className="text-red-500 mr-3 mt-1">×</span><div><strong>Estimaciones aproximadas</strong><p className="text-sm theme-text-muted">Sin análisis estadístico de montos</p></div></div><div className="flex items-start"><span className="text-red-500 mr-3 mt-1">×</span><div><strong>Tiempo: 4-8 horas por caso</strong><p className="text-sm theme-text-muted">Investigación y análisis manual</p></div></div></div></div>
              <div className="theme-bg-card rounded-lg p-8 shadow-lg border-2 border-green-500"><h3 className="text-2xl font-bold mb-6 text-green-600">✅ Con JurisPredict AI</h3><div className="space-y-4"><div className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span><div><strong>Análisis basado en datos</strong><p className="text-sm theme-text-muted">87% de precisión con 50,000+ casos</p></div></div><div className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span><div><strong>Búsqueda automática de precedentes</strong><p className="text-sm theme-text-muted">IA encuentra casos relevantes al instante</p></div></div><div className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span><div><strong>Predicciones precisas de montos</strong><p className="text-sm theme-text-muted">Rangos estadísticamente validados</p></div></div><div className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span><div><strong>Tiempo: 30 segundos por caso</strong><p className="text-sm theme-text-muted">Análisis instantáneo y completo</p></div></div></div></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JurisPredictAIPage;