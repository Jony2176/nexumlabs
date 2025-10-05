import React from 'react';
import { KPICardData } from '../../../types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import AnimatedNumber from '../../ui/AnimatedNumber';
import { formatARS } from '../../../utils/formatters';

interface ExtendedKPICardProps extends KPICardData {
    sparklineData?: { value: number }[];
    isCurrency?: boolean;
    prefix?: string;
    suffix?: string;
}

const KPICard: React.FC<ExtendedKPICardProps> = ({ title, value, change, trend, icon: Icon, alert, subtitle, valueInARS, sparklineData, isCurrency, prefix, suffix }) => {
    const isChurnGood = title.toLowerCase().includes('cancelación') && trend === 'down';
    
    let trendClasses = 'kpi-trend ';
    if (isChurnGood || (trend === 'up' && change >= 0)) {
        trendClasses += 'up';
    } else {
        trendClasses += 'down';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.,]+/g, '').replace(',', '.')) : value;

    return (
        <div className="glass-card p-5 shadow-lg h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-400">{title}</h3>
                    <Icon className={`w-5 h-5 ${alert ? 'text-red-400' : 'text-gray-500'}`} />
                </div>
                {subtitle && <p className="text-xs text-gray-500 mb-2">{subtitle}</p>}
                <div className="kpi-value">
                     {typeof numericValue === 'number' && !isNaN(numericValue) ? (
                        <AnimatedNumber 
                            value={numericValue}
                            isCurrency={isCurrency}
                            prefix={prefix}
                            suffix={suffix}
                        />
                    ) : (
                        value
                    )}
                </div>
                {valueInARS && <p className="text-sm text-gray-400">{valueInARS}</p>}
                <div className={`${trendClasses} mt-2`}>
                    {trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span>{Math.abs(change)}%</span>
                    <span className="text-xs text-gray-500 ml-1">vs mes anterior</span>
                </div>
            </div>

            {sparklineData && (
                <div className="mt-4 h-12 -mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData}>
                        <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="var(--nexum-primary)"
                            strokeWidth={2}
                            dot={false}
                            animationDuration={1000}
                        />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default React.memo(KPICard);