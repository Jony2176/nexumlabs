
import { Wallet, PaymentConfiguration, Transaction } from '../types';

export const MOCK_WALLET: Wallet = {
  // FIX: Added missing 'affiliate_id' property to align with the Wallet type definition.
  affiliate_id: 'usr_affiliate_1',
  balance_usd: 127.50,
  balance_ars: 158100.00, // Example conversion
  exchange_rate: 1240.00,
  total_referrals: 45,
  total_earned_usd: 875.50,
  total_payouts: 6,
};

export const MOCK_PAYMENT_CONFIG: PaymentConfiguration = {
  // FIX: Added missing 'affiliate_id' property to align with the PaymentConfiguration type definition.
  affiliate_id: 'usr_affiliate_1',
  cuit: '20-12345678-9',
  business_name: 'Juan Afiliado S.R.L.',
  address: 'Av. Corrientes 1234, CABA',
  mp_email: 'juan.afiliado@mercadopago.com',
  mp_alias: 'juan.afiliado.mp',
  mp_verified: true,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'txn_1',
        // FIX: Added missing 'affiliate_id' property to align with the Transaction type definition.
        affiliate_id: 'usr_affiliate_1',
        type: 'earning',
        description: 'Comisión por referido: clie...@email.com',
        created_at: '2024-07-18T10:00:00Z',
        amount_usd: 49.75,
        amount_ars: 61690.00,
        status: 'completed',
    },
    {
        id: 'txn_2',
        // FIX: Added missing 'affiliate_id' property to align with the Transaction type definition.
        affiliate_id: 'usr_affiliate_1',
        type: 'earning',
        description: 'Comisión por referido: test...@email.com',
        created_at: '2024-07-15T14:30:00Z',
        amount_usd: 29.75,
        amount_ars: 36890.00,
        status: 'completed',
    },
    {
        id: 'txn_3',
        // FIX: Added missing 'affiliate_id' property to align with the Transaction type definition.
        affiliate_id: 'usr_affiliate_1',
        type: 'withdrawal',
        description: 'Retiro a MercadoPago',
        created_at: '2024-07-10T09:00:00Z',
        amount_usd: 150.00,
        amount_ars: 184500.00,
        status: 'completed',
    },
    {
        id: 'txn_4',
        // FIX: Added missing 'affiliate_id' property to align with the Transaction type definition.
        affiliate_id: 'usr_affiliate_1',
        type: 'earning',
        description: 'Comisión recurrente: otro...@email.com',
        created_at: '2024-07-05T11:00:00Z',
        amount_usd: 11.90,
        amount_ars: 14756.00,
        status: 'completed',
    },
    {
        id: 'txn_5',
        // FIX: Added missing 'affiliate_id' property to align with the Transaction type definition.
        affiliate_id: 'usr_affiliate_1',
        type: 'withdrawal',
        description: 'Retiro a MercadoPago',
        created_at: '2024-06-10T09:00:00Z',
        amount_usd: 200.00,
        amount_ars: 240000.00,
        status: 'completed',
    },
];