
import { Affiliate, Referral, Visit, Payout } from '../types';

export const MOCK_AFFILIATES: Affiliate[] = [
  {
    id: 'aff_1',
    user_email: 'marketing.pro@email.com',
    nombre: 'Marketing Digital Pro',
    estado: 'active',
    tasa_primer_mes: 25,
    tasa_recurrente: 10,
    cookie_days: 30,
    wallet_credito: 150.0,
    metodo_pago: 'transferencia',
    cbu_cvu: '0011223344556677889900',
    fecha_alta: '2023-01-15T10:00:00Z',
    fecha_aprobacion: '2023-01-16T12:00:00Z',
    referrals: { active: 40, total: 45 },
    revenue: { current_month: 1200, lifetime: 35000 },
    commission: { pending: 850, paid: 7900, total: 8750 },
    conversion_rate: 4.2,
    last_referral_date: '2024-07-10T10:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=aff_1`
  },
  {
    id: 'aff_2',
    user_email: 'legal.mx@email.com',
    nombre: 'Consultor Legal MX',
    estado: 'active',
    tasa_primer_mes: 25,
    tasa_recurrente: 10,
    cookie_days: 30,
    wallet_credito: 0.0,
    metodo_pago: 'mercadopago',
    fecha_alta: '2023-03-20T10:00:00Z',
    fecha_aprobacion: '2023-03-21T12:00:00Z',
    referrals: { active: 28, total: 32 },
    revenue: { current_month: 850, lifetime: 24800 },
    commission: { pending: 450, paid: 5750, total: 6200 },
    conversion_rate: 3.8,
    last_referral_date: '2024-07-12T10:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=aff_2`
  },
  {
    id: 'aff_3',
    user_email: 'blogger.juridico@email.com',
    nombre: 'Blogger Jurídico',
    estado: 'pending',
    tasa_primer_mes: 25,
    tasa_recurrente: 10,
    cookie_days: 30,
    wallet_credito: 0.0,
    metodo_pago: 'transferencia',
    fecha_alta: '2024-07-15T11:00:00Z',
    referrals: { active: 0, total: 0 },
    revenue: { current_month: 0, lifetime: 0 },
    commission: { pending: 0, paid: 0, total: 0 },
    conversion_rate: 0.0,
    avatarUrl: `https://i.pravatar.cc/150?u=aff_3`
  },
   {
    id: 'aff_4',
    user_email: 'influencer.legal@email.com',
    nombre: 'Influencer Legal',
    estado: 'active',
    tasa_primer_mes: 30,
    tasa_recurrente: 12,
    cookie_days: 45,
    wallet_credito: 25.5,
    metodo_pago: 'credito',
    fecha_alta: '2023-05-10T10:00:00Z',
    fecha_aprobacion: '2023-05-11T12:00:00Z',
    referrals: { active: 15, total: 19 },
    revenue: { current_month: 600, lifetime: 15200 },
    commission: { pending: 300, paid: 3500, total: 3800 },
    conversion_rate: 5.1,
    last_referral_date: '2024-06-28T10:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=aff_4`
  },
  {
    id: 'aff_5',
    user_email: 'academia.online@email.com',
    nombre: 'Academia Online',
    estado: 'inactive',
    tasa_primer_mes: 25,
    tasa_recurrente: 10,
    cookie_days: 30,
    wallet_credito: 0.0,
    metodo_pago: 'transferencia',
    fecha_alta: '2023-02-01T10:00:00Z',
    fecha_aprobacion: '2023-02-02T12:00:00Z',
    referrals: { active: 10, total: 15 },
    revenue: { current_month: 0, lifetime: 11600 },
    commission: { pending: 0, paid: 2900, total: 2900 },
    conversion_rate: 3.2,
    last_referral_date: '2024-05-15T10:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=aff_5`
  },
];


export const MOCK_REFERRALS: Referral[] = [
    { id: 'ref_1', affiliate_id: 'aff_1', customer_email_short: 'clie...@email.com', plan_contratado: 'ELIAS Pro', subscription_status: 'active', monto_base: 199, tasa_aplicada: 25, comision_calculada: 49.75, tipo: 'primer_mes', estado: 'unpaid', fecha_creacion: '2024-07-10T10:00:00Z'},
    { id: 'ref_2', affiliate_id: 'aff_2', customer_email_short: 'otro...@email.com', plan_contratado: 'ELIAS Start', subscription_status: 'active', monto_base: 119, tasa_aplicada: 10, comision_calculada: 11.90, tipo: 'recurrente', estado: 'unpaid', fecha_creacion: '2024-07-12T10:00:00Z'},
    { id: 'ref_3', affiliate_id: 'aff_1', customer_email_short: 'test...@email.com', plan_contratado: 'ELIAS Pro', subscription_status: 'cancelled', monto_base: 199, tasa_aplicada: 25, comision_calculada: 49.75, tipo: 'primer_mes', estado: 'rejected', fecha_creacion: '2024-06-20T10:00:00Z'},
    { id: 'ref_4', affiliate_id: 'aff_4', customer_email_short: 'nuev...@email.com', plan_contratado: 'ELIAS Business', subscription_status: 'active', monto_base: 399, tasa_aplicada: 30, comision_calculada: 119.7, tipo: 'primer_mes', estado: 'paid', fecha_creacion: '2024-06-15T10:00:00Z'},
    { id: 'ref_5', affiliate_id: 'aff_2', customer_email_short: 'ejem...@email.com', plan_contratado: 'ELIAS Start', subscription_status: 'active', monto_base: 119, tasa_aplicada: 10, comision_calculada: 11.90, tipo: 'recurrente', estado: 'paid', fecha_creacion: '2024-06-12T10:00:00Z'},
];


export const MOCK_VISITS: Visit[] = [
    // Mock data for visits if needed
];

export const MOCK_PAYOUTS: Payout[] = [
    { id: 'pay_1', periodo: 'Junio 2024', total_comisiones: 1250.75, metodo: 'transferencia', estado: 'completed', fecha_pago: '2024-07-05T10:00:00Z', comprobante_url: '#'},
    { id: 'pay_2', periodo: 'Mayo 2024', total_comisiones: 1100.50, metodo: 'transferencia', estado: 'completed', fecha_pago: '2024-06-05T10:00:00Z', comprobante_url: '#'},
];
