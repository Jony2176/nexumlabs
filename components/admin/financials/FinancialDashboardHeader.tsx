import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, RefreshCw, Download, ChevronDown } from 'lucide-react';

const FinancialDashboardHeader: React.FC = () => {
    const [currency, setCurrency] = useState<'USD' | 'ARS'>('USD');

    return (
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">Panel Financiero</h1>
                <p className="text-gray-400 mt-1">Visión general de la salud financiera del negocio.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700">
                    <Calendar className="h-4 w-4" />
                    <span>Este Mes</span>
                    <ChevronDown className="h-4 w-4" />
                </button>

                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg p-1">
                    <button 
                        onClick={() => setCurrency('USD')}
                        className={`px-3 py-1 text-sm rounded-md ${currency === 'USD' ? 'bg-gray-600 text-white' : 'text-gray-400'}`}
                    >
                        USD
                    </button>
                    <button 
                        onClick={() => setCurrency('ARS')}
                        className={`px-3 py-1 text-sm rounded-md ${currency === 'ARS' ? 'bg-gray-600 text-white' : 'text-gray-400'}`}
                    >
                        ARS
                    </button>
                </div>
                
                <button 
                    onClick={() => toast.success('Exportando reporte...')}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700"
                >
                    <Download className="h-4 w-4" />
                    <span>Exportar</span>
                </button>
                
                <button 
                     onClick={() => toast.success('Datos actualizados!')}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700"
                >
                    <RefreshCw className="h-4 w-4" />
                    <span className="text-gray-400 text-xs">hace 2 min</span>
                </button>
            </div>
        </div>
    );
};

export default FinancialDashboardHeader;