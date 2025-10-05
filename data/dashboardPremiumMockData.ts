import { DollarSign, Clock, CheckCircle, TrendingUp, Scale, Users, Landmark, Home, BrainCircuit, ClipboardList, Smartphone, Users2, BarChart, FileText, Settings, Award, AlertTriangle, TrendingDown, Eye, Edit, Tag, Mail, XCircle, Send, Repeat, Wallet, LogIn, Target } from 'lucide-react';

// --- SECTION 1: FINANCIAL METRICS ---
export const financialKPIs = [
  {
    icon: DollarSign,
    title: "Ingresos Totales",
    amount: 2500000,
    trend: 12.1,
    details: "13 casos facturados",
    colorClass: "primary",
  },
  {
    icon: Clock,
    title: "Por Cobrar",
    amount: 575000,
    trend: 0,
    details: "2 pagos pendientes",
    colorClass: "warning",
  },
  {
    icon: CheckCircle,
    title: "Cobrado",
    amount: 446000,
    trend: 128.9,
    details: "11 casos completados",
    colorClass: "success",
  },
  {
    icon: TrendingUp,
    title: "Valor Promedio",
    amount: 192300,
    trend: 8.5,
    details: "Por caso cerrado",
    colorClass: "info",
  },
];

export const revenueByCaseType = [
  {
    icon: Scale,
    name: 'Laboral',
    revenue: 250000,
    caseCount: 5,
    avg: 50000,
    progress: 45
  },
  {
    icon: Users,
    name: 'Familia',
    revenue: 145000,
    caseCount: 3,
    avg: 48333,
    progress: 26
  },
  {
    icon: Landmark,
    name: 'Penal',
    revenue: 80000,
    caseCount: 2,
    avg: 40000,
    progress: 15
  },
  {
    icon: Home,
    name: 'Sucesiones',
    revenue: 50000,
    caseCount: 1,
    avg: 50000,
    progress: 9
  },
];

// --- SECTION 2: AI ANALYSIS ---
export const aiPredictions = [
  {
    icon: Target,
    title: "Casos con Alta Probabilidad de Éxito",
    value: "12 casos",
    details: "Valor estimado: $890.000",
    confidence: "87% de confianza",
    colorClass: "success"
  },
  {
    icon: AlertTriangle,
    title: "Casos en Riesgo",
    value: "3 casos",
    details: "Requieren atención inmediata",
    confidence: "Riesgo medio-alto",
    colorClass: "warning"
  },
  {
    icon: BarChart,
    title: "Proyección 30 días",
    value: "$1.250.000",
    details: "Basado en casos actuales",
    confidence: "↗️ Tendencia positiva",
    colorClass: "info"
  }
];

export const smartAlerts = [
    { text: 'Vencimiento de plazo en "Caso López" (2 días)', urgent: true, action: 'Ver Caso' },
    { text: 'Pago recibido de "Estudio Norte" - $50.000', urgent: false, action: 'Confirmar' }
];

// --- SECTION 3: CASE MANAGEMENT ---
export const caseStatusOverview = [
    { label: "Casos Activos", count: 8, trend: "↑ 2 esta semana", color: "active" },
    { label: "Urgentes", count: 3, trend: "⚠️ Requieren atención", color: "urgent" },
    { label: "Completados", count: 11, trend: "✅ Este mes", color: "completed" },
    { label: "Pago Pendiente", count: 1, trend: "💰 Por cobrar", color: "pending" }
];

export const recentCases = [
    { title: "Juan Pérez - Despido Laboral", details: "Completado • $50.000 • Normal", time: "Hace 2 horas", status: "completed" },
    { title: "María González - Divorcio", details: "Urgente • $45.000 • Familia", time: "Hace 4 horas", status: "urgent" },
    { title: "Carlos Rodríguez - Accidente", details: "Activo • $80.000 • Daños", time: "Ayer", status: "active" },
];


// --- SECTION 4: CHANNEL PERFORMANCE ---
export const channelPerformance = {
    whatsapp: { conversations: 189, conversion: 84.6, avgTime: "2.4 min", usage: 68, usageText: "3.420 / 5.000 mensajes" },
    calls: { minutes: 430, calls: 67, avgTime: "6.4 min", usage: 86, usageText: "430 / 500 minutos" }
};

export const monthlyConversations = [
  { name: 'Abr', WhatsApp: 400, Llamadas: 240 },
  { name: 'May', WhatsApp: 300, Llamadas: 139 },
  { name: 'Jun', WhatsApp: 200, Llamadas: 98 },
  { name: 'Jul', WhatsApp: 278, Llamadas: 390 },
  { name: 'Ago', WhatsApp: 189, Llamadas: 480 },
  { name: 'Sep', WhatsApp: 239, Llamadas: 380 },
];

// --- SECTION 5: REPORTS ---
export const recentReports = [
    { icon: FileText, title: "Informe Mensual - Agosto 2025", details: "Tipo: Mensual • Tamaño: 2.4 MB", date: "2025-08-31", status: "Completado" },
    { icon: BarChart, title: "Reporte de Casos - Q3 2025", details: "Tipo: Trimestral • Tamaño: 1.8 MB", date: "2025-08-30", status: "Procesando" },
    { icon: DollarSign, title: "Análisis Financiero - Julio", details: "Tipo: Financiero • Tamaño: 3.1 MB", date: "2025-07-31", status: "Completado" },
];

export const reportTemplates = [
    { icon: BarChart, title: "Informe de Gestión", description: "Resumen ejecutivo con KPIs principales, casos activos y métricas financieras." },
    { icon: TrendingUp, title: "Análisis de Rendimiento", description: "Métricas detalladas de productividad, tiempos de respuesta y satisfacción." },
    { icon: DollarSign, title: "Reporte Financiero", description: "Estado financiero completo, ingresos, gastos y proyecciones." },
];

// --- SECTION 6: TEAM PERFORMANCE ---
export const teamPerformance = {
    overview: {
        activeLawyers: 4,
        avgSuccessRate: "83.5%",
        avgRevenue: 192300,
    },
    table: [
        { avatar: "JP", name: "Dr. Juan Pérez", title: "Senior", activeCases: 42, successRate: 83, revenue: 890000, specialty: "Laboral", isTop: true },
        { avatar: "MG", name: "Dra. María González", title: "Senior", activeCases: 38, successRate: 87, revenue: 745000, specialty: "Familia", isTop: false },
        { avatar: "CL", name: "Dr. Carlos López", title: "Junior", activeCases: 45, successRate: 75, revenue: 650000, specialty: "Penal", isTop: false },
    ],
    ranking: {
        first: { name: "Dra. María González", achievement: "87% Tasa de Éxito" },
        second: { name: "Dr. Juan Pérez", achievement: "$890.000 Facturados" },
        third: { name: "Dr. Carlos López", achievement: "45 Casos Activos" },
    }
}