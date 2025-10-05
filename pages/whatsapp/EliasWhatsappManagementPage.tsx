import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MessageSquare, Send, Bell, Clock, Info, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import RequestChangeModal from '../../components/whatsapp/RequestChangeModal';

// This is a mock structure until the API provides it
interface WhatsappMetrics {
    enabled: boolean;
    number: string;
    hoy: {
        mensajes_enviados: number;
        mensajes_recibidos: number;
        conversaciones: number;
        ultima_actividad: string;
    },
    mes: {
        mensajes_totales: number;
    }
}

const EliasWhatsappManagementPage: React.FC = () => {
    const [metrics, setMetrics] = useState<WhatsappMetrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isToggling, setIsToggling] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Mock usage data as the API doesn't provide it
    const usage = {
        used: 8534, // Set to > 80% to show alerts
        limit: 10000
    };

    useEffect(() => {
        const fetchMetrics = async () => {
            setIsLoading(true);
            try {
                const data = await api.getWhatsappMetrics();
                setMetrics(data);
            } catch (error) {
                toast.error("No se pudo cargar la información de WhatsApp.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMetrics();
    }, []);

    const handleToggle = async () => {
        if (!metrics) return;
        setIsToggling(true);
        try {
            const response = await api.toggleWhatsappStatus(!metrics.enabled);
            setMetrics(prev => prev ? { ...prev, enabled: response.enabled } : null);
            toast.success(`Servicio ${response.enabled ? 'activado' : 'pausado'}.`);
        } catch (error) {
            toast.error("No se pudo cambiar el estado del servicio.");
        } finally {
            setIsToggling(false);
        }
    };

    const consumptionPercentage = (usage.used / usage.limit) * 100;
    
    const getBarColor = () => {
        if (consumptionPercentage > 90) return 'bg-red-500';
        if (consumptionPercentage > 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>;
    }

    if (!metrics) {
        return <div className="text-center text-red-400">Error al cargar el módulo de WhatsApp.</div>
    }

    return (
        <>
            <div className="space-y-6 text-white animate-slideIn">
                {/* Header Section */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-whatsapp-green/10 rounded-xl">
                                <MessageSquare className="w-8 h-8 text-whatsapp-green" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">ELIAS Bot WhatsApp</h1>
                                <p className="text-gray-400">Servicio administrado</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{metrics.enabled ? 'Activo' : 'Pausado'}</span>
                            <button
                                onClick={handleToggle}
                                disabled={isToggling}
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${metrics.enabled ? 'bg-whatsapp-green' : 'bg-gray-600'}`}
                            >
                                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${metrics.enabled ? 'translate-x-8' : 'translate-x-1'}`}/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Service Status Bar */}
                <div className={`flex justify-between items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${metrics.enabled ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                    <p>{metrics.enabled ? '✅ Servicio Activo' : '🔴 Servicio Pausado'}</p>
                    <p className="text-gray-400">Número conectado: {metrics.number}</p>
                </div>

                {/* Metrics Section */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Actividad de Hoy</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                            <Send className="mx-auto h-6 w-6 text-blue-400 mb-2" />
                            <p className="text-2xl font-bold">{metrics.hoy.mensajes_enviados}</p>
                            <p className="text-sm text-gray-400">Enviados</p>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                            <Bell className="mx-auto h-6 w-6 text-purple-400 mb-2" />
                            <p className="text-2xl font-bold">{metrics.hoy.mensajes_recibidos}</p>
                            <p className="text-sm text-gray-400">Recibidos</p>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                            <MessageSquare className="mx-auto h-6 w-6 text-teal-400 mb-2" />
                            <p className="text-2xl font-bold">{metrics.hoy.conversaciones}</p>
                            <p className="text-sm text-gray-400">Conversaciones</p>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                            <Clock className="mx-auto h-6 w-6 text-yellow-400 mb-2" />
                            <p className="text-2xl font-bold">{metrics.hoy.ultima_actividad}</p>
                            <p className="text-sm text-gray-400">Última Actividad</p>
                        </div>
                    </div>
                </div>

                {/* Usage Bar Section */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Consumo del Mes</h2>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                        <span>Mensajes</span>
                        <span>{usage.used.toLocaleString()} / {usage.limit.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full transition-all duration-500 ${getBarColor()}`} style={{ width: `${consumptionPercentage}%` }}></div>
                    </div>
                    
                    {consumptionPercentage > 90 && (
                        <div className="mt-4 p-3 bg-red-500/10 text-red-300 text-sm rounded-lg flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Límite casi alcanzado - Los mensajes adicionales se cobrarán a $0.05 c/u
                        </div>
                    )}
                    {consumptionPercentage > 80 && consumptionPercentage <= 90 && (
                        <div className="mt-4 p-3 bg-yellow-500/10 text-yellow-300 text-sm rounded-lg flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Acercándose al límite mensual
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <p className="text-gray-400">Mensajes restantes</p>
                            <p className="font-semibold text-lg">{(usage.limit - usage.used).toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <p className="text-gray-400">Días restantes del mes</p>
                            <p className="font-semibold text-lg">14</p>
                        </div>
                    </div>
                    
                    {consumptionPercentage > 80 && (
                         <button onClick={() => navigate('/app/subscription/change-plan')} className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                            Actualizar Plan
                        </button>
                    )}
                </div>

                {/* Service Info Card */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <Info className="h-5 w-5 text-blue-400" />
                        <h2 className="text-lg font-semibold uppercase">Servicio Administrado</h2>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">Este módulo está configurado y optimizado por nuestro equipo técnico.</p>
                    <ul className="text-sm space-y-2 mb-6">
                        <li className="flex items-center gap-2">✅ No requiere configuración de tu parte</li>
                        <li className="flex items-center gap-2">✅ Actualizaciones automáticas</li>
                        <li className="flex items-center gap-2">✅ Soporte incluido</li>
                    </ul>
                    <div className="border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <p className="text-sm font-medium">¿Necesitas algún cambio?</p>
                        <button onClick={() => setIsModalOpen(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto">
                            Solicitar Cambio al Equipo Técnico
                        </button>
                    </div>
                </div>

                {/* Premium Dashboard Promo */}
                <div className="relative border border-indigo-500/50 rounded-xl p-6 overflow-hidden bg-gradient-to-br from-indigo-900/50 via-gray-900/10 to-purple-900/50">
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="h-5 w-5 text-yellow-300" />
                        <h2 className="text-xl font-bold">DESBLOQUEA MÁS INSIGHTS</h2>
                    </div>
                    <p className="text-indigo-200 mb-4">Con Dashboard Premium podrías ver:</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-6">
                        <p>📊 Análisis de conversaciones</p>
                        <p>📈 Tasa de conversión</p>
                        <p>⏰ Horarios óptimos</p>
                        <p>💰 ROI por conversación</p>
                        <p>📅 Reportes ejecutivos</p>
                        <p>🎯 Segmentación de clientes</p>
                    </div>
                    <button onClick={() => navigate('/app/subscription/change-plan')} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-opacity text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                        Conocer Dashboard Premium <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <RequestChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

export default EliasWhatsappManagementPage;
