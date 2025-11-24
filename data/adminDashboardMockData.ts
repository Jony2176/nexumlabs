
import { DollarSign, Users, TrendingDown, Target, UserPlus, Share2, Eye, Edit, Tag, Mail, AlertCircle, FileText, Download, RefreshCw, Settings, LucideIcon } from 'lucide-react';
import { KPICardData, ClientData, AlertData } from '../types';

export const kpis: KPICardData[] = [
  {
    title: "Ingresos Mensuales (MRR)",
    value: "$2,032",
    valueInARS: "$2,240,530",
    subtitle: "Total facturado por suscripciones activas",
    change: 6.9, // Simulated growth
    trend: 'up',
    target: "$30,000",
    icon: DollarSign
  },
  {
    title: "Clientes Totales",
    value: "8",
    change: 1,
    trend: 'up',
    subtitle: "6 activos, 2 en trial",
    icon: Users
  },
  {
    title: "Conversión Trial",
    value: "75%",
    change: 5.0,
    trend: 'up',
    target: "> 60%",
    alert: false,
    icon: Target,
    subtitle: "6 de 8 orgs activas"
  },
  {
    title: "Revenue Total",
    value: "$2,630",
    change: 15.2,
    trend: 'up',
    subtitle: "11 pagos aprobados",
    icon: DollarSign
  },
  {
    title: "Afiliados Activos",
    value: "8",
    change: 1,
    trend: 'up',
    subtitle: "9 registrados en total",
    icon: UserPlus
  },
  {
    title: "Comisiones Pendientes",
    value: "$12,514",
    change: 10.5,
    trend: 'up',
    subtitle: "Balance acumulado a pagar",
    icon: Share2
  }
];

export const mrrData = [
  { mes: 'Jun 25', real: 800, proyectado: 800 },
  { mes: 'Jul 25', real: 1100, proyectado: 1200 },
  { mes: 'Ago 25', real: 1450, proyectado: 1600 },
  { mes: 'Sep 25', real: 1750, proyectado: 2000 },
  { mes: 'Oct 25', real: 1900, proyectado: 2400 },
  { mes: 'Nov 25', real: 2032, proyectado: 2800 },
  { mes: 'Dic 25', real: null, proyectado: 2400 },
  { mes: 'Ene 26', real: null, proyectado: 2900 }
];

export const revenueByProduct = [
  { producto: 'Suscripciones', valor: 2032, fill: '#6366F1' },
  { producto: 'Consumo Extra', valor: 450, fill: '#8B5CF6' },
  { producto: 'Setup Fees', valor: 148, fill: '#EC4899' }
];

// Use mockClients from adminClientsMockData instead of defining here to avoid duplication
export const clientsData: ClientData[] = []; 

export const quickActions: { icon: LucideIcon; label: string; color: string; key: string }[] = [
  { icon: UserPlus, label: 'Agregar Cliente', color: 'green', key: 'add_client' },
  { icon: Mail, label: 'Email Masivo', color: 'blue', key: 'bulk_email' },
  { icon: Tag, label: 'Crear Descuento', color: 'purple', key: 'create_discount' },
  { icon: Download, label: 'Exportar Datos', color: 'gray', key: 'export_data' },
  { icon: RefreshCw, label: 'Sync Payments', color: 'orange', key: 'sync_payments' },
  { icon: Settings, label: 'Configuración', color: 'slate', key: 'settings' },
];

export const alerts: AlertData[] = [
  { type: 'error', title: 'Límite de llamadas alcanzado', description: 'Abogados & Partners (5000/5000).', action: { label: 'Ver consumo' }},
  { type: 'error', title: 'Degradación API', description: 'Latencia media 850ms vs 500ms objetivo.', action: { label: 'Ver logs' }},
  { type: 'warning', title: 'Límite WhatsApp próximo', description: 'Consultores Legales SA al 90% (45k/50k).', action: { label: 'Notificar' }},
  { type: 'warning', title: 'Trial por vencer', description: 'Abogados López SRL expira en 3 días.', action: { label: 'Contactar' }},
  { type: 'warning', title: 'Trial por vencer', description: 'Asesoría Legal Ramírez expira en 5 días.', action: { label: 'Contactar' }},
  { type: 'info', title: 'Pago pendiente', description: 'Abogados López SRL: $79 USD.', action: { label: 'Ver detalle' }},
];

export const topAffiliates = [
    { nombre: 'Carolina Vega', referidos: 18, revenue: 3450.60 },
    { nombre: 'María Rodríguez', referidos: 12, revenue: 2340.80 },
    { nombre: 'Patricia Herrera', referidos: 9, revenue: 1890.30 },
    { nombre: 'Diego Flores', referidos: 7, revenue: 1678.90 },
    { nombre: 'Demo Affiliate', referidos: 8, revenue: 1250.50 },
];
