
import React, { useState, useEffect, useRef } from 'react';
import { ClientData } from '../../../types';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import ProgressBar from '../../ui/ProgressBar';
import HealthIndicator from '../dashboard/HealthIndicator';
import { MoreVertical, Eye, Edit, Tag, Mail, AlertCircle, FileText, ChevronUp, ChevronDown, User, LogIn, Repeat, Wallet, XCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';
import { cn } from '../../../utils/cn';

type SortConfig = { key: keyof ClientData; direction: 'ascending' | 'descending' } | null;

interface ClientsTableProps {
  clients: ClientData[];
  onViewDetails: (client: ClientData) => void;
  sortConfig: SortConfig;
  onSort: (key: keyof ClientData) => void;
  selectedClients: Set<string>;
  onSelectionChange: (selected: Set<string>) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, onViewDetails, sortConfig, onSort, selectedClients, onSelectionChange }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const totalPages = Math.ceil(clients.length / itemsPerPage);
  const paginatedClients = clients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setActiveDropdown(null);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [clients.length]);

  const SortableHeader = ({ tkey, label }: { tkey: keyof ClientData; label: string }) => (
    <th onClick={() => onSort(tkey)}>
      <div className="flex items-center gap-1 cursor-pointer">
        {label}
        {sortConfig?.key === tkey ? (
            sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
        ) : <div className="w-[14px] h-[14px]"></div>}
      </div>
    </th>
  );
  
  const handleActionClick = (action: string) => {
      toast.success(`Acción simulada: ${action}`);
      setActiveDropdown(null);
  }

  const actionsMenu = [
    { label: 'Cambiar plan', icon: Repeat, action: 'change_plan' },
    { label: 'Aplicar descuento', icon: Tag, action: 'apply_discount' },
    { label: 'Ver historial de pagos', icon: Wallet, action: 'view_payments' },
    { label: 'Ver logs de actividad', icon: FileText, action: 'view_logs' },
    { label: 'Suspender cuenta', icon: AlertCircle, action: 'suspend' },
    { label: 'Cancelar cuenta', icon: XCircle, action: 'cancel' },
    { label: 'Impersonar', icon: LogIn, action: 'impersonate' },
    { label: 'Enviar email', icon: Send, action: 'send_email' },
  ];

  return (
    <div className="table-premium">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <SortableHeader tkey="empresa" label="Cliente" />
              <SortableHeader tkey="plan" label="Plan / Ingreso Mensual" />
              <th>Consumo</th>
              <SortableHeader tkey="healthScore" label="Salud de la Cuenta" />
              <SortableHeader tkey="fechaInicio" label="Fecha Inicio" />
              <th>Último Pago</th>
              <th><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map(client => (
              <tr key={client.id} className="">
                <td>
                  <div className="flex items-center gap-3">
                    <img src={client.logoUrl} alt={client.empresa} className="h-8 w-8 rounded-full theme-bg-secondary" />
                    <div>
                      <div className="font-bold">{client.empresa}</div>
                      <div className="text-xs">{client.contacto}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className={cn('px-2 py-0.5 text-xs font-semibold rounded-full border', {
                        'bg-gray-100 text-gray-800 dark:bg-gray-400/20 dark:text-gray-300 border-gray-300 dark:border-gray-600': client.plan === 'Lite',
                        'bg-cyan-100 text-cyan-800 dark:bg-cyan-400/20 dark:text-cyan-300 border-cyan-300 dark:border-cyan-600': client.plan === 'Start',
                        'bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-300 border-blue-300 dark:border-blue-600': client.plan === 'Pro',
                        'bg-purple-100 text-purple-800 dark:bg-purple-400/20 dark:text-purple-300 border-purple-300 dark:border-purple-600': client.plan === 'Professional',
                        'bg-indigo-100 text-indigo-800 dark:bg-indigo-400/20 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600': client.plan === 'Business',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-400/20 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600': client.plan === 'Enterprise',
                    })}>
                        {client.plan}
                    </span>
                    <div className="font-mono">{formatCurrency(client.mrr)}</div>
                  </div>
                </td>
                <td className="w-48">
                  <div className="space-y-2">
                    <ProgressBar label="WhatsApp" value={client.consumoWhatsApp.value} max={client.consumoWhatsApp.limit} />
                    <ProgressBar label="Llamadas" value={client.consumoLlamadas.value} max={client.consumoLlamadas.limit} />
                  </div>
                </td>
                <td className="text-center"><HealthIndicator score={client.healthScore} /></td>
                <td>{formatDate(client.fechaInicio).split('de ').slice(1).join(' ')}</td>
                <td>
                    <div className={cn('font-semibold', {
                        'text-green-500': client.ultimoPago.estado === 'paid',
                        'text-yellow-500': client.ultimoPago.estado === 'pending',
                        'text-red-500': client.ultimoPago.estado === 'failed',
                    })}>{formatDate(client.ultimoPago.fecha).split('de ').slice(1).join(' ')}</div>
                    <div className={cn('text-xs capitalize', {
                        'text-green-500': client.ultimoPago.estado === 'paid',
                        'text-yellow-500': client.ultimoPago.estado === 'pending',
                        'text-red-500': client.ultimoPago.estado === 'failed',
                    })}>{client.ultimoPago.estado}</div>
                </td>
                <td className="text-right">
                    <div className="relative">
                        <button onClick={() => setActiveDropdown(client.id === activeDropdown ? null : client.id)}>
                            <MoreVertical size={16} />
                        </button>
                        {activeDropdown === client.id && (
                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-20 animate-fade-in-scale origin-top-right">
                                <div className="p-1">
                                    <button onClick={() => {onViewDetails(client); setActiveDropdown(null)}} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md"><Eye size={14}/> Ver detalles completos</button>
                                    <div className="border-t border-gray-700 my-1"></div>
                                    {actionsMenu.map(action => (
                                        <button key={action.action} onClick={() => handleActionClick(action.label)} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md">
                                            <action.icon size={14} className={action.action.includes('cancel') || action.action.includes('suspend') ? 'text-red-400' : ''}/> 
                                            {action.label}
                                        </button>
                                    ))}
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
      {/* Pagination */}
      <div className="p-4 flex justify-between items-center text-sm text-text-muted">
        <div>Mostrando {paginatedClients.length} de {clients.length} clientes</div>
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                variant="secondary"
                className="!bg-bg-secondary !text-text-secondary disabled:!bg-bg-primary disabled:!text-text-muted hover:!bg-bg-surface"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1 || totalPages === 0}>
                Anterior
            </Button>
            <span className="text-text-primary">Página {currentPage} de {totalPages || 1}</span>
            <Button
                size="sm"
                variant="secondary"
                className="!bg-bg-secondary !text-text-secondary disabled:!bg-bg-primary disabled:!text-text-muted hover:!bg-bg-surface"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}>
                Siguiente
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;
