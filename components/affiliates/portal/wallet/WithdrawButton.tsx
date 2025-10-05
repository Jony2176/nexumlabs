
import React from 'react';
import LoadingSpinner from '../../../ui/LoadingSpinner';

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
      <div className="bg-black/20 text-center py-4 px-6 rounded-lg opacity-80">
        <div className="font-semibold">Mínimo para retirar: ${MIN_WITHDRAWAL_USD} USD</div>
        <div className="text-sm">Te faltan ${(MIN_WITHDRAWAL_USD - balance).toFixed(2)} USD</div>
      </div>
    );
  }

  return (
    <button
      onClick={onWithdraw}
      disabled={isProcessing}
      className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
    >
      {isProcessing ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-3">Procesando retiro...</span>
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
