import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { ClientData } from '../../types';
import { useClientStore } from '../../store/authStore';
import api from '../../services/api';

import ClientStatsHeader from '../../components/admin/clients/ClientStatsHeader';
import ClientToolbar from '../../components/admin/clients/ClientToolbar';
import ClientsTable from '../../components/admin/clients/ClientsTable';
import ClientDetailsModal from '../../components/admin/clients/ClientDetailsModal';
import DashboardSkeleton from '../../components/admin/dashboard/DashboardSkeleton';
import { RefreshCw } from 'lucide-react';
import AddClientModal from '../../components/admin/clients/AddClientModal';

type SortConfig = { key: keyof ClientData; direction: 'ascending' | 'descending' } | null;

const ClientsManagementPage: React.FC = () => {
    const { clients, setClients, addClient } = useClientStore();
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{ plan: string; status: string }>({ plan: 'all', status: 'all' });
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'fechaInicio', direction: 'descending'});
    const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
    const [selectedClientForModal, setSelectedClientForModal] = useState<ClientData | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchClients = async (isAutoRefresh = false) => {
            if (!isAutoRefresh) setIsLoading(true);
            try {
                const fetchedClients = await api.getClients();
                setClients(fetchedClients);
                setLastUpdated(new Date());
            } catch (error) {
                if (!isAutoRefresh) {
                    toast.error("No se pudieron cargar los clientes.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();

        // Refresh every 30 seconds
        const intervalId = setInterval(() => {
            fetchClients(true);
        }, 30000);

        return () => clearInterval(intervalId);
    }, [setClients]);


    const handleSort = (key: keyof ClientData) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // The sorting and filtering logic is now calculated on every render
    // to definitively resolve the persistent 'useMemo' runtime error.
    let filteredClients = [...clients];

    if (searchTerm) {
        filteredClients = filteredClients.filter(client =>
            client.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.contacto.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    if (filters.plan !== 'all') {
        filteredClients = filteredClients.filter(client => client.plan.toLowerCase() === filters.plan.toLowerCase());
    }
    if (filters.status !== 'all') {
        filteredClients = filteredClients.filter(client => client.estado === filters.status);
    }

    const sortedAndFilteredClients = [...filteredClients]; // create a mutable copy
    if (sortConfig !== null) {
        const sortKey = sortConfig.key;
        sortedAndFilteredClients.sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            
            if (aVal === null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;
            
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortConfig.direction === 'ascending' 
                    ? aVal.localeCompare(bVal) 
                    : bVal.localeCompare(aVal);
            }
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortConfig.direction === 'ascending' ? aVal - bVal : bVal - aVal;
            }
            
            return 0;
        });
    }


    const handleViewDetails = (client: ClientData) => {
        setSelectedClientForModal(client);
        setIsDetailsModalOpen(true);
    };
    
    const handleAddClient = (newClientData: Omit<ClientData, 'id' | 'consumoWhatsApp' | 'consumoLlamadas' | 'healthScore' | 'ultimoPago' | 'logoUrl' | 'cuit' | 'direccion'>) => {
        const newClient: ClientData = {
            id: `cli_${Date.now()}`,
            ...newClientData,
            consumoWhatsApp: { value: 0, limit: 1000 },
            consumoLlamadas: { value: 0, limit: 300 },
            healthScore: 75,
            ultimoPago: { fecha: new Date().toISOString(), estado: 'paid' },
            logoUrl: `https://avatar.vercel.sh/${newClientData.empresa.replace(/\s+/g, '')}.png?size=40`,
        };
        addClient(newClient);
        setIsAddModalOpen(false);
        toast.success('Cliente agregado exitosamente!');
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
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
                            <RefreshCw size={14} />
                            <span>Actualizado: {lastUpdated.toLocaleTimeString()}</span>
                        </div>
                    )}
                </div>

                <ClientStatsHeader clients={clients} />
                
                <ClientToolbar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filters={filters}
                    onFilterChange={setFilters}
                    onAddClient={() => setIsAddModalOpen(true)}
                    onExport={() => toast.success('Exportando datos...')}
                    selectedCount={selectedClients.size}
                    onBulkAction={(action) => {
                        if (action === 'clear') {
                            setSelectedClients(new Set());
                            return;
                        }
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
                isOpen={isDetailsModalOpen}
                onClose={handleCloseDetailsModal}
            />
            
            <AddClientModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddClient={handleAddClient}
            />
        </>
    );
};

export default ClientsManagementPage;