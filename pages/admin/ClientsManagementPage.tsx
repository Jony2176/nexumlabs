

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { ClientData } from '../../types';
import api from '../../services/api';

import ClientStatsHeader from '../../components/admin/clients/ClientStatsHeader';
import ClientToolbar from '../../components/admin/clients/ClientToolbar';
import ClientsTable from '../../components/admin/clients/ClientsTable';
import ClientDetailsModal from '../../components/admin/clients/ClientDetailsModal';
import DashboardSkeleton from '../../components/admin/dashboard/DashboardSkeleton';
import { RefreshCw } from 'lucide-react';

type SortConfig = { key: keyof ClientData; direction: 'ascending' | 'descending' } | null;

const ClientsManagementPage: React.FC = () => {
    const [clients, setClients] = useState<ClientData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{ plan: string; status: string }>({ plan: 'all', status: 'all' });
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'fechaInicio', direction: 'descending'});
    const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
    const [selectedClientForModal, setSelectedClientForModal] = useState<ClientData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async (isInitialLoad = false) => {
            if (isInitialLoad) setIsLoading(true);
            try {
                const data = await api.getClients();
                setClients(data);
                setLastUpdated(new Date());
            } catch (error) {
                console.error(error);
            } finally {
                if (isInitialLoad) setIsLoading(false);
            }
        };

        fetchData(true); // Initial fetch

        const intervalId = setInterval(() => fetchData(false), 30000); // Poll every 30 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const handleSort = (key: keyof ClientData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    let sortedAndFilteredClients = [...clients];

    if (searchTerm) {
        sortedAndFilteredClients = sortedAndFilteredClients.filter(client =>
            client.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.contacto.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    if (filters.plan !== 'all') {
        sortedAndFilteredClients = sortedAndFilteredClients.filter(client => client.plan === filters.plan);
    }
    if (filters.status !== 'all') {
        sortedAndFilteredClients = sortedAndFilteredClients.filter(client => client.estado === filters.status);
    }

    if (sortConfig !== null) {
        sortedAndFilteredClients.sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
            } else if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortConfig.direction === 'ascending' ? aVal - bVal : bVal - aVal;
            }
            return 0;
        });
    }

    const handleViewDetails = (client: ClientData) => {
        setSelectedClientForModal(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedClientForModal(null), 300);
    };

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <>
            <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Gestión de Clientes</h1>
                        <p className="text-gray-400 mt-1">Control total sobre los clientes de la plataforma.</p>
                    </div>
                     {lastUpdated && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '2s' }} />
                            <span>Última actualización: {lastUpdated.toLocaleTimeString('es-AR')}</span>
                        </div>
                    )}
                </div>

                <ClientStatsHeader clients={clients} />
                
                <ClientToolbar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filters={filters}
                    onFilterChange={setFilters}
                    onAddClient={() => toast.success('Modal para agregar cliente se implementará aquí.')}
                    onExport={() => toast.success('Exportando datos...')}
                    selectedCount={selectedClients.size}
                    onBulkAction={(action) => {
                        toast.success(`Acción masiva "${action}" aplicada a ${selectedClients.size} clientes.`);
                        setSelectedClients(new Set());
                    }}
                />

                <ClientsTable
                    clients={sortedAndFilteredClients}
                    onViewDetails={handleViewDetails}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    selectedClients={selectedClients}
                    onSelectionChange={setSelectedClients}
                />
            </motion.div>
            
            <ClientDetailsModal
                client={selectedClientForModal}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default ClientsManagementPage;