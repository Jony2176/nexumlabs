import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Search, Check, X } from 'lucide-react';
import { getAffiliates, updateAffiliate } from '../../../services/affiliateApi';
import { Affiliate, AffiliateStatus } from '../../../types';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import LoadingSpinner from '../../ui/LoadingSpinner';
import Button from '../../ui/Button';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../ui/ConfirmationModal';
import EditAffiliateModal from './modals/EditAffiliateModal';
import AffiliateDetailsModal from './modals/AffiliateDetailsModal';
import ProcessPayoutModal from './modals/ProcessPayoutModal';
import dollarBlueService from '../../../services/dollarBlueService';


const statusStyles: { [key in AffiliateStatus]: string } = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const AffiliatesTable: React.FC = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AffiliateStatus | 'all'>('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dollarRate, setDollarRate] = useState<number | null>(null);
  
  // Modal states
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [modal, setModal] = useState<'details' | 'edit' | 'payout' | 'confirm' | null>(null);
  const [confirmationProps, setConfirmationProps] = useState({ title: '', onConfirm: () => {} });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [data, rate] = await Promise.all([
          getAffiliates(),
          dollarBlueService.getCurrentRate()
      ]);
      setAffiliates(data);
      if(rate) {
        setDollarRate(rate.sell);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);
  
  // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeDropdown]);

  const filteredAffiliates = affiliates
      .filter(aff => statusFilter === 'all' || aff.estado === statusFilter)
      .filter(aff => 
        aff.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aff.user_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  const handleUpdateStatus = async (affiliateId: string, newStatus: AffiliateStatus) => {
      const toastId = toast.loading('Actualizando estado...');
      try {
          await updateAffiliate(affiliateId, { estado: newStatus });
          setAffiliates(prev => prev.map(aff => aff.id === affiliateId ? { ...aff, estado: newStatus } : aff));
          toast.success(`Afiliado ${newStatus === 'active' ? 'aprobado' : newStatus}.`, { id: toastId });
      } catch (error) {
          toast.error('Error al actualizar el estado.', { id: toastId });
      } finally {
        setModal(null);
        setSelectedAffiliate(null);
      }
  };

  const openConfirmation = (aff: Affiliate, action: 'approve' | 'reject' | 'deactivate' | 'activate') => {
      setSelectedAffiliate(aff);
      let title = '';
      let onConfirm = () => {};

      switch (action) {
          case 'approve':
              title = `¿Aprobar al afiliado ${aff.nombre}?`;
              onConfirm = () => handleUpdateStatus(aff.id, 'active');
              break;
          case 'reject':
              title = `¿Rechazar al afiliado ${aff.nombre}?`;
              onConfirm = () => handleUpdateStatus(aff.id, 'rejected');
              break;
          case 'deactivate':
              title = `¿Desactivar al afiliado ${aff.nombre}?`;
              onConfirm = () => handleUpdateStatus(aff.id, 'inactive');
              break;
          case 'activate':
              title = `¿Reactivar al afiliado ${aff.nombre}?`;
              onConfirm = () => handleUpdateStatus(aff.id, 'active');
              break;
      }
      setConfirmationProps({ title, onConfirm });
      setModal('confirm');
      setActiveDropdown(null);
  };
  
  const handleActionClick = (aff: Affiliate, action: 'details' | 'edit' | 'payout') => {
      setSelectedAffiliate(aff);
      setModal(action);
      setActiveDropdown(null);
  };

  const handleEditSave = (updatedAffiliate: Affiliate) => {
      setAffiliates(prev => prev.map(aff => aff.id === updatedAffiliate.id ? updatedAffiliate : aff));
      setModal(null);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
    <div className="table-premium">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-1/3">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="input-premium pl-10 w-full"
                />
            </div>
             <div className="w-full md:w-auto">
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value as AffiliateStatus | 'all')}
                     className="input-premium w-full md:w-auto"
                >
                    <option value="all">Todos los Estados</option>
                    <option value="active">Activo</option>
                    <option value="pending">Pendiente</option>
                    <option value="inactive">Inactivo</option>
                    <option value="rejected">Rechazado</option>
                </select>
            </div>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Afiliado</th>
              <th>Estado</th>
              <th>Clientes Referidos</th>
              <th>Revenue (Lifetime)</th>
              <th>Comisión (Pendiente)</th>
              <th><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredAffiliates.map(aff => (
              <tr key={aff.id}>
                <td>
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full" src={aff.avatarUrl} alt={aff.nombre} />
                        <div className="ml-4">
                            <div className="font-bold">{aff.nombre}</div>
                            <div>{aff.user_email}</div>
                        </div>
                    </div>
                </td>
                <td>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusStyles[aff.estado]}`}>
                    {aff.estado}
                  </span>
                </td>
                <td>{aff.referrals.active} / {aff.referrals.total}</td>
                <td className="font-medium">
                    <div>{formatCurrency(aff.revenue.lifetime)}</div>
                    {dollarRate && <div className="text-xs">≈ {formatCurrency(aff.revenue.lifetime * dollarRate, 'ARS')}</div>}
                </td>
                <td className="font-medium text-yellow-400">
                    <div>{formatCurrency(aff.commission.pending)}</div>
                    {dollarRate && <div className="text-xs">≈ {formatCurrency(aff.commission.pending * dollarRate, 'ARS')}</div>}
                </td>
                <td className="text-right">
                  <div className="relative inline-block text-left">
                    <Button variant="ghost" size="icon" onClick={() => setActiveDropdown(aff.id === activeDropdown ? null : aff.id)}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    {activeDropdown === aff.id && (
                       <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg theme-bg-card ring-1 ring-black ring-opacity-5 z-10 border theme-border">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                                <button onClick={() => handleActionClick(aff, 'details')} className="w-full text-left block px-4 py-2 text-sm theme-text-primary hover:theme-bg-secondary">Ver Detalles</button>
                                <button onClick={() => handleActionClick(aff, 'edit')} className="w-full text-left block px-4 py-2 text-sm theme-text-primary hover:theme-bg-secondary">Editar</button>
                                {aff.estado === 'pending' && (
                                    <>
                                        <button onClick={() => openConfirmation(aff, 'approve')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:theme-bg-secondary"><Check size={16}/>Aprobar</button>
                                        <button onClick={() => openConfirmation(aff, 'reject')} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:theme-bg-secondary"><X size={16}/>Rechazar</button>
                                    </>
                                )}
                                {aff.estado === 'active' && (
                                    <>
                                        <button onClick={() => handleActionClick(aff, 'payout')} className="w-full text-left block px-4 py-2 text-sm theme-text-primary hover:theme-bg-secondary">Procesar Pago</button>
                                        <button onClick={() => openConfirmation(aff, 'deactivate')} className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:theme-bg-secondary">Desactivar</button>
                                    </>
                                )}
                                 {aff.estado === 'inactive' && (
                                    <button onClick={() => openConfirmation(aff, 'activate')} className="w-full text-left block px-4 py-2 text-sm text-green-400 hover:theme-bg-secondary">Reactivar</button>
                                )}
                            </div>
                        </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAffiliates.length === 0 && (
            <div className="text-center py-16">
                <p>No se encontraron afiliados que coincidan con la búsqueda.</p>
            </div>
        )}
      </div>
    </div>
    
    {selectedAffiliate && (
        <>
            <AffiliateDetailsModal affiliate={selectedAffiliate} isOpen={modal === 'details'} onClose={() => setModal(null)} />
            <EditAffiliateModal affiliate={selectedAffiliate} isOpen={modal === 'edit'} onClose={() => setModal(null)} onSave={handleEditSave} />
            <ProcessPayoutModal affiliate={selectedAffiliate} isOpen={modal === 'payout'} onClose={() => setModal(null)} onConfirm={() => {
                toast.success(`Pago para ${selectedAffiliate.nombre} procesado.`);
                setModal(null);
            }} />
        </>
    )}

    <ConfirmationModal
        isOpen={modal === 'confirm'}
        onClose={() => setModal(null)}
        onConfirm={confirmationProps.onConfirm}
        title={confirmationProps.title}
    >
        <p>Esta acción cambiará el estado del afiliado y no se puede deshacer fácilmente.</p>
    </ConfirmationModal>
    </>
  );
};

export default AffiliatesTable;