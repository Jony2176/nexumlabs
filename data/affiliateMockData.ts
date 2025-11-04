
import { Affiliate, Referral, Visit, Payout } from '../types';

export const MOCK_AFFILIATES: Affiliate[] = [
  {
    id: 'aff_1',
    user_email: 'referidor.activo@outlook.com',
    nombre: 'Referidor Activo',
    estado: 'active',
    tasa_primer_mes: 30,
    tasa_recurrente: 15,
    cookie_days: 45,
    wallet_credito: 150.0,
    metodo_pago: 'transferencia',
    cbu_cvu: '0011223344556677889900',
    fecha_alta: '2023-01-15T10:00:00Z',
    fecha_aprobacion: '2023-01-16T12:00:00Z',
    referrals: { active: 40, total: 45 },
    revenue: { current_month: 1200, lifetime: 3400 },
    commission: { pending: 850, paid: 2550, total: 3400 },
    conversion_rate: 4.2,
    last_referral_date: '2024-07-10T10:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=aff_1`
  },
  {
    id: 'aff_2',
    user_email: 'juan.perez@gmail.com',
    nombre: 'Juan Pérez',
    estado: 'active',
    tasa_primer_mes: 25,
    tasa_recurrente: 10,
    cookie_days: 30,
    wallet_credito: 0.0,
    metodo_pago: 'mercadopago',
    fecha_alta: '2023-03-20T10:00:00Z',
    fecha_aprobacion: '2023-03-21T12:00:00Z',
    referrals: { active: 28, total: 32 },
    revenue: { current_month: 850, lifetime: 2100 },
    commission: { pending: 450, paid: 1650, total: 2100 },
    conversion_rate: 3.8,
    last_referral_date: '2024-07-12T10:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=aff_2`
  },
  {
    id: 'aff_3',
    user_email: 'partner@ejemplo.com',
    nombre: 'Partner Ejemplo',
    estado: 'active',
    tasa_primer_mes: 25,
    tasa_recurrente: 10,
    cookie_days: 30,
    wallet_credito: 0.0,
    metodo_pago: 'transferencia',
    fecha_alta: '2024-07-15T11:00:00Z',
    fecha_aprobacion: '2024-07-16T11:00:00Z',
    referrals: { active: 15, total: 20 },
    revenue: { current_month: 500, lifetime: 1250 },
    commission: { pending: 200, paid: 1050, total: 1250 },
    conversion_rate: 3.0,
    avatarUrl: `https://i.pravatar.cc/150?u=aff_3`
  },
   {
    id: 'aff_4',
    user_email: 'influencer.legal@gmail.com',
    nombre: 'Influencer Legal',
    estado: 'active',
    tasa_primer_mes: 30,
    tasa_recurrente: 12,
    cookie_days: 45,
    wallet_credito: 25.5,
    metodo_pago: 'credito',
    fecha_alta: '2023-05-10T10:00:00Z',
    fecha_aprobacion: '2023-05-11T12:00:00Z',
    referrals: { active: 10, total: 12 },
    revenue: { current_month: 300, lifetime: 780 },
    commission: { pending: 150, paid: 630, total: 780 },
    conversion_rate: 5.1,
    last_referral_date: '2024-06-28T10:00:00Z',
    avatarUrl: `https://i.pravatar.cc/150?u=aff_4`
  },
  {
    id: 'aff_5',
    user_email: 'maria.lopez@yahoo.com',
    nombre: 'Maria Lopez',
    estado: 'pending',
    tasa_primer_mes: 25,
    tasa_recurrente: 10,
    cookie_days: 30,
    wallet_credito: 0.0,
    metodo_pago: 'transferencia',
    fecha_alta: '2023-02-01T10:00:00Z',
    fecha_aprobacion: undefined,
    referrals: { active: 2, total: 3 },
    revenue: { current_month: 50, lifetime: 120 },
    commission: { pending: 120, paid: 0, total: 120 },
    conversion_rate: 2.5,
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
    { id: 'pay_1', affiliate_id: 'aff_1', periodo: 'Junio 2024', total_comisiones: 1250.75, metodo: 'transferencia', estado: 'completed', fecha_pago: '2024-07-05T10:00:00Z', comprobante_url: '#'},
    { id: 'pay_2', affiliate_id: 'aff_2', periodo: 'Mayo 2024', total_comisiones: 1100.50, metodo: 'transferencia', estado: 'completed', fecha_pago: '2024-06-05T10:00:00Z', comprobante_url: '#'},
];
