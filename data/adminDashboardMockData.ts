import { DollarSign, Users, TrendingDown, Target, UserPlus, Share2, Eye, Edit, Tag, Mail, AlertCircle, FileText, Download, RefreshCw, Settings, LucideIcon } from 'lucide-react';
import { KPICardData, ClientData, AlertData } from '../types';

export const kpis: KPICardData[] = [
  {
    title: "Ingresos Mensuales",
    value: "$15,234",
    valueInARS: "$19,244,826",
    subtitle: "Total facturado por suscripciones este mes",
    change: 12.5,
    trend: 'up',
    target: "$20,000",
    icon: DollarSign
  },
  {
    title: "Clientes Activos",
    value: "25",
    change: 8.3,
    trend: 'up',
    subtitle: "3 nuevos este mes",
    icon: Users
  },
  {
    title: "Tasa de Cancelación",
    value: "8%",
    change: -2.1,
    trend: 'down',
    target: "< 5%",
    alert: true,
    icon: TrendingDown,
    subtitle: "Clientes que cancelaron este mes"
  },
  {
    title: "Valor del Cliente",
    value: "$3,847",
    change: 18.2,
    trend: 'up',
    subtitle: "Costo por Cliente Nuevo: $312",
    icon: Target
  },
  {
    title: "Afiliados Activos",
    value: "89",
    change: 24.5,
    trend: 'up',
    subtitle: "15 nuevos esta semana",
    icon: UserPlus
  },
  {
    title: "Ingresos por Referidos",
    value: "$4,234",
    change: 31.2,
    trend: 'up',
    subtitle: "28% de los ingresos totales",
    icon: Share2
  }
];

export const mrrData = [
  { mes: 'Oct 24', real: 2500, proyectado: 2500 },
  { mes: 'Nov 24', real: 3200, proyectado: 3500 },
  { mes: 'Dic 24', real: 4800, proyectado: 5000 },
  { mes: 'Ene 25', real: 6100, proyectado: 6500 },
  { mes: 'Feb 25', real: 7500, proyectado: 8000 },
  { mes: 'Mar 25', real: 8900, proyectado: 9500 },
  { mes: 'Abr 25', real: 10200, proyectado: 11000 },
  { mes: 'May 25', real: 11500, proyectado: 12500 },
  { mes: 'Jun 25', real: 12800, proyectado: 14000 },
  { mes: 'Jul 25', real: 13900, proyectado: 16000 },
  { mes: 'Ago 25', real: 14500, proyectado: 17000 },
  { mes: 'Sep 25', real: 15234, proyectado: 18000 },
  { mes: 'Oct 25', real: null, proyectado: 22000 },
  { mes: 'Nov 25', real: null, proyectado: 28000 },
  { mes: 'Dic 25', real: null, proyectado: 35000 }
];

export const revenueByProduct = [
  { producto: 'ELIAS WhatsApp', valor: 8500, fill: '#667eea' },
  { producto: 'ELIAS Llamadas', valor: 3200, fill: '#764ba2' },
  { producto: 'Dashboard Premium', valor: 2100, fill: '#86efac' },
  { producto: 'Add-ons', valor: 1434, fill: '#f59e0b' }
];

export const clientsData: ClientData[] = [
    // FIX: Added missing 'fechaInicio' and 'ultimoPago' properties to match the ClientData type.
    { id: '1', empresa: 'Estudio Jurídico Norte', contacto: 'Roberto Martínez', plan: 'Professional', mrr: 320, estado: 'active', consumoWhatsApp: { value: 850, limit: 1000 }, consumoLlamadas: { value: 450, limit: 1000 }, healthScore: 92, fechaInicio: '2024-01-15T10:00:00Z', ultimoPago: { fecha: '2024-07-01T10:00:00Z', estado: 'paid' } },
    { id: '2', empresa: 'Legal & Co.', contacto: 'Ana Gómez', plan: 'Pro', mrr: 199, estado: 'active', consumoWhatsApp: { value: 400, limit: 1000 }, consumoLlamadas: { value: 120, limit: 300 }, healthScore: 75, fechaInicio: '2024-03-20T10:00:00Z', ultimoPago: { fecha: '2024-07-01T10:00:00Z', estado: 'paid' } },
    { id: '3', empresa: 'Abogados del Sur', contacto: 'Carlos Rodríguez', plan: 'Lite', mrr: 79, estado: 'trial', consumoWhatsApp: { value: 150, limit: 1000 }, consumoLlamadas: { value: 20, limit: 100 }, healthScore: 60, fechaInicio: '2024-06-25T10:00:00Z', ultimoPago: { fecha: '2024-07-01T10:00:00Z', estado: 'pending' } },
    { id: '4', empresa: 'Bufete Central', contacto: 'Lucía Fernández', plan: 'Business', mrr: 399, estado: 'active', consumoWhatsApp: { value: 980, limit: 1000 }, consumoLlamadas: { value: 2100, limit: 2500 }, healthScore: 45, fechaInicio: '2023-11-10T10:00:00Z', ultimoPago: { fecha: '2024-07-01T10:00:00Z', estado: 'failed' } },
    { id: '5', empresa: 'Consultores Legales', contacto: 'Miguel Torres', plan: 'Pro', mrr: 199, estado: 'cancelled', consumoWhatsApp: { value: 50, limit: 1000 }, consumoLlamadas: { value: 10, limit: 300 }, healthScore: 15, fechaInicio: '2024-02-01T10:00:00Z', ultimoPago: { fecha: '2024-06-01T10:00:00Z', estado: 'paid' } },
];

export const quickActions: { icon: LucideIcon; label: string; color: string; key: string }[] = [
  { icon: UserPlus, label: 'Agregar Cliente', color: 'green', key: 'add_client' },
  { icon: Mail, label: 'Email Masivo', color: 'blue', key: 'bulk_email' },
  { icon: Tag, label: 'Crear Descuento', color: 'purple', key: 'create_discount' },
  { icon: Download, label: 'Exportar Datos', color: 'gray', key: 'export_data' },
  { icon: RefreshCw, label: 'Sync Payments', color: 'orange', key: 'sync_payments' },
  { icon: Settings, label: 'Configuración', color: 'slate', key: 'settings' },
];

export const alerts: AlertData[] = [
  { type: 'warning', title: 'Alerta: Muchas cancelaciones', description: '3 clientes en riesgo de cancelar este mes.', action: { label: 'Ver clientes' }},
  { type: 'error', title: 'Pago Fallido', description: 'Estudio Rodríguez - Tarjeta rechazada.', action: { label: 'Contactar' }},
  { type: 'success', title: 'Nuevo Cliente Premium', description: 'Estudio Legal Norte - Plan Professional.', action: { label: 'Ver detalle' }},
  { type: 'info', title: 'API de WhatsApp', description: 'Meta requiere re-autenticación de la cuenta.', action: { label: 'Re-autenticar' }},
];

export const topAffiliates = [
    { nombre: 'María González', referidos: 12, revenue: 3420 },
    { nombre: 'Juan Pérez', referidos: 8, revenue: 2140 },
    { nombre: 'LegalGrowth Hackers', referidos: 7, revenue: 1980 },
    { nombre: 'Abogados 2.0', referidos: 5, revenue: 1540 },
];