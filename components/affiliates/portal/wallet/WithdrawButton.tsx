
import React from 'react';
import LoadingSpinner from '../../../ui/LoadingSpinner';
import { AlertTriangle } from 'lucide-react';

interface WithdrawButtonProps {
  balance: number;
  arsAmount: number;
  isProcessing: boolean;
  onWithdraw: () => void;
}

const WithdrawButton: React.FC<WithdrawButtonProps> = ({ balance, arsAmount, isProcessing, onWithdraw }) => {
  const MIN_WITHDRAWAL_USD = 50;

  if (balance < MIN_WITHDRAWAL_USD) {
    return (
      <div className="bg-blue-900/40 border border-blue-700/50 text-blue-100 text-center py-4 px-6 rounded-lg">
        <div className="font-semibold flex items-center justify-center gap-2">
            Mínimo para retirar: ${MIN_WITHDRAWAL_USD} USD
        </div>
        <div className="text-sm opacity-90 mt-1">Te faltan ${(MIN_WITHDRAWAL_USD - balance).toFixed(2)} USD</div>
      </div>
    );
  }

  return (
    <button
      onClick={onWithdraw}
      disabled={isProcessing}
      className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
    >
      {isProcessing ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
          <span>Procesando retiro...</span>
        </div>
      ) : (
        <div className="text-center">
          <div>Retirar ${arsAmount?.toLocaleString('es-AR')} ARS</div>
          <div className="text-sm font-normal opacity-70">${balance.toFixed(2)} USD al cambio actual</div>
        </div>
      )}
    </button>
  );
};

export default WithdrawButton;
