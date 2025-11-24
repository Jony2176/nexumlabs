// FIX: Imported 'React' to resolve 'Cannot find name' error.
import React from 'react';
import { LucideIcon } from "lucide-react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName:string;
  phone?: string;
  role: 'user' | 'affiliate' | 'super_admin';
  orgId: string;
  // FIX: Added optional 'onboardingCompleted' property to align with mock data usage.
  onboardingCompleted?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  modules: ModuleConfig;
  subscription_status: 'trialing' | 'active' | 'expired' | 'cancelled';
  trial_ends_at: string;
}

export interface ModuleConfig {
  [key: string]: {
    active: boolean;
    trial: boolean;
    limits?: any;
  };
}

export interface Subscription {
  id: string;
  org_id: string;
  plan_id: string;
  status: string;
  price: number;
  currency: string;
  current_period_end: string;
  modules: string[];
}

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly: number;
    annual: number;
  };
  regularPrice?: {
    monthly: number;
    annual: number;
  };
  discount?: number;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  enterprise?: boolean;
  requiredModules?: string[];
  color?: 'gray' | 'blue' | 'purple' | 'gold';
  badge?: string;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  org_id: string;
  date: string;
  period: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl: string;
}


// --- AFFILIATE SYSTEM TYPES ---

export type AffiliateStatus = 'pending' | 'active' | 'inactive' | 'rejected';
export type ReferralType = 'primer_mes' | 'recurrente';
export type ReferralStatus = 'pending' | 'unpaid' | 'paid' | 'rejected';
export type PayoutStatus = 'pending' | 'processing' | 'completed';
export type PaymentMethodType = 'transferencia' | 'mercadopago' | 'credito';

export interface Affiliate {
  id: string;
  user_email: string;
  nombre: string;
  estado: AffiliateStatus;
  tasa_primer_mes: number;
  tasa_recurrente: number;
  cookie_days: number;
  codigo_cupon?: string;
  wallet_credito: number;
  metodo_pago: PaymentMethodType;
  cbu_cvu?: string;
  fecha_alta: string;
  fecha_aprobacion?: string;
  // Custom properties for table display
  referrals: {
    active: number;
    total: number;
  };
  revenue: {
    current_month: number;
    lifetime: number;
  };
  commission: {
    pending: number;
    paid: number;
    total: number;
  };
  conversion_rate: number;
  last_referral_date?: string;
  avatarUrl?: string; // For display
}

export interface Visit {
  id: string;
  affiliate_id: string;
  campaign?: string;
  landing_page: string;
  ip: string;
  user_agent: string;
  referer?: string;
  fecha_hora: string;
  convertida: boolean;
}

export interface Referral {
  id: string;
  affiliate_id: string;
  customer_email_short: string; // "joh...com"
  plan_contratado: string;
  subscription_status: 'active' | 'cancelled' | 'trial';
  monto_base: number;
  tasa_aplicada: number;
  comision_calculada: number;
  tipo: ReferralType;
  estado: ReferralStatus;
  fecha_creacion: string;
}

export interface Payout {
  id: string;
  affiliate_id: string; // Added for filtering
  periodo: string; // e.g., "Julio 2024"
  total_comisiones: number;
  metodo: PaymentMethodType;
  estado: PayoutStatus;
  comprobante_url?: string;
  fecha_pago: string;
}

// --- WALLET SYSTEM TYPES ---

export interface Wallet {
  affiliate_id: string; // Added for filtering
  balance_usd: number;
  balance_ars: number;
  exchange_rate: number;
  total_referrals: number;
  total_earned_usd: number;
  total_payouts: number;
}

export interface PaymentConfiguration {
  affiliate_id: string; // Added for filtering
  cuit: string;
  business_name: string;
  address: string;
  mp_email: string;
  mp_alias: string;
  mp_verified: boolean;
}

export type TransactionType = 'earning' | 'withdrawal';
export type TransactionStatus = 'completed' | 'processing' | 'pending';

export interface Transaction {
  id: string;
  affiliate_id: string; // Added for filtering
  type: TransactionType;
  description: string;
  created_at: string;
  amount_usd: number;
  amount_ars: number;
  status: TransactionStatus;
}


// --- ADMIN DASHBOARD TYPES ---
export interface KPICardData {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: LucideIcon;
  valueInARS?: string;
  subtitle?: string;
  target?: string;
  alert?: boolean;
}

export interface ClientData {
  id: string;
  empresa: string;
  contacto: string;
  plan: 'Lite' | 'Start' | 'Pro' | 'Professional' | 'Business' | 'Enterprise';
  mrr: number;
  estado: 'active' | 'trial' | 'cancelled' | 'suspended';
  consumoWhatsApp: { value: number; limit: number };
  consumoLlamadas: { value: number; limit: number };
  healthScore: number;
  fechaInicio: string;
  ultimoPago: {
      fecha: string;
      estado: 'paid' | 'pending' | 'failed';
  };
  logoUrl?: string;
  cuit?: string;
  direccion?: string;
}

export interface AlertData {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  action?: {
    label: string;
  };
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  status: 'active' | 'inactive';
  usageCount: number;
  usageLimit?: number;
  createdAt: string;
}

// --- NEW DASHBOARD TYPES ---

// CLIENT DASHBOARD
export interface ClientDashboardData {
  organization: {
    id: string;
    name: string;
    plan: string;
    status: string;
    modules_config: {
      whatsapp_bot: { active: boolean; limit: number };
      calls: { active: boolean; limit: number };
      dashboard: { active: boolean };
      avatar: { active: boolean; limit: number };
      predict: { active: boolean; limit: number };
    };
    current_usage: {
      whatsapp_messages: number;
      call_minutes: number;
      avatar_queries: number;
      predict_cases: number;
    };
    trial_ends_at: string | null;
    next_billing_date: string;
  };
  subscription: {
    id: string;
    plan_id: string;
    status: string;
    price_usd: number;
    price_ars: number;
    next_billing_date: string;
    auto_renew: boolean;
  };
}

export interface UsageHistoryData {
    date: string; // "2025-11-01"
    whatsapp_messages: number;
    call_minutes: number;
    avatar_queries: number;
}
export interface UsageHistoryResponse {
  data: UsageHistoryData[];
}

export interface ActivityEvent {
  id: string;
  event_type: string;
  module: string;
  quantity: number;
  created_at: string;
  metadata: Record<string, any>;
}

// AFFILIATE DASHBOARD
export interface AffiliateDashboardData {
  affiliate: {
    id: string;
    name: string;
    affiliate_code: string;
    balance_usd: number;
    balance_ars: number;
    total_referrals: number;
    active_referrals: number;
    tier: string;
  };
  thisMonthEarnings: {
    first_month_commissions: number;
    recurring_commissions: number;
    total: number;
  };
  conversionRate: {
    clicks: number;
    conversions: number;
    rate: number; // 0.12 = 12%
  };
}

export interface RevenueHistoryData {
    month: string; // "2025-11"
    first_month: number;
    recurring: number;
    total: number;
}
export interface RevenueHistoryResponse {
    data: RevenueHistoryData[];
}

export interface ReferralData {
  org_id: string;
  org_name: string;
  plan_id: string;
  status: 'trial' | 'active' | 'cancelled';
  monthly_commission_usd: number;
  total_commission_paid: number;
  conversion_date: string;
  plan_type?: 'primer_mes' | 'recurrente';
}

// ADMIN DASHBOARD
export interface AdminOverviewData {
  metrics: {
    total_organizations: number;
    active_organizations: number;
    trialing_organizations: number;
    mrr_usd: number;
    total_users: number;
    active_users: number;
    total_affiliates: number;
    active_affiliates: number;
    pending_commissions_usd: number;
    churn_rate: number;
  };
  plan_distribution: Array<{
    plan: string;
    count: number;
    percentage: number;
  }>;
  top_affiliates: Array<{
    id: string;
    name: string;
    active_referrals: number;
    balance_usd: number;
  }>;
  critical_alerts: Array<{
    id: string;
    event_type: string;
    severity: string;
    message: string;
    created_at: string;
  }>;
}

export interface MRRHistoryData {
    month: string; // "2025-11"
    mrr: number;
    new_mrr: number;
    churned_mrr: number;
    expansion_mrr: number;
}
export interface MRRHistoryResponse {
    data: MRRHistoryData[];
}