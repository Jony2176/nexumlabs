
import { DollarSign, BarChart, TrendingUp, Users, Target, Zap } from 'lucide-react';

export const kpis = [
  { 
    title: "Ingresos Mensuales", 
    value: "$15,234", 
    secondaryValue: "Total facturado por suscripciones este mes", 
    change: 12.5, 
    trend: 'up' as const, 
    sparklineData: [4800, 6100, 7500, 8900, 12800, 15234],
    icon: DollarSign
  },
  { 
    title: "Facturación Anual", 
    value: "$182,808", 
    secondaryValue: "Proyección anual basada en el Ingreso Mensual",
    progress: 45.7,
    icon: DollarSign
  },
  { 
    title: "Crecimiento Mensual", 
    value: "+12.5%",
    secondaryValue: "Nuevos: $1,702 / Cancelaciones: -$423",
    change: 1.2,
    trend: 'up' as const,
    icon: TrendingUp
  },
  { 
    title: "Ingreso por Cliente", 
    value: "$609", 
    secondaryValue: "Promedio mensual por cliente activo",
    change: 8.3,
    trend: 'up' as const,
    icon: Users
  },
  { 
    title: "Costo por Cliente Nuevo", 
    value: "$312", 
    secondaryValue: "Inversión para adquirir un cliente",
    change: -5.4,
    trend: 'down' as const,
    icon: Target
  },
  { 
    title: "Rentabilidad por Cliente", 
    value: "12.3x", 
    secondaryValue: "Por cada $1 invertido, se generan $12.3",
    badge: { text: "SALUDABLE", color: "green" as const },
    icon: Zap
  },
];

export const mrrData = [
    { mes: 'Oct 24', real: 2500 }, { mes: 'Nov 24', real: 3200 }, { mes: 'Dic 24', real: 4800 },
    { mes: 'Ene 25', real: 6100 }, { mes: 'Feb 25', real: 7500 }, { mes: 'Mar 25', real: 8900 },
    { mes: 'Abr 25', real: 10200 }, { mes: 'May 25', real: 11500 }, { mes: 'Jun 25', real: 12800 },
    { mes: 'Jul 25', real: 13900 }, { mes: 'Ago 25', real: 14500 }, { mes: 'Sep 25', real: 15234 },
    { mes: 'Oct 25', proyectado: 17138 }, { mes: 'Nov 25', proyectado: 19280 }, { mes: 'Dic 25', proyectado: 21690 }
];

export const revenueByProduct = [
  { name: 'ELIAS WhatsApp', value: 8531, fill: '#6366F1' },
  { name: 'ELIAS Llamadas', value: 3199, fill: '#8B5CF6' },
  { name: 'Dashboard Premium', value: 2135, fill: '#EC4899' },
  { name: 'Add-ons', value: 1369, fill: '#F59E0B' },
];

export const cashFlowData = [
  { month: 'Abr', ingresos: 10200, gastos: 4500, balance: 25700 },
  { month: 'May', ingresos: 11500, gastos: 4800, balance: 32400 },
  { month: 'Jun', ingresos: 12800, gastos: 5100, balance: 40100 },
  { month: 'Jul', ingresos: 13900, gastos: 5500, balance: 48500 },
  { month: 'Ago', ingresos: 14500, gastos: 5800, balance: 57200 },
  { month: 'Sep', ingresos: 15234, gastos: 6073, balance: 66361 },
];

export const recentTransactions = [
  { id: 'txn_1', date: '2025-09-18 10:05', client: 'Estudio Jurídico Norte', type: 'Suscripción', amountUSD: 320, method: 'MercadoPago', status: 'Completado' as const },
  { id: 'txn_2', date: '2025-09-18 09:30', client: 'Legal & Co.', type: 'Upgrade', amountUSD: 121, method: 'MercadoPago', status: 'Completado' as const },
  { id: 'txn_3', date: '2025-09-17 15:45', client: 'Abogados del Sur', type: 'Suscripción', amountUSD: 79, method: 'Transferencia', status: 'Pendiente' as const },
  { id: 'txn_4', date: '2025-09-17 11:20', client: 'Bufete Central', type: 'Add-on', amountUSD: 47, method: 'MercadoPago', status: 'Completado' as const },
  { id: 'txn_5', date: '2025-09-16 18:00', client: 'Lex Veritas', type: 'Suscripción', amountUSD: 199, method: 'MercadoPago', status: 'Fallido' as const },
  { id: 'txn_6', date: '2025-09-16 14:10', client: 'Iuris Consultores', type: 'Suscripción', amountUSD: 199, method: 'MercadoPago', status: 'Completado' as const },
  { id: 'txn_7', date: '2025-09-15 12:00', client: 'Consultores Legales', type: 'Downgrade', amountUSD: -121, method: 'Crédito', status: 'Completado' as const },
  { id: 'txn_8', date: '2025-09-15 10:55', client: 'Poder Legal', type: 'Suscripción', amountUSD: 320, method: 'Transferencia', status: 'Completado' as const },
];

export const costs = {
  breakdown: [
    { category: "Infraestructura (AWS, servers)", amount: 1200, color: "blue" },
    { category: "APIs externas (OpenAI, WhatsApp)", amount: 2100, color: "purple" },
    { category: "Herramientas (n8n, Google)", amount: 450, color: "pink" },
    { category: "Comisiones afiliados", amount: 1523, color: "green" },
    { category: "Marketing", amount: 800, color: "yellow" },
  ],
  total: 6073,
  grossMargin: 60.2,
  netMargin: 42.3,
};

export const projections = {
    mrrIn3Months: 22000,
    mrrIn6Months: 35000,
    mrrIn12Months: 75000,
    clientsForGoal: 164,
    progressToGoal: 15
};
