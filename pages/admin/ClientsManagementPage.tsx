

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { ClientData } from '../../types';
import { mockClients } from '../../data/adminClientsMockData';

import ClientStatsHeader from '../../components/admin/clients/ClientStatsHeader';
import ClientToolbar from '../../components/admin/clients/ClientToolbar';
import ClientsTable from '../../components/admin/clients/ClientsTable';
import ClientDetailsModal from '../../components/admin/clients/ClientDetailsModal';
import DashboardSkeleton from '../../components/admin/dashboard/DashboardSkeleton';

type SortConfig = { key: keyof ClientData; direction: 'ascending' | 'descending' } | null;

const ClientsManagementPage: React.FC = () => {
    const [clients, setClients] = useState<ClientData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{ plan: string; status: string }>({ plan: 'all', status: 'all' });
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'fechaInicio', direction: 'descending'});
    const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
    const [selectedClientForModal, setSelectedClientForModal] = useState<ClientData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // Simulate API fetch
        setTimeout(() => {
            setClients(mockClients);
            setIsLoading(false);
        }, 1000);
    }, []);
    
    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setClients(prevClients => 
                prevClients.map(client => ({
                    ...client,
                    healthScore: Math.min(100, Math.max(0, client.healthScore + (Math.random() > 0.5 ? 1 : -1))),
                }))
            );
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleSort = (key: keyof ClientData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // FIX: Replaced useMemo with direct calculation to avoid runtime errors in the environment.
    // The calculation is performed on every render.
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
        // Delay clearing to allow for exit animation
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
                <div>
                    <h1 className="text-3xl font.bold text-white">Gestión de Clientes</h1>
                    <p className="text-gray-400 mt-1">Control total sobre los clientes de la plataforma.</p>
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