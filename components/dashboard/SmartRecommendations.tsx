
import React from 'react';
import { Link } from 'react-router-dom';

const SmartRecommendations: React.FC = () => {
  const recommendations = [
    {
      type: 'upsell',
      message: 'Usas 57% de tus minutos de llamadas',
      action: 'Considera un upgrade para más minutos',
      link: '/app/subscription/change-plan'
    },
    {
      type: 'addon',
      message: 'Tus clientes hacen muchas consultas predictivas',
      action: 'JurisPredict AI sería ideal para ti',
      link: '/app/modules'
    },
    {
      type: 'tip',
      message: 'Excelente tasa de satisfacción (92%)',
      action: '¿Quieres compartir tu testimonio?',
      link: '/contacto'
    }
  ];

  return (
    <div className="theme-bg-card rounded-xl p-6 border theme-border h-full">
      <h2 className="text-xl font-bold mb-4 theme-text-primary">
        🎯 Recomendaciones Inteligentes
      </h2>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex items-start gap-3 text-sm">
            <span className="text-purple-400 mt-1">•</span>
            <div className="flex-1">
              <span className="theme-text-secondary">{rec.message}. </span>
              <Link to={rec.link} className="text-blue-400 hover:text-blue-300 font-medium">
                {rec.action} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;