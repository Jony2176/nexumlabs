
import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import Card from '../../ui/Card';

type Transaction = {
    id: string;
    date: string;
    client: string;
    type: string;
    amountUSD: number;
    method: string;
    status: 'Completado' | 'Pendiente' | 'Fallido';
}

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

const statusColors = {
    Completado: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300',
    Pendiente: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300',
    Fallido: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300',
}

const DOLLAR_RATE = 1263; // As per prompt

const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  return (
    <Card className="shadow-lg h-full overflow-hidden">
        <div className="p-4 border-b border-border-color">
            <h3 className="text-lg font-semibold text-text-primary">Transacciones Recientes</h3>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-secondary uppercase bg-bg-secondary">
            <tr>
              <th scope="col" className="px-4 py-3">Fecha</th>
              <th scope="col" className="px-4 py-3">Cliente</th>
              <th scope="col" className="px-4 py-3">Tipo</th>
              <th scope="col" className="px-4 py-3 text-right">Monto</th>
              <th scope="col" className="px-4 py-3">Método</th>
              <th scope="col" className="px-4 py-3 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b border-border-color last:border-b-0 hover:bg-bg-secondary/50">
                <td className="px-4 py-3 text-text-secondary">{tx.date}</td>
                <td className="px-4 py-3 font-medium text-text-primary">{tx.client}</td>
                <td className="px-4 py-3 text-text-secondary">{tx.type}</td>
                <td className="px-4 py-3 text-right">
                    <div className="font-semibold text-text-primary">{formatCurrency(tx.amountUSD)}</div>
                    <div className="text-xs text-text-secondary">≈ {formatCurrency(tx.amountUSD * DOLLAR_RATE, 'ARS')}</div>
                </td>
                <td className="px-4 py-3 text-text-secondary">{tx.method}</td>
                <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[tx.status]}`}>
                        {tx.status}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentTransactionsTable;