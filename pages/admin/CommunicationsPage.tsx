
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
// FIX: Added ArrowUp and ArrowDown to lucide-react imports to resolve 'Cannot find name' errors.
import { Mail, BarChart2, MousePointerClick, Users, Bold, Italic, Underline, List, ListOrdered, Link2, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Play, Pause, Edit, Copy, Eye, Send, History, Check, X, Settings, ChevronDown, Rocket, Calendar, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';

// --- MOCK DATA ---
const kpiData = {
    emailsSent: { value: 1247, change: 18.3, sparkline: [800, 950, 900, 1100, 1050, 1247] },
    openRate: { value: 34.5, industryAvg: '25-30%', badge: { text: "SOBRE PROMEDIO", color: 'green' } },
    clickRate: { value: 8.2, bestCampaign: '12.5%' },
    subscribers: { value: 342, growth: 23 }
};

const templates = [
    { name: 'Bienvenida Nuevo Cliente', used: 15, openRate: 67 },
    { name: 'Recordatorio de Pago', used: 8, openRate: 45 },
    { name: 'Nueva Feature Disponible', used: 3, openRate: 38 },
    { name: 'Newsletter Mensual', used: 12, openRate: 31 },
    { name: 'Oferta Especial', used: 5, openRate: 42 },
    { name: 'Encuesta de Satisfacción', used: 2, openRate: 28 },
    { name: 'Reactivación Cliente Inactivo', used: 6, openRate: 22 },
    { name: 'Invitación a Webinar', used: 4, openRate: 35 },
];

const campaigns = [
    { date: '2025-10-15', subject: "Novedades de Octubre", audience: "342 suscriptores", sent: 342, opened: 31, clicks: 8, bounces: 2, status: 'Enviado' },
    { date: '2025-10-10', subject: "Última oportunidad: Descuento Pro", audience: "8 clientes en trial", sent: 8, opened: 62, clicks: 25, bounces: 0, status: 'Enviado' },
    { date: '2025-10-05', subject: "Bienvenido a NEXUM", audience: "Nuevos Clientes (Auto)", sent: 3, opened: 75, clicks: 33, bounces: 0, status: 'Enviado' },
    { date: '2025-10-01', subject: "Tu reporte mensual de afiliado", audience: "89 afiliados", sent: 89, opened: 41, clicks: 12, bounces: 1, status: 'Enviado' },
    { date: '2025-11-01', subject: "Avance de Noviembre", audience: "Todos los contactos (354)", sent: 0, opened: 0, clicks: 0, bounces: 0, status: 'Programado' },
    { date: 'Borrador', subject: "Ideas para Q4", audience: "Clientes Plan Professional (8)", sent: 0, opened: 0, clicks: 0, bounces: 0, status: 'Borrador' },
];

const segments = [
    { name: 'Clientes Plan Lite', count: 7 }, { name: 'Clientes Plan Pro', count: 10 }, { name: 'Clientes Plan Professional', count: 8 },
    { name: 'Afiliados Top Performance', count: 12 }, { name: 'Clientes en riesgo churn', count: 3 }, { name: 'Trial expirado', count: 8 },
];

const automations = [
    { name: 'Onboarding Nuevos Clientes', status: 'Activo', details: '5 emails en 14 días', completion: 78 },
    { name: 'Recordatorio Pre-vencimiento', status: 'Activo', details: '1 email 3 días antes', sentThisMonth: 8 },
    { name: 'Re-engagement Inactivos', status: 'Pausado', details: '3 emails en 30 días', lastRun: 'hace 15 días' },
];

const activities = [
    "hace 2h: Email 'Novedades de Octubre' enviado a 342 contactos",
    "hace 5h: Juan Pérez abrió 'Recordatorio de pago'",
    "hace 1d: Nueva suscripción al newsletter: maria@estudio.com",
    "hace 2d: Campaña 'Nuevo Feature' - 45% tasa apertura"
];

// --- SUB-COMPONENTS ---

const CommunicationsKPICard = ({ title, mainValue, secondaryValue, change, trend, badge, sparklineData }: any) => {
    const trendColor = trend === 'up' ? 'text-green-400' : 'text-red-400';
    const badgeColor = badge?.color === 'green' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300';

    return (
        <Card className="h-full flex flex-col justify-between">
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white mt-1">{mainValue}</p>
                <p className="text-xs text-gray-500 truncate">{secondaryValue}</p>
            </div>
            <div className="mt-2">
                {change && trend && (
                    <div className={`flex items-center text-xs font-semibold ${trendColor}`}>
                        {trend === 'up' ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                        {change}% vs mes anterior
                    </div>
                )}
                {badge && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge.text}</span>}
                {sparklineData && (
                    <div className="h-10 -mx-4 -mb-4 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sparklineData.map((v: number) => ({ value: v }))}>
                                <defs>
                                    <linearGradient id="sparkline" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="url(#sparkline)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </Card>
    );
};

const EmailComposer = ({ onSelectTemplate }: { onSelectTemplate: (content: string) => void }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('Hola {{nombre}},<br><br>Este es un espacio para tu mensaje...');
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(editorRef.current) editorRef.current.innerHTML = content;
    }, [content]);

    const handleFormat = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };
    
    const insertVariable = (variable: string) => {
        handleFormat('insertHTML', `&nbsp;<span contenteditable="false" style="color: #60A5FA; background-color: #374151; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${variable}</span>&nbsp;`);
    }

    const handleSend = (type: 'now' | 'schedule' | 'draft') => {
        if (!subject) {
            toast.error('El asunto es obligatorio.');
            return;
        }
        if (type === 'now') toast.success('Email enviado a la cola de procesamiento.');
        if (type === 'schedule') toast.success('Email programado correctamente.');
        if (type === 'draft') toast.success('Borrador guardado.');
    }

    return (
        <Card className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Crear Comunicación</h2>
            </div>
            <div className="flex-grow p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto">
                {/* Editor Column */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-300">Audiencia</label>
                        <select className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm">
                            <option>Todos los contactos (354)</option>
                            <option>Solo clientes activos (25)</option>
                            <option>Solo afiliados (89)</option>
                            <option>Clientes en trial (5)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Asunto</label>
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} maxLength={150} className="w-full mt-1 bg-gray-900 border border-gray-600 rounded-md p-2 text-sm" />
                    </div>
                    <div>
                        <div className="bg-gray-700 rounded-t-lg p-2 flex flex-wrap gap-2 border-b border-gray-600">
                           <button onClick={() => handleFormat('bold')} className="p-1 hover:bg-gray-600 rounded"><Bold size={16}/></button>
                           <button onClick={() => handleFormat('italic')} className="p-1 hover:bg-gray-600 rounded"><Italic size={16}/></button>
                           <button onClick={() => handleFormat('underline')} className="p-1 hover:bg-gray-600 rounded"><Underline size={16}/></button>
                           <button onClick={() => handleFormat('insertUnorderedList')} className="p-1 hover:bg-gray-600 rounded"><List size={16}/></button>
                           <button onClick={() => handleFormat('insertOrderedList')} className="p-1 hover:bg-gray-600 rounded"><ListOrdered size={16}/></button>
                        </div>
                        <div ref={editorRef} contentEditable onInput={e => setContent((e.target as HTMLDivElement).innerHTML)} className="w-full h-64 bg-gray-900 p-3 rounded-b-lg border border-t-0 border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 overflow-y-auto" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-300">Variables Dinámicas</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {['{{nombre}}', '{{empresa}}', '{{plan_actual}}', '{{link_referido}}'].map(v => 
                               <button key={v} onClick={() => insertVariable(v)} className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600">{v}</button>
                           )}
                        </div>
                    </div>
                </div>
                {/* Preview Column */}
                <div className="flex flex-col">
                    <div className="flex justify-center gap-2 mb-2 p-1 bg-gray-700 rounded-lg">
                        <button onClick={() => setPreviewMode('desktop')} className={cn('px-3 py-1 text-sm rounded-md', previewMode === 'desktop' && 'bg-gray-600')}>Desktop</button>
                        <button onClick={() => setPreviewMode('mobile')} className={cn('px-3 py-1 text-sm rounded-md', previewMode === 'mobile' && 'bg-gray-600')}>Mobile</button>
                    </div>
                    <div className="flex-grow bg-gray-900/50 rounded-lg p-4 flex items-center justify-center">
                        <div className={cn("bg-white text-black overflow-y-auto transition-all duration-300 rounded-md shadow-lg", previewMode === 'desktop' ? 'w-full h-full' : 'w-[320px] h-[568px]')}>
                             <div className="p-4" dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="test-email-check" className="bg-gray-700 border-gray-600" />
                    <label htmlFor="test-email-check" className="text-sm">Enviar prueba a:</label>
                    <input type="email" placeholder="admin@nexum.com" className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-48"/>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => handleSend('draft')}>Guardar Borrador</Button>
                    <Button onClick={() => handleSend('now')}>Enviar Ahora</Button>
                </div>
            </div>
        </Card>
    );
};

const TemplateGallery = ({ onSelect }: { onSelect: (content: string) => void }) => (
    <Card>
        <div className="p-4 border-b border-gray-700"><h3 className="font-semibold">Plantillas</h3></div>
        <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
            {templates.map(t => (
                <div key={t.name} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800">
                    <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-gray-400">Apertura: {t.openRate}%</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => onSelect(`Contenido de plantilla: ${t.name}`)}>Usar</Button>
                </div>
            ))}
        </div>
    </Card>
);

const CampaignHistoryTable = () => (
    <Card className="mt-6">
        <div className="p-4 border-b border-gray-700"><h3 className="font-semibold">Historial de Campañas</h3></div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-700/50 text-xs text-gray-400 uppercase">
                    <tr>
                        <th className="p-3 text-left">Asunto</th>
                        <th className="p-3 text-left">Audiencia</th>
                        <th className="p-3 text-center hidden md:table-cell">Enviados</th>
                        <th className="p-3 text-center hidden lg:table-cell">Apertura</th>
                        <th className="p-3 text-center">Estado</th>
                        <th className="p-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.slice(0, 5).map((c, i) => (
                        <tr key={i} className="border-b border-gray-700">
                            <td className="p-3 font-medium">{c.subject}</td>
                            <td className="p-3 text-gray-400">{c.audience}</td>
                            <td className="p-3 text-center hidden md:table-cell">{c.sent || '-'}</td>
                            <td className="p-3 text-center hidden lg:table-cell">{c.opened > 0 ? `${c.opened}%` : '-'}</td>
                            <td className="p-3 text-center"><span className={cn('px-2 py-0.5 text-xs rounded-full', c.status === 'Enviado' ? 'bg-green-500/20 text-green-300' : c.status === 'Programado' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300')}>{c.status}</span></td>
                            <td className="p-3 text-center"><div className="flex gap-1 justify-center"><Button size="icon" variant="ghost"><Eye size={14}/></Button><Button size="icon" variant="ghost"><Copy size={14}/></Button></div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);

// --- MAIN PAGE COMPONENT ---
const CommunicationsPage: React.FC = () => {
    const [emailContent, setEmailContent] = useState('');

    return (
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <h1 className="text-3xl font-bold">Centro de Comunicaciones</h1>
                <p className="text-gray-400 mt-1">Gestiona emails masivos, newsletters y campañas.</p>
            </div>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <CommunicationsKPICard title="Emails Enviados (Mes)" mainValue={kpiData.emailsSent.value.toLocaleString()} change={kpiData.emailsSent.change} trend="up" sparklineData={kpiData.emailsSent.sparkline} />
                <CommunicationsKPICard title="Tasa de Apertura Prom." mainValue={`${kpiData.openRate.value}%`} secondaryValue={`Industria: ${kpiData.openRate.industryAvg}`} badge={kpiData.openRate.badge} />
                <CommunicationsKPICard title="Click Rate Prom." mainValue={`${kpiData.clickRate.value}%`} secondaryValue={`Mejor campaña: ${kpiData.clickRate.bestCampaign}`} />
                <CommunicationsKPICard title="Suscriptores Newsletter" mainValue={kpiData.subscribers.value.toLocaleString()} secondaryValue={`Crecimiento: +${kpiData.subscribers.growth}/mes`} />
            </div>
            
            {/* Composer & Tools */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <EmailComposer onSelectTemplate={setEmailContent} />
                </div>
                <div className="space-y-6">
                    <TemplateGallery onSelect={setEmailContent} />
                    {/* Activity Feed */}
                    <Card>
                        <div className="p-4 border-b border-gray-700"><h3 className="font-semibold">Actividad Reciente</h3></div>
                        <div className="p-4 space-y-2 text-xs text-gray-400 max-h-40 overflow-y-auto">
                            {activities.map((act, i) => <p key={i}>- {act}</p>)}
                        </div>
                    </Card>
                </div>
            </div>

            {/* History, Segments, Automations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CampaignHistoryTable />
                </div>
                <div className="space-y-6">
                     <Card>
                        <div className="p-4 border-b border-gray-700"><h3 className="font-semibold">Audiencias y Segmentos</h3></div>
                        <div className="p-4 space-y-2">
                            {segments.map(s => <div key={s.name} className="flex justify-between text-sm p-2 rounded-md bg-gray-800"><span>{s.name}</span><span className="text-gray-400">{s.count} contactos</span></div>)}
                            <Button variant="outline" className="w-full mt-2">Crear Segmento</Button>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-4 border-b border-gray-700"><h3 className="font-semibold">Automatizaciones Activas</h3></div>
                        <div className="p-4 space-y-3">
                            {automations.map(a => (
                                <div key={a.name} className="p-2 bg-gray-800 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{a.name}</p>
                                        <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', a.status === 'Activo' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300')}>{a.status}</span>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1 flex justify-between"><span>{a.details}</span><button className="hover:text-white">Ver Métricas</button></div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

export default CommunicationsPage;
