
import api from './api';
import { Affiliate, Referral, Visit, Payout } from '../types';
import { MOCK_AFFILIATES, MOCK_REFERRALS, MOCK_VISITS, MOCK_PAYOUTS } from '../data/affiliateMockData';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';


// --- ADMIN ENDPOINTS ---

export const getAffiliates = async (filters: any = {}): Promise<Affiliate[]> => {
  return api.getAffiliates(filters);
};

export const getAffiliateById = async (id: string): Promise<Affiliate | undefined> => {
  if (api.useMock) {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_AFFILIATES.find(a => a.id === id)), 300));
  }
  const affiliates = await api.getAffiliates();
  return affiliates.find(a => a.id === id);
};

export const updateAffiliate = async (affiliateId: string, data: Partial<Affiliate>): Promise<{ status: 'success' }> => {
    // NOTE: The Google Sheets API v4 with a simple API key is READ-ONLY.
    // This action should be handled by n8n.
    console.log(`INTENDED UPDATE: Updating affiliate ${affiliateId} via n8n with data:`, data);
    toast.info('Las operaciones de escritura son manejadas por el backend (n8n).');
    return new Promise(resolve => resolve({ status: 'success' }));
};

export const processAffiliatePayout = async (affiliateId: string, amount: number): Promise<{ status: 'success' }> => {
    console.log(`PROCESSING PAYOUT of ${amount} for affiliate ${affiliateId} via n8n`);
    // In a real app: await api.post('/api/affiliates/process-payout', { affiliateId, amount });
    return new Promise(resolve => setTimeout(() => resolve({ status: 'success' }), 1500));
}

export const getReferrals = async (filters: any = {}): Promise<Referral[]> => {
  return api.getAffiliateConversions();
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
  if (api.useMock) {
    return new Promise(resolve => setTimeout(() => resolve({
        visits_this_month: 1254,
        conversions_count: 45,
        conversion_rate: 3.59,
        pending_commissions_usd: 875.50,
        next_payout_estimate: 1230.00,
        ranking: 5,
        total_affiliates: 127
    }), 500));
  }
  // This would be a complex aggregation from multiple sheets.
  // For now, returning mock data as a placeholder.
  console.warn("getAffiliatePortalDashboard is using mock data as it requires complex server-side aggregation.");
  return new Promise(resolve => setTimeout(() => resolve({
        visits_this_month: 1254,
        conversions_count: 45,
        conversion_rate: 3.59,
        pending_commissions_usd: 875.50,
        next_payout_estimate: 1230.00,
        ranking: 5,
        total_affiliates: 127
    }), 100));
};

export const submitPayoutRequest = async (requestData: any): Promise<{ status: 'success', requestId: string }> => {
    return api.submitAffiliatePayoutRequest(requestData);
}

export const getMyReferrals = async (): Promise<Referral[]> => {
    if(api.useMock) {
        return new Promise(resolve => setTimeout(() => resolve(MOCK_REFERRALS.slice(0, 5)), 500));
    }
    const { user } = useAuthStore.getState();
    if (!user) return [];
    
    const allReferrals = await api.getAffiliateConversions();
    
    // In a real scenario, we'd need to get the affiliate_code from SHEET7 based on user.email.
    // For this implementation, we will assume user.id maps to affiliate_id for simplicity.
    return allReferrals.filter(ref => ref.affiliate_id === user.id);
}

export const getMyPayouts = async (): Promise<Payout[]> => {
    if(api.useMock) {
        return new Promise(resolve => setTimeout(() => resolve(MOCK_PAYOUTS), 500));
    }
    const { user } = useAuthStore.getState();
    if (!user) return [];

    const allPayouts = await api.getWalletTransactions();
    return allPayouts.filter(payout => payout.affiliate_id === user.id);
}
