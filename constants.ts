// FIX: Imported 'React' to resolve 'Cannot find name' error.
import React from 'react';
import { 
    LayoutDashboard, Bot, Phone, BrainCircuit, User, BarChart2, Briefcase, CreditCard, Settings,
    FileText, TrendingUp, Bell, Zap, Calendar, MessageSquare, BookOpen, List, BarChart, Clock, Goal, ClipboardList,
    Building, Users as UsersIcon, Link as LinkIcon, AlertTriangle, Shield, Globe, KeyRound, HelpCircle, Handshake, Puzzle, ChevronRight, SlidersHorizontal, UserPlus, DollarSign,
    // FIX: Imported 'Mail' and 'Wallet' to resolve 'Cannot find name' errors.
    Mail, Wallet
} from 'lucide-react';
import { Plan } from './types';

export interface NavSubItem {
  label: string;
  path: string;
  disabled?: boolean;
}

export interface NavItemExpanded {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  subItems?: NavSubItem[];
  badge?: string;
  badgeColor?: 'green' | 'yellow' | 'purple';
  locked?: boolean;
  notification?: boolean;
  roles?: string[]; // To control visibility by role
}

export const MODULES = [
    {
        id: 'elias_whatsapp',
        icon: MessageSquare,
        title: 'ELIAS WhatsApp',
        description: 'Automatice la atención al cliente, califique casos y agende citas con nuestro asistente de IA.',
        ssoLink: '/modules',
    },
    {
        id: 'elias_llamadas',
        icon: Phone,
        title: 'ELIAS Llamadas',
        description: 'Asistente de voz con IA que atiende, califica y agenda clientes 24/7 con voz hiperrealista.',
        ssoLink: '/modules',
    },
    {
        id: 'dashboard_premium',
        icon: LayoutDashboard,
        title: 'Dashboard Premium',
        description: 'Tome decisiones estratégicas basadas en datos para impulsar el crecimiento y la rentabilidad.',
        ssoLink: '/app/dashboard',
    },
    {
        id: 'elias_avatar_partner',
        icon: User,
        title: 'Avatar Partner',
        description: 'Su socio legal de IA que ofrece consultas legales precisas y analiza documentos 24/7.',
        ssoLink: '/modules',
    },
    {
        id: 'jurispredict_ai',
        icon: BrainCircuit,
        title: 'JurisPredict AI',
        description: 'IA que predice el resultado de sus casos judiciales con 87% de precisión.',
        ssoLink: '/modules',
    },
];

export const SIDEBAR_CONFIG_BY_ROLE: { [key: string]: NavItemExpanded[] } = {
  super_admin: [
    { id: 'admin_dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'admin_clients', label: 'Clientes', icon: Building, path: '/admin/clients' },
    { id: 'admin_affiliates', label: 'Afiliados', icon: UserPlus, path: '/admin/affiliates' },
    { id: 'admin_financial', label: 'Finanzas', icon: DollarSign, path: '/admin/financial' },
    { id: 'admin_communications', label: 'Comunicaciones', icon: Mail, path: '/admin/communications' },
    { id: 'admin_reports', label: 'Reportes', icon: FileText, path: '/admin/reports' },
    { id: 'admin_logs', label: 'Logs de Auditoría', icon: FileText, path: '/admin/logs' },
    { id: 'admin_feature_flags', label: 'Feature Flags', icon: SlidersHorizontal, path: '/admin/feature-flags' },
    { id: 'admin_settings', label: 'Configuración Global', icon: Settings, path: '/admin/settings' },
  ],
  owner: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
    { id: 'modules', label: 'Módulos', icon: Puzzle, path: '/app/modules' },
    { id: 'jurispredict_ai', label: 'JurisPredict AI', icon: BrainCircuit, path: '/app/jurispredict' },
    { id: 'elias_avatar_partner', label: 'Avatar Partner', icon: User, path: '/app/avatar' },
    { id: 'subscription', label: 'Suscripción y Pagos', icon: CreditCard, path: '/app/subscription' },
    { id: 'settings', label: 'Configuración', icon: Settings, path: '/app/configuracion' },
  ],
  user: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
    { id: 'modules', label: 'Módulos', icon: Puzzle, path: '/app/modules' },
    { id: 'jurispredict_ai', label: 'JurisPredict AI', icon: BrainCircuit, path: '/app/jurispredict' },
    { id: 'elias_avatar_partner', label: 'Avatar Partner', icon: User, path: '/app/avatar' },
    { id: 'settings', label: 'Configuración', icon: Settings, path: '/app/configuracion' },
  ],
  affiliate: [
    { id: 'portal_dashboard', label: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
    { id: 'portal_urls', label: 'URLs y Enlaces', path: '/portal/urls', icon: LinkIcon },
    { id: 'portal_wallet', label: 'Mi Billetera', path: '/portal/wallet', icon: Wallet },
    { id: 'portal_referrals', label: 'Referidos', path: '/portal/referrals', icon: UsersIcon },
    { id: 'portal_payouts', label: 'Pagos', path: '/portal/payouts', icon: CreditCard },
    { id: 'portal_creatives', label: 'Material Promocional', path: '/portal/creatives', icon: FileText },
    { id: 'portal_profile', label: 'Mi Perfil', path: '/portal/profile', icon: User },
    { id: 'portal_resources', label: 'Recursos', path: '/portal/resources', icon: BookOpen },
  ]
};

export const PRICING_PLANS: Plan[] = [
  {
    id: 'lite',
    name: 'Plan Lite',
    description: 'Para abogados recién recibidos y monotributistas.',
    price: { monthly: 79, annual: 63 },
    regularPrice: { monthly: 129, annual: 103 },
    discount: 39,
    features: [
      'WhatsApp IA: 1,000 conversaciones/mes',
      '1 usuario administrador',
      'Storage: 1 GB',
      'Soporte por email',
    ],
    notIncluded: [
      'Llamadas IA',
      'Dashboard Premium',
      'SMS'
    ],
    requiredModules: ['elias_whatsapp'],
    color: 'gray',
  },
  {
    id: 'start',
    name: 'Plan Start',
    description: 'Para estudios de 1-2 abogados establecidos.',
    price: { monthly: 119, annual: 95 },
    regularPrice: { monthly: 199, annual: 159 },
    discount: 40,
    features: [
      'Todo en Lite +',
      'WhatsApp IA: 5,000 conversaciones/mes',
      '50 SMS recordatorios/mes',
      '2 usuarios administradores',
      'Storage: 5 GB',
      'Soporte prioritario 24hs',
    ],
    notIncluded: [
        'Llamadas IA',
        'Dashboard Premium',
    ],
    requiredModules: ['elias_whatsapp'],
    color: 'gray',
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    description: 'Para estudios pequeños con alto volumen de consultas.',
    price: { monthly: 199, annual: 159 },
    regularPrice: { monthly: 329, annual: 263 },
    discount: 40,
    features: [
      'Todo en Start +',
      'Conversaciones WhatsApp ILIMITADAS',
      '300 minutos llamadas IA/mes',
      'Recepción telefónica 24/7',
      '3 usuarios administradores',
      'Storage: 10 GB',
      'Soporte telefónico',
    ],
     notIncluded: [
        'Dashboard Premium',
        'SMS Ilimitados',
    ],
    requiredModules: ['elias_whatsapp', 'elias_llamadas'],
    color: 'blue',
  },
  {
    id: 'professional',
    name: 'Plan Professional',
    description: 'Para estudios de 4-10 abogados buscando máxima eficiencia.',
    price: { monthly: 319, annual: 255 },
    regularPrice: { monthly: 499, annual: 399 },
    discount: 36,
    popular: true,
    badge: 'MÁS POPULAR',
    features: [
      'Todo en Pro +',
      '1,000 minutos llamadas IA/mes',
      'SMS ILIMITADOS',
      'Dashboard analytics avanzado',
      '5 usuarios administradores',
      'Storage: 25 GB',
      'Soporte 24/7 prioritario',
    ],
    notIncluded: [
        'Dashboard Premium',
        'API Access',
    ],
    requiredModules: ['elias_whatsapp', 'elias_llamadas'],
    color: 'purple',
  },
  {
    id: 'business',
    name: 'Plan Business',
    description: 'Potencia y escala para estudios medianos (10-20 abogados).',
    price: { monthly: 399, annual: 319 },
    regularPrice: { monthly: 629, annual: 503 },
    discount: 37,
    features: [
      'Todo en Professional +',
      'Dashboard Premium incluido',
      '2,500 minutos llamadas IA/mes',
      'API access completo',
      '10 usuarios administrativos',
      'Storage: 50 GB',
      'SLA 99.5% uptime',
    ],
    requiredModules: ['dashboard_premium'],
    color: 'purple',
    badge: 'PRÓXIMAMENTE'
  },
  {
    id: 'enterprise',
    name: 'Plan Enterprise',
    description: 'Solución a medida para grandes firmas y corporativos.',
    price: { monthly: 499, annual: 399 }, // Base price
    enterprise: true,
    features: [
      'TODO ILIMITADO',
      'JurisPredict AI incluido',
      'Avatar Partner incluido',
      'Conversaciones y llamadas ilimitadas',
      'Personalización completa y White label',
      'Usuarios ilimitados',
      'Soporte prioritario y SLA garantizado',
    ],
    requiredModules: ['jurispredict_ai', 'elias_avatar_partner'],
    color: 'gold',
    badge: 'CONTACTAR'
  }
];
