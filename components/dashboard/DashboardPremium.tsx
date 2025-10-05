import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import {
    DollarSign, Clock, CheckCircle, TrendingUp, Scale, Users, Landmark, Home, BrainCircuit, ClipboardList, Smartphone, Users2, BarChart2, FileText, Settings, Award, AlertTriangle, MessageSquare, Phone, Download, Share, Edit3, Video, Mail, Share2, Rocket, Link2, Target,
} from 'lucide-react';
import * as mockData from '../../data/dashboardPremiumMockData';
import { formatARS } from '../../utils/formatters';
import { cn } from '../../utils/cn';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 12 }
    }
};

const Section: React.FC<{ title: string, icon: React.ElementType, children: React.ReactNode, className?: string }> = ({ title, icon: Icon, children, className }) => (
    <motion.section variants={itemVariants} className={cn("glass-card p-6", className)}>
        <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        {children}
    </motion.section>
);


const FinancialOverview: React.FC = () => {
    const [period, setPeriod] = useState('Este Mes');
    const colorClasses = {
        primary: 'from-blue-500/20 to-blue-500/0 border-blue-500/30 text-blue-300',
        warning: 'from-yellow-500/20 to-yellow-500/0 border-yellow-500/30 text-yellow-300',
        success: 'from-green-500/20 to-green-500/0 border-green-500/30 text-green-300',
        info: 'from-indigo-500/20 to-indigo-500/0 border-indigo-500/30 text-indigo-300',
    };

    return (
        <motion.section variants={itemVariants}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-2xl font-bold text-white">📊 Panel Financiero Premium</h2>
                <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-lg mt-4 md:mt-0">
                    {['Hoy', 'Esta Semana', 'Este Mes', 'Trimestre'].map(p => (
                        <button key={p} onClick={() => setPeriod(p)} className={cn('px-3 py-1.5 text-sm rounded-md transition-colors', period === p ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50')}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {mockData.financialKPIs.map(kpi => (
                    <div key={kpi.title} className={cn('bg-gray-900/50 border rounded-xl p-4 bg-gradient-to-b', colorClasses[kpi.colorClass as keyof typeof colorClasses])}>
                        <kpi.icon className="w-6 h-6 mb-2" />
                        <h3 className="text-sm text-gray-400">{kpi.title}</h3>
                        <p className="text-2xl font-bold text-white">{formatARS(kpi.amount)}</p>
                        <p className={`text-xs font-semibold ${kpi.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {kpi.trend !== 128.9 ? `↑ ${kpi.trend}% vs mes anterior` : `${kpi.trend}% tasa cobro`}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">💼 Ingresos por Especialidad</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockData.revenueByCaseType.map(item => {
                         const Icon = item.icon;
                         return (
                            <div key={item.name} className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2"><Icon className="w-5 h-5 text-gray-400" /> <h4 className="font-semibold">{item.name}</h4></div>
                                <p className="text-xl font-bold">{formatARS(item.revenue)}</p>
                                <p className="text-xs text-gray-400">{item.caseCount} casos • {formatARS(item.avg)} prom.</p>
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${item.progress}%` }}></div></div>
                            </div>
                         )
                    })}
                </div>
            </div>
        </motion.section>
    );
};


const AiAnalysis: React.FC = () => (
    <Section title="Análisis Predictivo con IA" icon={BrainCircuit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {mockData.aiPredictions.map(pred => (
                <div key={pred.title} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <pred.icon className={`w-6 h-6 mb-2 ${pred.colorClass === 'success' ? 'text-green-400' : pred.colorClass === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`} />
                    <h4 className="font-semibold">{pred.title}</h4>
                    <p className="text-xl font-bold">{pred.value}</p>
                    <p className="text-xs text-gray-400">{pred.details}</p>
                </div>
            ))}
        </div>
        <div>
            <h4 className="text-md font-semibold text-white mb-2">🔔 Alertas Inteligentes</h4>
            <div className="space-y-2">
                {mockData.smartAlerts.map(alert => (
                    <div key={alert.text} className={`flex justify-between items-center p-2 rounded-lg text-sm ${alert.urgent ? 'bg-red-500/10 text-red-300' : 'bg-gray-700/50'}`}>
                        <span>{alert.text}</span>
                        <button className="px-3 py-1 text-xs bg-gray-700 rounded-md hover:bg-gray-600">Ver Caso</button>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const CaseManagement: React.FC = () => {
    const statusColors = { active: 'bg-blue-500', urgent: 'bg-red-500', completed: 'bg-green-500', pending: 'bg-yellow-500' };
    return (
        <Section title="Gestión de Casos Avanzada" icon={ClipboardList}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {mockData.caseStatusOverview.map(s => (
                    <div key={s.label} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center">
                        <p className="text-3xl font-bold">{s.count}</p>
                        <p className="text-sm text-gray-400">{s.label}</p>
                    </div>
                ))}
            </div>
             <h4 className="text-md font-semibold text-white mb-2">⏰ Actividad Reciente</h4>
             <div className="space-y-2">
                 {mockData.recentCases.map(c => (
                     <div key={c.title} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                        <div className={cn("w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0", statusColors[c.status as keyof typeof statusColors])}></div>
                        <div className="flex-grow">
                            <p className="font-medium">{c.title}</p>
                            <p className="text-xs text-gray-400">{c.details}</p>
                        </div>
                        <span className="text-xs text-gray-500">{c.time}</span>
                     </div>
                 ))}
             </div>
        </Section>
    )
};

const ChannelPerformance: React.FC = () => (
    <Section title="Rendimiento por Canal IA" icon={MessageSquare}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                <h4 className="font-bold mb-2">ELIAS WhatsApp</h4>
                <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Conversaciones</span><span className="font-bold">{mockData.channelPerformance.whatsapp.conversations}</span></div>
                <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${mockData.channelPerformance.whatsapp.usage}%` }}></div></div>
                <p className="text-xs text-center text-gray-500 mt-1">{mockData.channelPerformance.whatsapp.usageText}</p>
            </div>
             <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                <h4 className="font-bold mb-2">ELIAS Llamadas</h4>
                <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Minutos</span><span className="font-bold">{mockData.channelPerformance.calls.minutes}</span></div>
                <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${mockData.channelPerformance.calls.usage}%` }}></div></div>
                <p className="text-xs text-center text-gray-500 mt-1">{mockData.channelPerformance.calls.usageText}</p>
            </div>
        </div>
        <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.monthlyConversations}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)' }} />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Bar dataKey="WhatsApp" stackId="a" fill="#25D366" />
                    <Bar dataKey="Llamadas" stackId="a" fill="#8B5CF6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Section>
);

const ReportsCenter: React.FC = () => (
    <Section title="Centro de Reportes Ejecutivos" icon={FileText}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                 <h4 className="text-md font-semibold text-white mb-2">📁 Reportes Recientes</h4>
                 <div className="space-y-2">
                     {mockData.recentReports.map(r => (
                         <div key={r.title} className="flex items-center p-2 bg-gray-800/50 rounded-lg">
                            <r.icon className="w-5 h-5 mr-3 text-gray-400" />
                            <div className="flex-grow">
                                <p className="text-sm font-medium">{r.title}</p>
                                <p className="text-xs text-gray-500">{r.details}</p>
                            </div>
                            <button className="p-1.5 hover:bg-gray-700 rounded-md"><Download size={14}/></button>
                         </div>
                     ))}
                 </div>
            </div>
            <div>
                <h4 className="text-md font-semibold text-white mb-2">📋 Plantillas de Reportes</h4>
                <div className="space-y-2">
                    {mockData.reportTemplates.map(t => (
                        <div key={t.title} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
                             <div className="flex items-center">
                                <t.icon className="w-5 h-5 mr-3 text-gray-400" />
                                <p className="text-sm font-medium">{t.title}</p>
                            </div>
                            <button className="text-xs px-2 py-1 bg-gray-700 rounded-md hover:bg-gray-600">Usar</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Section>
);

const TeamPerformance: React.FC = () => {
    const specialtyColors = { Laboral: 'bg-blue-500/20 text-blue-300', Familia: 'bg-pink-500/20 text-pink-300', Penal: 'bg-red-500/20 text-red-300' };
    return (
        <Section title="Rendimiento del Equipo" icon={Users2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-gray-400 uppercase">
                            <tr>
                                <th className="p-2 text-left">Abogado</th>
                                <th className="p-2 text-center">Casos</th>
                                <th className="p-2 text-center">Tasa Éxito</th>
                                <th className="p-2 text-right">Facturación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockData.teamPerformance.table.map(lawyer => (
                                <tr key={lawyer.name} className={`border-t border-gray-700 ${lawyer.isTop ? 'bg-yellow-500/5' : ''}`}>
                                    <td className="p-2 font-medium">{lawyer.name}</td>
                                    <td className="p-2 text-center">{lawyer.activeCases}</td>
                                    <td className="p-2 text-center text-green-400">{lawyer.successRate}%</td>
                                    <td className="p-2 text-right font-mono">{formatARS(lawyer.revenue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                     <h4 className="text-md font-semibold text-white mb-2">🏆 Ranking del Mes</h4>
                     <div className="space-y-2">
                        <div className="flex items-center p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
                            <span className="text-yellow-400 font-bold mr-3">🥇</span>
                            <div>
                                <p className="font-bold text-white">{mockData.teamPerformance.ranking.first.name}</p>
                                <p className="text-xs text-yellow-300">{mockData.teamPerformance.ranking.first.achievement}</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-400/10 rounded-lg border border-gray-400/30">
                             <span className="text-gray-400 font-bold mr-3">🥈</span>
                             <div>
                                <p className="font-semibold text-white">{mockData.teamPerformance.ranking.second.name}</p>
                                <p className="text-xs text-gray-300">{mockData.teamPerformance.ranking.second.achievement}</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-orange-400/10 rounded-lg border border-orange-400/30">
                            <span className="text-orange-400 font-bold mr-3">🥉</span>
                            <div>
                                <p className="font-semibold text-white">{mockData.teamPerformance.ranking.third.name}</p>
                                <p className="text-xs text-orange-300">{mockData.teamPerformance.ranking.third.achievement}</p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </Section>
    )
};


const DashboardPremium: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500); // Short delay for premium feel
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div><span className="text-transparent">.</span></div>; // Prevents flash of old content
    }

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
           <FinancialOverview />
           <AiAnalysis />
           <CaseManagement />
           <ChannelPerformance />
           <ReportsCenter />
           <TeamPerformance />
        </motion.div>
    );
};

export default DashboardPremium;