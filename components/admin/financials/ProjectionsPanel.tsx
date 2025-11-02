
import React from 'react';
import { TrendingUp, Target } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { Progress } from '../../ui/Progress';
import Card from '../../ui/Card';

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
    <Card className="shadow-lg h-full p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Proyecciones y Metas</h3>

      <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 bg-bg-secondary p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                  <p className="font-semibold text-text-primary">Proyección Ingresos Mensuales (12.5% crecimiento)</p>
                  <div className="text-sm text-text-secondary grid grid-cols-3 gap-2 mt-1">
                      <span>3m: <strong className="text-text-primary">{formatCurrency(projections.mrrIn3Months)}</strong></span>
                      <span>6m: <strong className="text-text-primary">{formatCurrency(projections.mrrIn6Months)}</strong></span>
                      <span>12m: <strong className="text-text-primary">{formatCurrency(projections.mrrIn12Months)}</strong></span>
                  </div>
              </div>
          </div>
          <div className="flex items-start gap-4 bg-bg-secondary p-3 rounded-lg">
              <Target className="w-6 h-6 text-green-400 mt-1" />
              <div>
                  <p className="font-semibold text-text-primary">Objetivo Anual ($100k)</p>
                  <p className="text-sm text-text-secondary">Necesitas <strong className="text-text-primary">{projections.clientsForGoal}</strong> clientes para alcanzar la meta (al Ingreso por Cliente actual).</p>
              </div>
          </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">Progreso hacia $100k de Ingresos Mensuales</span>
            <span className="text-sm font-bold text-text-primary">{projections.progressToGoal}%</span>
        </div>
        <Progress value={projections.progressToGoal} />
      </div>

    </Card>
  );
};

export default ProjectionsPanel;