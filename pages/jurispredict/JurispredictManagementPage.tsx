import React from 'react';
import { BrainCircuit, BarChart, Clock, Target } from 'lucide-react';
import MetricCard from '../../components/jurispredict/MetricCard';
import CaseAnalysisPanel from '../../components/jurispredict/CaseAnalysisPanel';
import PredictionResults from '../../components/jurispredict/PredictionResults';
import ExampleCases from '../../components/jurispredict/ExampleCases';
import BetaTestimonials from '../../components/jurispredict/BetaTestimonials';
import WaitlistCTA from '../../components/jurispredict/WaitlistCTA';
import AIModelConfig from '../../components/jurispredict/AIModelConfig';
import { JURISPREDICT_MOCK_DATA } from '../../data/jurispredictMockData';

const JurispredictManagementPage: React.FC = () => {
  const metrics = JURISPREDICT_MOCK_DATA.metricas_globales;

  return (
    <div className="space-y-8 animate-slideIn">
      
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-700 mb-4">
          <BrainCircuit className="w-5 h-5 text-purple-500 dark:text-purple-300" />
          <span className="text-sm font-semibold text-purple-800 dark:text-purple-200">
            MÓDULO EN BETA - MARZO 2026
          </span>
        </div>
        <h1 className="text-3xl font-bold theme-text-primary">JurisPredict AI</h1>
        <p className="theme-text-secondary mt-1">
          Inteligencia Artificial Predictiva para optimizar tus decisiones legales.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={Target}
          title="Precisión del Modelo"
          value={`${metrics.precision_promedio}%`}
          change="vs. Q2 2025"
          color="purple"
        />
        <MetricCard 
          icon={BarChart}
          title="Casos Analizados"
          value={metrics.casos_total.toLocaleString('es-AR')}
          change="+15% este mes"
          color="blue"
        />
        <MetricCard 
          icon={Clock}
          title="Horas Ahorradas"
          value={`~${metrics.tiempo_ahorro_mensual} / mes`}
          change="Promedio por estudio"
          color="green"
        />
        <MetricCard 
          icon={BrainCircuit}
          title="ROI Promedio"
          value={`$${metrics.roi_cliente_promedio.toLocaleString('es-AR')}`}
          change="Por caso ganado"
          color="yellow"
        />
      </div>

      {/* Main Interaction Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CaseAnalysisPanel />
        </div>
        <div>
          <PredictionResults />
        </div>
      </div>
      
      {/* Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <AIModelConfig />
           <ExampleCases />
        </div>
        <div className="lg:col-span-2">
           <BetaTestimonials />
        </div>
      </div>

      <WaitlistCTA 
        product="JurisPredict AI"
        message="Asegura tu acceso prioritario y precio de lanzamiento."
        price="$197/mes (Precio Beta)"
      />

    </div>
  );
};

export default JurispredictManagementPage;
