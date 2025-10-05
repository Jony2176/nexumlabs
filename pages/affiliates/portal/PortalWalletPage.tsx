

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Wallet, PaymentConfiguration, Transaction } from '../../../types';
import * as walletApi from '../../../services/walletApi';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import WithdrawButton from '../../../components/affiliates/portal/wallet/WithdrawButton';
import PaymentConfigComponent from '../../../components/affiliates/portal/wallet/PaymentConfiguration';
import TransactionHistory from '../../../components/affiliates/portal/wallet/TransactionHistory';

const PortalWalletPage: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfiguration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [walletData, transactionsData, configData] = await Promise.all([
        walletApi.getWallet(),
        walletApi.getTransactions(),
        walletApi.getPaymentConfig(),
      ]);
      setWallet(walletData);
      setTransactions(transactionsData);
      setPaymentConfig(configData);
    } catch (err) {
      setError('No se pudo cargar la información de la billetera.');
      toast.error('Error al cargar los datos de la billetera.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAutoWithdraw = async () => {
    if (!wallet) return;
    setIsProcessing(true);
    const toastId = toast.loading('Iniciando retiro automático...');

    try {
      const response = await walletApi.requestWithdrawal({
        usd_amount: wallet.balance_usd,
        ars_amount: wallet.balance_ars,
        exchange_rate: wallet.exchange_rate,
      });

      if (response.success) {
        toast.success(`Retiro de ${wallet.balance_ars.toLocaleString('es-AR')} ARS iniciado.`, { id: toastId });
        await loadData(); // Refresh all data
      } else {
        toast.error('No se pudo procesar el retiro.', { id: toastId });
      }
    } catch (err) {
      toast.error('Error de conexión. Intenta nuevamente.', { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
       return (
          <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg">
            {error}
          </div>
        );
  }

  return (
    <div className="space-y-8 animate-slideIn">
      {/* SALDO PRINCIPAL */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mi Billetera Digital</h1>
            <p className="opacity-80 text-sm sm:text-base">Comisiones NEXUM Afiliados</p>
          </div>
          <div className="text-right text-xs sm:text-sm">
            <div className="opacity-70">Actualizado</div>
            <div>{new Date().toLocaleTimeString('es-AR')}</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-4xl sm:text-5xl font-bold mb-2">
            ${wallet?.balance_ars?.toLocaleString('es-AR')} ARS
          </div>
          <div className="text-lg sm:text-xl opacity-90">
            ${wallet?.balance_usd?.toLocaleString('en-US', {minimumFractionDigits: 2})} USD al dólar blue
          </div>
          <div className="text-xs sm:text-sm opacity-70 mt-1">
            Cotización: ${wallet?.exchange_rate?.toLocaleString('es-AR')} ARS por USD
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold">{wallet?.total_referrals || 0}</div>
            <div className="text-xs sm:text-sm opacity-70">Referidos</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">${wallet?.total_earned_usd || 0}</div>
            <div className="text-xs sm:text-sm opacity-70">Total Ganado</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">{wallet?.total_payouts || 0}</div>
            <div className="text-xs sm:text-sm opacity-70">Retiros</div>
          </div>
        </div>

        <WithdrawButton 
          balance={wallet?.balance_usd || 0}
          arsAmount={wallet?.balance_ars || 0}
          isProcessing={isProcessing}
          onWithdraw={handleAutoWithdraw}
        />
      </div>

      {paymentConfig && (
        <PaymentConfigComponent initialConfig={paymentConfig} onSave={loadData} />
      )}

      <TransactionHistory initialTransactions={transactions} />
    </div>
  );
};

export default PortalWalletPage;
