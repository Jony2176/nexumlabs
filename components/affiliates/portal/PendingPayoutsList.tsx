import React from 'react';
import Card from '../../ui/Card';
import { Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface PayoutRequest {
    id: string;
    amount: number;
    method: string;
    status: 'pending' | 'approved';
}

interface PendingPayoutsListProps {
  requests: PayoutRequest[];
}

const statusInfo = {
    pending: { text: 'Pendiente', icon: Clock, className: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400' },
    approved: { text: 'Aprobado', icon: CheckCircle, className: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' }
};

const PendingPayoutsList: React.FC<PendingPayoutsListProps> = ({ requests }) => {
  return (
    <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Solicitudes de Pago</h3>
        {requests.length === 0 ? (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-8">
            No tienes solicitudes de pago pendientes.
          </p>
        ) : (
          <ul className="space-y-3">
            {requests.map(req => {
                const { icon: Icon, text, className } = statusInfo[req.status];
                return (
                    <li key={req.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(req.amount)}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{req.method.replace('_', ' ')}</p>
                        </div>
                        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${className}`}>
                            <Icon className="h-3 w-3 mr-1.5" />
                            {text}
                        </div>
                    </li>
                );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default PendingPayoutsList;