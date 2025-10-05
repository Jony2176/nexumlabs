
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionType } from '../../../../types';
import Card from '../../../ui/Card';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionHistoryProps {
  initialTransactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ initialTransactions }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filter, setFilter] = useState<'all' | 'earnings' | 'withdrawals'>('all');

  const filteredTransactions = transactions.filter(t => {
      if (filter === 'all') return true;
      if (filter === 'earnings') return t.type === 'earning';
      if (filter === 'withdrawals') return t.type === 'withdrawal';
      return false;
  });

  const transactionTypeInfo: { [key in TransactionType]: { icon: React.ElementType, label: string, amountClass: string } } = {
      earning: { icon: ArrowDownLeft, label: 'Comisión recibida', amountClass: 'text-green-500 dark:text-green-400' },
      withdrawal: { icon: ArrowUpRight, label: 'Retiro procesado', amountClass: 'text-blue-500 dark:text-blue-400' }
  }

  return (
    <Card>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold text-text-primary">Historial de Transacciones</h3>
          <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {(['all', 'earnings', 'withdrawals'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-white dark:bg-gray-700 text-text-primary shadow' : 'text-text-secondary hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
              >
                {f === 'all' ? 'Todas' : f === 'earnings' ? 'Ingresos' : 'Retiros'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => {
            const { icon: Icon, label, amountClass } = transactionTypeInfo[transaction.type];
            return (
              <div key={transaction.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${amountClass}`} />
                  <div>
                    <p className="text-text-primary font-medium">{label}</p>
                    <p className="text-text-secondary text-xs sm:text-sm">
                      {new Date(transaction.created_at).toLocaleString('es-AR')}
                    </p>
                    <p className="text-text-secondary text-xs hidden sm:block">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${amountClass}`}>
                    {transaction.type === 'earning' ? '+' : '-'}${transaction.amount_ars?.toLocaleString('es-AR')} ARS
                  </p>
                  <p className="text-text-secondary text-xs sm:text-sm">
                    ${transaction.amount_usd.toFixed(2)} USD
                  </p>
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-10">
                <p className="text-text-secondary">No hay transacciones para este filtro.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TransactionHistory;
