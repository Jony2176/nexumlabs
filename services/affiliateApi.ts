
import api, { USE_MOCK } from './api';
// FIX: Imported PaymentMethodType and PayoutStatus to correctly map transaction data.
import { Affiliate, Referral, Visit, Payout, PaymentMethodType, PayoutStatus } from '../types';
import { MOCK_AFFILIATES, MOCK_REFERRALS, MOCK_VISITS, MOCK_PAYOUTS } from '../data/affiliateMockData';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';


// --- ADMIN ENDPOINTS ---

export const getAffiliates = async (filters: any = {}): Promise<Affiliate[]> => {
  // FIX: api.getAffiliates expected 0 arguments. Switched to getAdminAffiliates. Filters are ignored.
  return api.getAdminAffiliates();
};

export const getAffiliateById = async (id: string): Promise<Affiliate | undefined> => {
  // FIX: Property 'useMock' does not exist on type 'NexumAPI'. Replaced with imported USE_MOCK.
  if (USE_MOCK) {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_AFFILIATES.find(a => a.id === id)), 300));
  }
  const affiliates = await api.getAdminAffiliates();
  if (Array.isArray(affiliates)) {
    return affiliates.find((a: Affiliate) => a.id === id);
  }
  return undefined;
};

export const updateAffiliate = async (affiliateId: string, data: Partial<Affiliate>): Promise<{ status: 'success' }> => {
    // NOTE: The Google Sheets API v4 with a simple API key is READ-ONLY.
    // This action should be handled by n8n.
    console.log(`INTENDED UPDATE: Updating affiliate ${affiliateId} via n8n with data:`, data);
    // FIX: Replaced toast.info with toast because info method does not exist in react-hot-toast.
    toast('Las operaciones de escritura son manejadas por el backend (n8n).', { icon: 'ℹ️' });
    return new Promise(resolve => resolve({ status: 'success' }));
};

export const processAffiliatePayout = async (affiliateId: string, amount: number): Promise<{ status: 'success' }> => {
    console.log(`PROCESSING PAYOUT of ${amount} for affiliate ${affiliateId} via n8n`);
    // In a real app: await api.post('/api/affiliates/process-payout', { affiliateId, amount });
    return new Promise(resolve => setTimeout(() => resolve({ status: 'success' }), 1500));
}

export const getReferrals = async (filters: any = {}): Promise<Referral[]> => {
  // FIX: Property 'getAffiliateConversions' does not exist on type 'NexumAPI'. Using mock data as a fallback.
  console.warn("getReferrals is using mock data as API endpoint is not available.");
  return Promise.resolve(MOCK_REFERRALS);
};

export const processBulkPayout = async (affiliateIds: string[], method: string): Promise<any> => {
    console.log(`Processing payout for affiliates ${affiliateIds.join(', ')} via ${method}`);
    // This is a write operation, should go to n8n
    // const response = await api.post('/api/payouts/process', { affiliateIds, method });
    // return response.data;
    return new Promise(resolve => setTimeout(() => resolve({ status: 'success', processed: affiliateIds.length }), 1500));
}


// --- AFFILIATE PORTAL ENDPOINTS ---

export const getAffiliatePortalDashboard = async () => {
  // Call real API
  return api.getAffiliateDashboard();
};

export const submitPayoutRequest = async (requestData: any): Promise<{ status: 'success', requestId: string }> => {
    // FIX: Mapped response to match the expected return type.
    // FIX: Casted the unknown response from the API call to the expected { success: boolean, requestId: string } type to resolve property access errors.
    const response = await api.submitAffiliatePayoutRequest(requestData) as { success: boolean, requestId: string };
    if (response.success) {
      return { status: 'success', requestId: response.requestId };
    }
    throw new Error('Payout request failed');
}

export const getMyReferrals = async (): Promise<Referral[]> => {
    const { user } = useAuthStore.getState();
    if (!user) return [];
    
    // Call real API
    const response = await api.getAffiliateReferrals(user.id);
    
    // Map ReferralData from API to Referral type expected by UI
    return response.data.map(r => ({
        id: `ref_${r.org_id}`,
        affiliate_id: user.id,
        customer_email_short: r.org_name, // Mapping Org Name as Identifier
        plan_contratado: r.plan_id,
        subscription_status: r.status,
        monto_base: 0, // Not available in aggregated view
        tasa_aplicada: 0, // Not available in aggregated view
        comision_calculada: r.monthly_commission_usd,
        tipo: r.plan_type || 'recurrente', 
        estado: 'unpaid', // Default state until payment integration
        fecha_creacion: r.conversion_date
    }));
}

export const getMyPayouts = async (): Promise<Payout[]> => {
    const { user } = useAuthStore.getState();
    if (!user) return [];

    // Call real API for transactions
    const allTransactions = await api.getTransactions();
    
    // Filter withdrawal transactions and map to Payout type
    const withdrawalTransactions = allTransactions.filter(payout => payout.affiliate_id === user.id && payout.type === 'withdrawal');

    return withdrawalTransactions.map((transaction): Payout => {
        let metodo: PaymentMethodType = 'transferencia';
        const desc = (transaction.description || '').toLowerCase();
        if (desc.includes('mercadopago')) {
            metodo = 'mercadopago';
        } else if (desc.includes('credito')) {
            metodo = 'credito';
        }

        return {
            id: transaction.id,
            affiliate_id: transaction.affiliate_id,
            periodo: new Date(transaction.created_at).toLocaleString('es-ES', { month: 'long', year: 'numeric' }),
            total_comisiones: transaction.amount_usd,
            metodo,
            estado: transaction.status as PayoutStatus,
            fecha_pago: transaction.created_at,
            // comprobante_url is optional
        };
    });
}
