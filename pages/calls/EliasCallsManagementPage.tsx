import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Phone, PhoneForwarded, PhoneIncoming, Timer, Clock, Info, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import RequestChangeModal from '../../components/whatsapp/RequestChangeModal';

// Static data as per the prompt
const callMetrics = {
    enabled: true,
    number: '+54 11 5049-9608',
    hoy: {
        realizadas: 47,
        atendidas: 38,
        duracion_promedio: '3:45 min',
        ultima_llamada: '15:22',
    },
    mes: {
        consumidos: 287,
        limite: 500,
        dias_restantes: 14,
    }
};

const EliasCallsManagementPage: React.FC = () => {
    const [isEnabled, setIsEnabled] = useState(callMetrics.enabled);
    const [isToggling, setIsToggling] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggle = async () => {
        setIsToggling(true);
        // Mocking the toggle action
        await new Promise(resolve => setTimeout(resolve, 500));
        const newState = !isEnabled;
        setIsEnabled(newState);
        toast.success(`Servicio ${newState ? 'activado' : 'pausado'}.`);
        setIsToggling(false);
    };

    const consumptionPercentage = (callMetrics.mes.consumidos / callMetrics.mes.limite) * 100;
    
    const getBarColor = () => {
        if (consumptionPercentage > 90) return 'bg-red-500';
        if (consumptionPercentage > 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <>
            <div className="space-y-6 text-white animate-slideIn">
                {/* Header Section */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <Phone className="w-8 h-8 text-green-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">ELIAS Llamadas IA</h1>
                                <p className="text-gray-400">Servicio administrado</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{isEnabled ? 'Activo' : 'Pausado'}</span>
                            <button
                                onClick={handleToggle}
                                disabled={isToggling}
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${isEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-8' : 'translate-x-1'}`}/>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Service Status Bar */}
                <div className={`flex justify-between items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isEnabled ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                    <p>{isEnabled ? '✅ Servicio Activo' : '🔴 Servicio Pausado'}</p>
                    <p className="text-gray-400">Número: {callMetrics.number}</p>
                </div>

                {/* Metrics Section */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Actividad de Hoy</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-green-500/10 p-4 rounded-lg text-center">
                            <PhoneForwarded className="mx-auto h-6 w-6 text-green-400 mb-2" />
                            <p className="text-2xl font-bold">{callMetrics.hoy.realizadas}</p>
                            <p className="text-sm text-gray-400">Llamadas Realizadas</p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-lg text-center">
                            <PhoneIncoming className="mx-auto h-6 w-6 text-blue-400 mb-2" />
                            <p className="text-2xl font-bold">{callMetrics.hoy.atendidas}</p>
                            <p className="text-sm text-gray-400">Llamadas Atendidas</p>
                        </div>
                        <div className="bg-purple-500/10 p-4 rounded-lg text-center">
                            <Timer className="mx-auto h-6 w-6 text-purple-400 mb-2" />
                            <p className="text-2xl font-bold">{callMetrics.hoy.duracion_promedio}</p>
                            <p className="text-sm text-gray-400">Duración Promedio</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg text-center">
                            <Clock className="mx-auto h-6 w-6 text-orange-400 mb-2" />
                            <p className="text-2xl font-bold">{callMetrics.hoy.ultima_llamada}</p>
                            <p className="text-sm text-gray-400">Última Llamada</p>
                        </div>
                    </div>
                </div>

                {/* Usage Bar Section */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Consumo del Mes</h2>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                        <span>Minutos consumidos</span>
                        <span>{callMetrics.mes.consumidos.toLocaleString()} / {callMetrics.mes.limite.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full transition-all duration-500 ${getBarColor()}`} style={{ width: `${consumptionPercentage}%` }}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <p className="text-gray-400">Minutos restantes</p>
                            <p className="font-semibold text-lg">{(callMetrics.mes.limite - callMetrics.mes.consumidos).toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <p className="text-gray-400">Días restantes</p>
                            <p className="font-semibold text-lg">{callMetrics.mes.dias_restantes}</p>
                        </div>
                    </div>
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
                        <p>📊 Análisis de llamadas</p>
                        <p>📈 Tasa de conversión</p>
                        <p>⏰ Mejores horarios para llamar</p>
                        <p>💰 ROI por llamada</p>
                        <p>📅 Reportes de rendimiento</p>
                        <p>🎯 Transcripciones con IA</p>
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

export default EliasCallsManagementPage;
