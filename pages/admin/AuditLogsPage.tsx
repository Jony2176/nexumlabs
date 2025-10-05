

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
    ChevronDown, ChevronUp, Search, SlidersHorizontal, Calendar, X, Download, Info, AlertTriangle, ChevronsRight,
    Copy, PauseCircle, PlayCircle, Trash2, RotateCw
} from 'lucide-react';
import toast from 'react-hot-toast';

// --- TYPES ---
type LogLevel = 'Debug' | 'Info' | 'Warning' | 'Error' | 'Critical';

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  user: string;
  event: string;
  details: string | object;
  ip: string;
  duration_ms: number;
}

// --- MOCK DATA ---
const generateMockLogs = (count: number): LogEntry[] => {
    const levels: LogLevel[] = ['Debug', 'Info', 'Warning', 'Error', 'Critical'];
    const users = ['usuario@demo.com', 'admin@nexum.com', 'afiliado@test.com', 'sistema', 'nuevo@cliente.com'];
    const events = ['Login exitoso', 'Cambio de plan', 'Error de pago', 'Acceso a módulo', 'API call', 'Intento de login fallido'];
    const ips = ['192.168.1.100', '200.58.110.34', '181.44.20.10', '190.138.50.2'];

    return Array.from({ length: count }, (_, i) => {
        const level = levels[Math.floor(Math.random() * levels.length)];
        return {
            id: `log_${Date.now()}_${i}`,
            timestamp: new Date(Date.now() - i * 1000 * 60 * Math.random()).toISOString(),
            level,
            user: users[Math.floor(Math.random() * users.length)],
            event: events[Math.floor(Math.random() * events.length)],
            details: level === 'Error' ? { error: 'Insufficient funds', customer: 'Estudio Legal Martinez' } : 'Operación completada exitosamente.',
            ip: ips[Math.floor(Math.random() * ips.length)],
            duration_ms: Math.floor(Math.random() * 500)
        };
    });
};

const initialLogs = generateMockLogs(50);

const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    events: Math.floor(Math.random() * 100) + 50,
    errors: Math.floor(Math.random() * 5) + (i > 18 && i < 22 ? 5 : 0),
    logins: Math.floor(Math.random() * 20),
    warnings: Math.floor(Math.random() * 10),
}));

// --- UI SUB-COMPONENTS ---

const StatCard: React.FC<{ title: string, value: string, subtitle: string }> = ({ title, value, subtitle }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
);

// FIX: Changed icon type to React.ElementType to allow props like 'size' to be passed correctly.
const levelConfig: Record<LogLevel, { color: string, darkColor: string, icon: React.ElementType }> = {
    Debug: { color: 'gray-500', darkColor: 'gray-400', icon: Info },
    Info: { color: 'blue-500', darkColor: 'blue-400', icon: Info },
    Warning: { color: 'yellow-500', darkColor: 'yellow-400', icon: AlertTriangle },
    Error: { color: 'red-500', darkColor: 'red-400', icon: AlertTriangle },
    Critical: { color: 'red-800', darkColor: 'red-500', icon: AlertTriangle },
};

const LogLevelBadge: React.FC<{ level: LogLevel }> = ({ level }) => {
    const { color, darkColor } = levelConfig[level];
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full bg-${color}/20 text-${darkColor}`}>{level}</span>
};

const ExpandedLogView: React.FC<{ log: LogEntry }> = ({ log }) => {
    const jsonString = JSON.stringify(log, null, 2);
    const handleCopy = () => {
        navigator.clipboard.writeText(jsonString);
        toast.success('Log copiado al portapapeles.');
    }
    return (
        <td colSpan={8} className="p-0">
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gray-900/50 relative"
            >
                <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-700 text-gray-400">
                    <Copy size={14} />
                </button>
                <pre className="p-4 text-xs text-gray-300 whitespace-pre-wrap break-all">{jsonString}</pre>
            </motion.div>
        </td>
    )
};

const LogTableRow: React.FC<{ log: LogEntry, isExpanded: boolean, onToggle: () => void }> = ({ log, isExpanded, onToggle }) => {
    const { icon: Icon, darkColor } = levelConfig[log.level];
    return (
        <>
            <tr className="border-b border-gray-700 hover:bg-gray-800/60 cursor-pointer" onClick={onToggle}>
                <td className="px-4 py-3"><Icon className={`text-${darkColor}`} size={16} /></td>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{new Date(log.timestamp).toLocaleString('es-AR')}</td>
                <td className="px-4 py-3"><LogLevelBadge level={log.level} /></td>
                <td className="px-4 py-3 text-white font-medium">{log.user}</td>
                <td className="px-4 py-3">{log.event}</td>
                <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{log.ip}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{log.duration_ms}ms</td>
                <td className="px-4 py-3 text-center">
                    <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                        <ChevronsRight size={16} />
                    </motion.div>
                </td>
            </tr>
            <AnimatePresence>
                {isExpanded && <ExpandedLogView log={log} />}
            </AnimatePresence>
        </>
    )
};

// --- MAIN PAGE COMPONENT ---
const AuditLogsPage: React.FC = () => {
    const [logs, setLogs] = useState(initialLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [expandedLogRow, setExpandedLogRow] = useState<string | null>(null);
    const [isLive, setIsLive] = useState(true);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);
    
    useEffect(() => {
        if(!isLive) return;
        const interval = setInterval(() => {
            setLogs(prev => [generateMockLogs(1)[0], ...prev]);
        }, 5000);
        return () => clearInterval(interval);
    }, [isLive]);
    
    const filteredLogs = logs.filter(log => 
        log.user.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        log.event.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        log.ip.includes(debouncedSearch)
    );
    
    const handleToggleRow = (id: string) => {
        setExpandedLogRow(prev => prev === id ? null : id);
    };

    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <h1 className="text-3xl font-bold">Logs de Auditoría del Sistema</h1>
                <div className="flex justify-between items-center">
                    <p className="text-gray-400 mt-1">Monitorea eventos, seguridad y rendimiento en tiempo real.</p>
                    {isLive && <div className="flex items-center gap-2 text-green-400 text-sm font-semibold"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>LIVE</div>}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Buscar en logs..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm" />
                    </div>
                    <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" defaultValue="Últimos 7 días" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-sm" />
                    </div>
                     <select className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 text-sm"><option>Todos los eventos</option><option>Autenticación</option><option>Pagos</option></select>
                     <select className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 text-sm"><option>Todos los niveles</option><option>Error</option><option>Critical</option></select>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600">
                           <SlidersHorizontal size={14} /> <span>Filtros Avanzados</span>
                        </button>
                    </div>
                     <div className="flex items-center gap-2">
                        <button className="text-sm text-gray-400 hover:text-white">Limpiar</button>
                        <button className="px-4 py-1.5 text-sm bg-blue-600 rounded-lg hover:bg-blue-500">Aplicar</button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Eventos (Hoy)" value="1,847" subtitle="Promedio diario: 2,100" />
                <StatCard title="Errores (24h)" value="12" subtitle="Tasa de error: 0.65%" />
                <StatCard title="Usuarios Únicos (Hoy)" value="18" subtitle="Pico simultáneo: 7" />
                <StatCard title="API Calls (Hoy)" value="4,523" subtitle="Rate limit hits: 0" />
            </div>

            {/* Chart */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 h-72">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="hour" tick={{ fill: '#9ca3af', fontSize: 10 }} interval={3}/>
                        <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                        <Legend wrapperStyle={{fontSize: "12px"}}/>
                        <Line type="monotone" dataKey="events" name="Eventos" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="errors" name="Errores" stroke="#ef4444" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            {/* Logs Table */}
             <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                            <tr>
                                <th className="px-4 py-3"></th>
                                <th className="px-4 py-3 text-left">Timestamp</th>
                                <th className="px-4 py-3 text-left">Nivel</th>
                                <th className="px-4 py-3 text-left">Usuario</th>
                                <th className="px-4 py-3 text-left">Evento</th>
                                <th className="px-4 py-3 text-left hidden md:table-cell">IP</th>
                                <th className="px-4 py-3 text-left hidden lg:table-cell">Duración</th>
                                <th className="px-4 py-3 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.slice(0, 25).map(log => (
                                <LogTableRow 
                                    key={log.id} 
                                    log={log} 
                                    isExpanded={expandedLogRow === log.id}
                                    onToggle={() => handleToggleRow(log.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Quick Actions */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-20">
                <button onClick={() => setIsLive(prev => !prev)} className="bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-600">
                    {isLive ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                </button>
                <button onClick={() => toast.success("Logs antiguos eliminados.")} className="bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-600">
                    <Trash2 size={20} />
                </button>
                 <button onClick={() => toast.success("Reporte del día descargado.")} className="bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-600">
                    <Download size={20} />
                </button>
            </div>

        </motion.div>
    );
};

export default AuditLogsPage;