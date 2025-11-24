
import { DollarSign, BarChart, TrendingUp, Users, Target, Zap } from 'lucide-react';

export const kpis = [
  { 
    title: "Ingresos Mensuales (MRR)", 
    value: "$2,032", 
    secondaryValue: "$2,240,530 ARS", 
    change: 6.9, 
    trend: 'up' as const, 
    sparklineData: [1400, 1600, 1800, 1900, 2032, 2032],
    icon: DollarSign
  },
  { 
    title: "Proyección Anual (ARR)", 
    value: "$24,384", 
    secondaryValue: "Basado en MRR actual",
    progress: 24.4, // Progress towards 100k goal
    icon: DollarSign
  },
  { 
    title: "Revenue Total Acumulado", 
    value: "$2,630",
    secondaryValue: "11 pagos aprobados históricamente",
    change: 15.2,
    trend: 'up' as const,
    icon: TrendingUp
  },
  { 
    title: "Ticket Promedio", 
    value: "$254", 
    secondaryValue: "Por suscripción activa",
    change: 2.1,
    trend: 'up' as const,
    icon: Users
  },
  { 
    title: "Costo Adquisición (CAC)", 
    value: "$185", 
    secondaryValue: "Estimado últimos 3 meses",
    change: -5.4,
    trend: 'down' as const,
    icon: Target
  },
  { 
    title: "Tasa Aprobación Pagos", 
    value: "73%", 
    secondaryValue: "11 de 15 intentos exitosos",
    badge: { text: "MEJORABLE", color: "yellow" as const },
    icon: Zap
  },
];

export const mrrData = [
    { mes: 'Jun 25', real: 800 }, { mes: 'Jul 25', real: 1100 }, { mes: 'Ago 25', real: 1450 },
    { mes: 'Sep 25', real: 1750 }, { mes: 'Oct 25', real: 1900 }, { mes: 'Nov 25', real: 2032 },
    { mes: 'Dic 25', proyectado: 2400 }, { mes: 'Ene 26', proyectado: 2900 }
];

export const revenueByProduct = [
  { name: 'Suscripciones', value: 2032, fill: '#6366F1' },
  { name: 'Consumo Extra', value: 450, fill: '#8B5CF6' },
  { name: 'Setup Fees', value: 148, fill: '#EC4899' },
];

export const cashFlowData = [
  { month: 'Jul', ingresos: 1100, gastos: 800, balance: 300 },
  { month: 'Ago', ingresos: 1450, gastos: 950, balance: 800 },
  { month: 'Sep', ingresos: 1750, gastos: 1100, balance: 1450 },
  { month: 'Oct', ingresos: 1900, gastos: 1250, balance: 2100 },
  { month: 'Nov', ingresos: 2630, gastos: 1800, balance: 2930 },
];

export const recentTransactions = [
  { id: 'pay_nov_04', date: '2025-11-15', client: 'Abogados & Partners', type: 'Suscripción Enterprise', amountUSD: 499, method: 'Credit Card', status: 'Completado' as const },
  { id: 'pay_nov_03', date: '2025-11-10', client: 'Estudio Fernández', type: 'Suscripción Pro', amountUSD: 219, method: 'Credit Card', status: 'Completado' as const },
  { id: 'pay_nov_02', date: '2025-11-05', client: 'Estudio Martínez', type: 'Suscripción Start', amountUSD: 139, method: 'Credit Card', status: 'Completado' as const },
  { id: 'pay_nov_01', date: '2025-11-01', client: 'Estudio Jurídico Demo', type: 'Suscripción Professional', amountUSD: 319, method: 'Credit Card', status: 'Completado' as const },
  { id: 'pay_oct_05', date: '2025-10-28', client: 'Consultores Legales SA', type: 'Suscripción Business', amountUSD: 419, method: 'Debit Card', status: 'Fallido' as const },
  { id: 'pay_oct_04', date: '2025-10-25', client: 'Bufete Legal González', type: 'Suscripción Pro', amountUSD: 219, method: 'MP Wallet', status: 'Completado' as const },
];

export const costs = {
  breakdown: [
    { category: "Infraestructura (AWS/Vercel)", amount: 450, color: "blue" },
    { category: "APIs IA (OpenAI/Anthropic)", amount: 320, color: "purple" },
    { category: "WhatsApp Business API", amount: 580, color: "green" },
    { category: "Comisiones Afiliados (Pagadas)", amount: 351, color: "yellow" },
    { category: "Herramientas SaaS", amount: 99, color: "pink" },
  ],
  total: 1800,
  grossMargin: 68.5,
  netMargin: 31.5,
};

export const projections = {
    mrrIn3Months: 3500,
    mrrIn6Months: 5800,
    mrrIn12Months: 12000,
    clientsForGoal: 120,
    progressToGoal: 6.6 // 8 clients / 120 goal
};
