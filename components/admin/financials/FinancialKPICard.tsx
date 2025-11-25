import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import { Progress } from '../../ui/Progress';
import { cn } from '../../../utils/cn';

interface FinancialKPICardProps {
    title: string;
    value: string;
    secondaryValue: string;
    change?: number;
    trend?: 'up' | 'down';
    icon: LucideIcon;
    sparklineData?: number[];
    progress?: number;
    badge?: { text: string; color: 'green' | 'yellow' | 'red' };
}

const badgeColors = {
    green: 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300',
    yellow: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300',
    red: 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300',
};

const FinancialKPICard: React.FC<FinancialKPICardProps> = ({
    title, value, secondaryValue, change, trend, icon: Icon, sparklineData, progress, badge
}) => {
    const isChangeGood = (trend === 'up' && change && change > 0) || (trend === 'down' && change && change < 0);
    
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-300 backdrop-blur-sm h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
                    <Icon className="w-5 h-5 text-text-muted" />
                </div>
                <p className="text-xs text-text-muted mb-2 truncate h-8">{secondaryValue}</p>
                <p className="text-3xl font-bold text-text-primary">{value}</p>
            </div>

            <div className="mt-4">
                {change !== undefined && trend && (
                    <div className={cn("flex items-center text-sm font-semibold", isChangeGood ? 'text-green-500' : 'text-red-500')}>
                        {trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        <span>{Math.abs(change)}% vs mes anterior</span>
                    </div>
                )}
                {sparklineData && (
                    <div className="h-10 -mx-4 -mb-4 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sparklineData.map(v => ({ value: v }))}>
                                <defs>
                                    <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#10B981" fill="url(#sparklineGradient)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
                {progress !== undefined && (
                    <Progress value={progress} className="h-2 mt-2" />
                )}
                 {badge && (
                    <span className={cn('px-2 py-0.5 text-xs font-bold rounded-full', badgeColors[badge.color])}>
                        {badge.text}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FinancialKPICard;