
import React from 'react';
import { formatCurrency } from '../../../utils/formatters';

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
    Completado: 'bg-green-500/20 text-green-300',
    Pendiente: 'bg-yellow-500/20 text-yellow-300',
    Fallido: 'bg-red-500/20 text-red-300',
}

const DOLLAR_RATE = 1263; // As per prompt

const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg h-full">
        <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Transacciones Recientes</h3>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
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
              <tr key={tx.id} className="border-b border-gray-700 hover:bg-gray-800/60">
                <td className="px-4 py-3 text-gray-400">{tx.date}</td>
                <td className="px-4 py-3 font-medium text-white">{tx.client}</td>
                <td className="px-4 py-3 text-gray-300">{tx.type}</td>
                <td className="px-4 py-3 text-right">
                    <div className="font-semibold text-white">{formatCurrency(tx.amountUSD)}</div>
                    <div className="text-xs text-gray-400">≈ {formatCurrency(tx.amountUSD * DOLLAR_RATE, 'ARS')}</div>
                </td>
                <td className="px-4 py-3 text-gray-300">{tx.method}</td>
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
    </div>
  );
};

export default RecentTransactionsTable;
