import React from 'react';
import { KPICardData } from '../../../types';
import { ArrowUp, ArrowDown } from 'lucide-react';

const KPICard: React.FC<KPICardData> = ({ title, value, change, trend, icon: Icon, alert, subtitle, valueInARS }) => {
    // Determine if the trend is positive. A downward trend for 'cancelación' is good.
    const isChurnGood = title.toLowerCase().includes('cancelación') && trend === 'down';
    const isPositive = isChurnGood || (trend === 'up' && change >= 0);

    // Use the classes defined in the global stylesheet
    const trendClasses = `kpi-trend ${isPositive ? 'up' : 'down'}`;
    
    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-5 flex flex-col justify-between h-full">
            {/* Top section with title and icon */}
            <div>
                <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
                    <Icon className={`w-5 h-5 ${alert ? 'text-red-500' : 'text-gray-400'}`} />
                </div>
                
                {/* Main value and subtitles */}
                <div className="mt-2">
                    <p className="kpi-value">{value}</p>
                    {valueInARS && (
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">{valueInARS}</p>
                    )}
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
                    )}
                </div>
            </div>
            
            {/* Bottom section with trend */}
            <div className={trendClasses}>
                {isPositive ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                <span>{Math.abs(change)}% vs mes anterior</span>
            </div>
        </div>
    );
};

export default KPICard;