import React from 'react';
import { AlertData } from '../../../types';
import { AlertCircle, CheckCircle, Info, Bell } from 'lucide-react';
import Card from '../../ui/Card';

interface AlertsPanelProps {
  alerts: AlertData[];
}

const alertConfig = {
    error: { icon: AlertCircle, color: 'text-red-400' },
    warning: { icon: AlertCircle, color: 'text-yellow-400' },
    success: { icon: CheckCircle, color: 'text-green-400' },
    info: { icon: Info, color: 'text-blue-400' },
};

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <Card className="p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2"><Bell size={18}/> Alertas y Notificaciones</h3>
      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const { icon: Icon, color } = alertConfig[alert.type];
          return (
            <div key={index} className="flex items-start gap-3">
              <Icon className={`w-5 h-5 mt-1 flex-shrink-0 ${color}`} />
              <div>
                <p className="font-semibold text-text-primary">{alert.title}</p>
                <p className="text-sm text-text-secondary">{alert.description}</p>
                {alert.action && (
                  <button className="text-xs text-blue-400 hover:underline mt-1">{alert.action.label}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AlertsPanel;