
import React from 'react';
import Card from '../ui/Card';
import { JURISPREDICT_MOCK_DATA } from '../../data/jurispredictMockData';

const PredictionResults: React.FC = () => {
  const prediction = JURISPREDICT_MOCK_DATA.casos_analizados[0];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold theme-text-primary mb-4">Predicción del Caso</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium theme-text-secondary">Probabilidad de Éxito</span>
            <span className="text-2xl font-bold text-green-500">{prediction.probabilidad_exito}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{width: `${prediction.probabilidad_exito}%`}}></div>
          </div>
          <p className="text-xs theme-text-muted mt-1">Basado en {prediction.casos_similares} casos similares</p>
        </div>

        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Monto Estimado</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-300">
            ${prediction.monto_estimado.min.toLocaleString('es-AR')} - ${prediction.monto_estimado.max.toLocaleString('es-AR')}
          </p>
          <p className="text-xs theme-text-muted">Rango de confianza 95%</p>
        </div>

        <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
          <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Tiempo Estimado</p>
          <p className="text-xl font-bold text-orange-600 dark:text-orange-300">{prediction.tiempo_estimado}</p>
          <p className="text-xs theme-text-muted">Promedio para {prediction.tribunal}</p>
        </div>
      </div>
    </Card>
  );
};

export default PredictionResults;