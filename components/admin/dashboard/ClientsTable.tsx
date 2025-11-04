import React, { useState } from 'react';
import { ClientData } from '../../../types';
import { formatCurrency } from '../../../utils/formatters';
import ProgressBar from '../../ui/ProgressBar';
import HealthIndicator from './HealthIndicator';
import { MoreVertical, Eye, Edit, Tag, Mail, AlertCircle, FileText, Search } from 'lucide-react';
import Card from '../../ui/Card';

interface ClientsTableProps {
  data: ClientData[];
}

const planBadgeColors: { [key: string]: string } = {
  Lite: 'bg-gray-500 text-white border-gray-500 dark:bg-gray-400/20 dark:text-gray-300 dark:border-gray-600',
  Pro: 'bg-blue-500 text-white border-blue-500 dark:bg-blue-400/20 dark:text-blue-300 dark:border-blue-600',
  Professional: 'bg-purple-500 text-white border-purple-500 dark:bg-purple-400/20 dark:text-purple-300 dark:border-purple-600',
  Business: 'bg-indigo-500 text-white border-indigo-500 dark:bg-indigo-400/20 dark:text-indigo-300 dark:border-indigo-600',
  Enterprise: 'bg-yellow-400 text-black border-yellow-400 dark:bg-yellow-400/20 dark:text-yellow-300 dark:border-yellow-600',
};

const ClientsTable: React.FC<ClientsTableProps> = ({ data }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <Card className="shadow-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-border-color">
            <h3 className="text-lg font-semibold text-text-primary">Clientes</h3>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input type="text" placeholder="Buscar cliente..." className="bg-[var(--bg-secondary)] border border-border-color rounded-lg pl-9 pr-3 py-1.5 text-sm w-64" />
            </div>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-secondary uppercase bg-[var(--bg-secondary)]">
            <tr>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Plan / Ingreso Mensual</th>
              <th scope="col" className="px-6 py-3">Consumo Actual</th>
              <th scope="col" className="px-6 py-3 text-center">Salud de la Cuenta</th>
              <th scope="col" className="px-6 py-3 text-center">Estado</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {data.map(client => (
              <tr key={client.id} className="border-b border-border-color hover:bg-[var(--bg-surface)]">
                <td className="px-6 py-4">
                  <div className="font-bold text-text-primary">{client.empresa}</div>
                  <div className="text-xs text-text-secondary">{client.contacto}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${planBadgeColors[client.plan]}`}>{client.plan}</span>
                    <div className="font-mono text-text-primary">{formatCurrency(client.mrr)}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <ProgressBar label="WhatsApp" value={client.consumoWhatsApp.value} max={client.consumoWhatsApp.limit} />
                    <ProgressBar label="Llamadas" value={client.consumoLlamadas.value} max={client.consumoLlamadas.limit} />
                  </div>
                </td>
                <td className="px-6 py-4 text-center"><HealthIndicator score={client.healthScore} /></td>
                <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      client.estado === 'active' ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300' :
                      client.estado === 'trial' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300'
                    }`}>
                        {client.estado}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block">
                    <button onClick={() => setActiveDropdown(activeDropdown === client.id ? null : client.id)}>
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === client.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-surface)] border border-border-color rounded-md shadow-lg z-10">
                            <div className="py-1">
                                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-[var(--bg-secondary)]"><Eye size={14}/> Ver detalles</a>
                                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-[var(--bg-secondary)]"><Edit size={14}/> Cambiar plan</a>
                                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-[var(--bg-secondary)]"><Tag size={14}/> Aplicar descuento</a>
                                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-[var(--bg-secondary)]"><Mail size={14}/> Enviar email</a>
                                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[var(--bg-secondary)]"><AlertCircle size={14}/> Suspender</a>
                                <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-[var(--bg-secondary)]"><FileText size={14}/> Ver logs</a>
                            </div>
                        </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ClientsTable;
