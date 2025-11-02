

import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, BarChart3, DollarSign, BrainCircuit, ClipboardList } from 'lucide-react';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import CountdownTimer from '../pricing/CountdownTimer'; // Re-using for consistency

const UpsellBanner = () => {
    const { isAvailable } = useFeatureFlags();
    const isPremiumLaunched = isAvailable('dashboard_premium');

    if (!isPremiumLaunched) {
        // Pre-launch "Coming Soon" teaser
        return (
             <div className="relative rounded-xl p-8 overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-2xl shadow-purple-500/20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-3">Panel Premium - Próximamente</h2>
                    <p className="text-purple-200 mb-6">
                        Análisis predictivo, métricas avanzadas y más. Lanzamiento el 1 de Enero de 2026.
                    </p>
                    <CountdownTimer />
                     <Link to="/app/modules">
                        <button className="mt-6 bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                            Unirme a la Lista de Espera
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
    
    // Post-launch "Upgrade" banner
    return (
        <div className="relative rounded-xl p-8 overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-2xl shadow-purple-500/20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-[-5rem] left-[-5rem] w-60 h-60 bg-white/10 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
                        <span className="text-yellow-300">🔓</span>
                        Desbloquea el Panel Premium
                    </h2>
                    <p className="text-purple-200 mb-6">
                        Analytics avanzados que aumentan tu conversión 40%.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-start gap-3"><BarChart3 className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" /><span>Gráficos de tendencias en tiempo real</span></li>
                        <li className="flex items-start gap-3"><DollarSign className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" /><span>ROI detallado por cliente y canal</span></li>
                        <li className="flex items-start gap-3"><BrainCircuit className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" /><span>Insights predictivos con IA</span></li>
                    </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                    <p className="text-lg">Desde</p>
                    <p className="text-4xl font-bold my-2">$199<span className="text-lg font-normal">/mes</span></p>
                    <Link to="/app/subscription/change-plan">
                        <button className="mt-6 w-full bg-white text-purple-600 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                            Activar Prueba Gratis →
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpsellBanner;