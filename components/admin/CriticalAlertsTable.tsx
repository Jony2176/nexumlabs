import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/badge';
import Button from '../ui/Button';
import { AlertTriangle, XCircle, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface CriticalAlertsTableProps {
    data: Array<{
        id: string;
        event_type: string;
        severity: string;
        message: string;
        created_at: string;
    }>;
}

const CriticalAlertsTable: React.FC<CriticalAlertsTableProps> = ({ data }) => {
  const getSeverityIcon = (severity: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      critical: <AlertTriangle className="h-4 w-4 text-red-600" />,
      error: <XCircle className="h-4 w-4 text-orange-600" />,
      warning: <AlertCircle className="h-4 w-4 text-yellow-600" />,
      info: <Info className="h-4 w-4 text-blue-600" />,
    };
    return icons[severity] || icons.info;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Alertas Críticas</h3>
        {data.length > 0 && (
          <Badge variant="destructive">{data.length} pendiente{data.length > 1 ? 's' : ''}</Badge>
        )}
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-500">No hay alertas críticas</p>
        </div>
      ) : (
        <div className="space-y-2">
          {data.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-start gap-3 p-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10"
            >
              <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{alert.event_type}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(alert.created_at).toLocaleString('es-AR', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {alert.message}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Resolver
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CriticalAlertsTable;
