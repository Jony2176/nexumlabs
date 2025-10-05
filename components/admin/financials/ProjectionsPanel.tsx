
import React from 'react';
import { TrendingUp, Target } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { Progress } from '../../ui/Progress';

interface Projections {
    mrrIn3Months: number;
    mrrIn6Months: number;
    mrrIn12Months: number;
    clientsForGoal: number;
    progressToGoal: number;
}

interface ProjectionsPanelProps {
  projections: Projections;
}

const ProjectionsPanel: React.FC<ProjectionsPanelProps> = ({ projections }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg h-full p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Proyecciones y Metas</h3>

      <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 bg-gray-900/50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                  <p className="font-semibold text-white">Proyección Ingresos Mensuales (12.5% crecimiento)</p>
                  <div className="text-sm text-gray-400 grid grid-cols-3 gap-2 mt-1">
                      <span>3m: <strong className="text-white">{formatCurrency(projections.mrrIn3Months)}</strong></span>
                      <span>6m: <strong className="text-white">{formatCurrency(projections.mrrIn6Months)}</strong></span>
                      <span>12m: <strong className="text-white">{formatCurrency(projections.mrrIn12Months)}</strong></span>
                  </div>
              </div>
          </div>
          <div className="flex items-start gap-4 bg-gray-900/50 p-3 rounded-lg">
              <Target className="w-6 h-6 text-green-400 mt-1" />
              <div>
                  <p className="font-semibold text-white">Objetivo Anual ($100k)</p>
                  <p className="text-sm text-gray-400">Necesitas <strong className="text-white">{projections.clientsForGoal}</strong> clientes para alcanzar la meta (al Ingreso por Cliente actual).</p>
              </div>
          </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Progreso hacia $100k de Ingresos Mensuales</span>
            <span className="text-sm font-bold text-white">{projections.progressToGoal}%</span>
        </div>
        <Progress value={projections.progressToGoal} />
      </div>

    </div>
  );
};

export default ProjectionsPanel;