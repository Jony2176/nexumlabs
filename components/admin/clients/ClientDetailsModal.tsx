import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClientData } from '../../../types';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { X, User, FileText, BarChart2, CreditCard, Activity, MessageSquare } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientData | null;
}

const consumptionData = [
  { month: 'Abr', WhatsApp: 120, Llamadas: 50 }, { month: 'May', WhatsApp: 300, Llamadas: 90 },
  { month: 'Jun', WhatsApp: 250, Llamadas: 150 }, { month: 'Jul', WhatsApp: 450, Llamadas: 180 },
  { month: 'Ago', WhatsApp: 600, Llamadas: 220 }, { month: 'Sep', WhatsApp: 850, Llamadas: 450 },
];

const activityData = [
    { event: "Cuenta Creada", date: "2024-01-15T10:00:00Z", user: "Sistema" },
    { event: "Suscripción a Plan Professional", date: "2024-01-15T10:05:00Z", user: "R. Martínez" },
    { event: "Pago Exitoso", date: "2024-09-01T10:00:00Z", user: "Sistema" },
    { event: "Health Score bajó a 65", date: "2024-08-20T14:00:00Z", user: "Alerta" },
];

const paymentsData = [
    { id: 'pay_1', date: "2024-09-01T10:00:00Z", amount: 320, status: 'paid' },
    { id: 'pay_2', date: "2024-08-01T10:00:00Z", amount: 320, status: 'paid' },
    { id: 'pay_3', date: "2024-07-01T10:00:00Z", amount: 320, status: 'paid' },
];

const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'subscription', label: 'Suscripción', icon: FileText },
    { id: 'consumption', label: 'Consumo', icon: BarChart2 },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'activity', label: 'Actividad', icon: Activity },
    { id: 'notes', label: 'Notas', icon: MessageSquare },
];

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({ isOpen, onClose, client }) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!client) return null;

  const renderContent = () => {
      switch (activeTab) {
          case 'general':
            return <div className="space-y-2 text-gray-300"><p><strong>CUIT:</strong> {client.cuit}</p><p><strong>Dirección:</strong> {client.direccion}</p><p><strong>Contacto Principal:</strong> {client.contacto}</p></div>;
          case 'subscription':
             return <div className="space-y-2 text-gray-300"><p><strong>Plan:</strong> {client.plan}</p><p><strong>MRR:</strong> {formatCurrency(client.mrr)}</p><p><strong>Próximo Pago:</strong> {formatDate(new Date(new Date(client.ultimoPago.fecha).setMonth(new Date(client.ultimoPago.fecha).getMonth() + 1)).toISOString())}</p></div>;
          case 'consumption':
            return <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={consumptionData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" /><XAxis dataKey="month" tick={{ fill: '#9ca3af' }}/><YAxis tick={{ fill: '#9ca3af' }} /><Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}/><Area type="monotone" dataKey="WhatsApp" stackId="1" stroke="#3b82f6" fill="#3b82f6" /><Area type="monotone" dataKey="Llamadas" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" /></AreaChart></ResponsiveContainer></div>;
          case 'payments':
             return <ul className="space-y-2">{paymentsData.map(p => <li key={p.id} className="flex justify-between p-2 rounded-md bg-gray-900/50"><span>{formatDate(p.date)}</span><span>{formatCurrency(p.amount)}</span><span className="capitalize text-green-400">{p.status}</span></li>)}</ul>;
          case 'activity':
              return <ul className="space-y-2">{activityData.map((act, i) => (<li key={i} className="text-sm p-2 rounded-md bg-gray-900/50"><span className="text-gray-500">{formatDate(act.date)}:</span> <span className="text-white">{act.event}</span> <span className="text-gray-400">({act.user})</span></li>))}</ul>;
          case 'notes':
              return <textarea className="w-full h-48 bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200" placeholder="Escribir notas internas..."></textarea>;
          default:
            return null;
      }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-white">{client.empresa}</h2>
                    <p className="text-sm text-gray-400">{client.contacto}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
              </div>
              <div className="flex">
                  <div className="w-48 border-r border-gray-700 p-4 bg-gray-900/20">
                      <nav className="space-y-1">
                          {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}>
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                          ))}
                      </nav>
                  </div>
                  <div className="flex-1 p-6 max-h-[60vh] overflow-y-auto">
                      <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                      </AnimatePresence>
                  </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ClientDetailsModal;