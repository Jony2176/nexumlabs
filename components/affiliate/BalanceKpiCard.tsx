import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/badge';
import Button from '../ui/Button';
import { Alert, AlertDescription } from '../ui/alert';
import { Wallet, Download, Info } from 'lucide-react';

interface BalanceKpiCardProps {
  balanceUsd: number;
  balanceArs: number;
  canWithdraw: boolean;
}

const BalanceKpiCard: React.FC<BalanceKpiCardProps> = ({ balanceUsd, balanceArs, canWithdraw }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-green-500/10">
          <Wallet className="h-6 w-6 text-green-600" />
        </div>
        {canWithdraw && (
          <Badge variant="success">Disponible para retiro</Badge>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Balance Disponible</h3>
      
      <div className="mt-2 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${balanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm text-gray-500">USD</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          ${balanceArs.toLocaleString('es-AR')} ARS
        </div>
      </div>
      
      {canWithdraw ? (
        <Button className="w-full mt-4" variant="default">
          <Download className="mr-2 h-4 w-4" />
          Retirar Fondos
        </Button>
      ) : (
        <Alert variant="info" className="mt-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Mínimo para retiro: $50 USD (te faltan ${(50 - balanceUsd).toFixed(2)})
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
};

export default BalanceKpiCard;
