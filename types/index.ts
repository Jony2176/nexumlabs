// FIX: Imported 'React' to resolve 'Cannot find name' error.
import React from 'react';
import { LucideIcon } from "lucide-react";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName:string;
  phone?: string;
  role: 'owner' | 'admin' | 'user' | 'affiliate' | 'super_admin';
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
  subscription_status: 'active' | 'cancelled';
  monto_base: number;
  tasa_aplicada: number;
  comision_calculada: number;
  tipo: ReferralType;
  estado: ReferralStatus;
  fecha_creacion: string;
}

export interface Payout {
  id: string;
  periodo: string; // e.g., "Julio 2024"
  total_comisiones: number;
  metodo: PaymentMethodType;
  estado: PayoutStatus;
  comprobante_url?: string;
  fecha_pago: string;
}

// --- WALLET SYSTEM TYPES ---

export interface Wallet {
  balance_usd: number;
  balance_ars: number;
  exchange_rate: number;
  total_referrals: number;
  total_earned_usd: number;
  total_payouts: number;
}

export interface PaymentConfiguration {
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
  plan: 'Lite' | 'Pro' | 'Professional' | 'Business' | 'Enterprise';
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