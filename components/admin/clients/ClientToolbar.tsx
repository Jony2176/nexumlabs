import React from 'react';
import { Search, PlusCircle, Download, Trash, Mail, PlayCircle, X } from 'lucide-react';
import Button from '../../ui/Button';

interface ClientToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: { plan: string; status: string };
  onFilterChange: (filters: { plan: string; status: string }) => void;
  onAddClient: () => void;
  onExport: () => void;
  selectedCount: number;
  onBulkAction: (action: string) => void;
}

const ClientToolbar: React.FC<ClientToolbarProps> = ({ 
    searchTerm, onSearchChange, filters, onFilterChange, onAddClient, onExport,
    selectedCount, onBulkAction
}) => {
    
  // Conditional rendering for bulk actions bar
  if (selectedCount > 0) {
    return (
        <div className="bg-gray-700 rounded-lg p-4 flex justify-between items-center transition-all duration-300 animate-slideIn">
            <p className="text-white font-semibold">{selectedCount} cliente(s) seleccionado(s)</p>
            <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => onBulkAction('email')}>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                </Button>
                <Button variant="secondary" size="sm" onClick={() => onBulkAction('suspend')}>
                    <PlayCircle className="h-4 w-4 mr-2 rotate-90" />
                    Suspender
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onBulkAction('delete')}>
                    <Trash className="h-4 w-4 mr-2" />
                    Eliminar
                </Button>
                 <Button variant="ghost" size="icon" onClick={() => onBulkAction('clear')}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar empresa o contacto..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-gray-900/50 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
        <select
          value={filters.plan}
          onChange={(e) => onFilterChange({ ...filters, plan: e.target.value })}
          className="bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
        >
          <option value="all">Todos los Planes</option>
          <option value="Lite">Lite</option>
          <option value="Pro">Pro</option>
          <option value="Professional">Professional</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
        >
          <option value="all">Todos los Estados</option>
          <option value="active">Activo</option>
          <option value="trial">Trial</option>
          <option value="suspended">Suspendido</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
        <Button onClick={onAddClient}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Agregar Cliente
        </Button>
      </div>
    </div>
  );
};

export default ClientToolbar;