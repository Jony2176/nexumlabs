
import api from './api';
import { Affiliate, Referral, Visit, Payout } from '../types';
import { MOCK_AFFILIATES, MOCK_REFERRALS, MOCK_VISITS, MOCK_PAYOUTS } from '../data/affiliateMockData';

// --- ADMIN ENDPOINTS ---

export const getAffiliates = async (filters: any = {}): Promise<Affiliate[]> => {
  console.log('Fetching affiliates with filters:', filters);
  // SIMULATION: In a real app, you would use the api instance.
  // const response = await api.get('/api/affiliates', { params: filters });
  // return response.data;

  // Mocked response
  return new Promise(resolve => setTimeout(() => resolve(MOCK_AFFILIATES), 500));
};

export const getAffiliateById = async (id: string): Promise<Affiliate | undefined> => {
  // const response = await api.get(`/api/affiliates/${id}`);
  // return response.data;
  return new Promise(resolve => setTimeout(() => resolve(MOCK_AFFILIATES.find(a => a.id === id)), 300));
};

export const updateAffiliate = async (affiliateId: string, data: Partial<Affiliate>): Promise<{ status: 'success' }> => {
    console.log(`UPDATING AFFILIATE ${affiliateId} to n8n with data:`, data);
    // In a real app, this would be: await api.patch(`/api/affiliates/${affiliateId}`, data);
    return new Promise(resolve => setTimeout(() => resolve({ status: 'success' }), 1000));
};

export const processAffiliatePayout = async (affiliateId: string, amount: number): Promise<{ status: 'success' }> => {
    console.log(`PROCESSING PAYOUT of ${amount} for affiliate ${affiliateId} via n8n`);
    // In a real app: await api.post('/api/affiliates/process-payout', { affiliateId, amount });
    return new Promise(resolve => setTimeout(() => resolve({ status: 'success' }), 1500));
}

export const getReferrals = async (filters: any = {}): Promise<Referral[]> => {
  // const response = await api.get('/api/referrals', { params: filters });
  // return response.data;
  return new Promise(resolve => setTimeout(() => resolve(MOCK_REFERRALS), 500));
};

export const processBulkPayout = async (affiliateIds: string[], method: string): Promise<any> => {
    console.log(`Processing payout for affiliates ${affiliateIds.join(', ')} via ${method}`);
    // const response = await api.post('/api/payouts/process', { affiliateIds, method });
    // return response.data;
    return new Promise(resolve => setTimeout(() => resolve({ status: 'success', processed: affiliateIds.length }), 1500));
}


// --- AFFILIATE PORTAL ENDPOINTS ---

export const getAffiliatePortalDashboard = async () => {
  // const response = await api.get('/api/affiliate/dashboard');
  // return response.data;
  return new Promise(resolve => setTimeout(() => resolve({
    visits_this_month: 1254,
    conversions_count: 45,
    conversion_rate: 3.59,
    pending_commissions_usd: 875.50,
    next_payout_estimate: 1230.00,
    ranking: 5,
    total_affiliates: 127
  }), 500));
};

export const submitPayoutRequest = async (requestData: any): Promise<{ status: 'success', requestId: string }> => {
    return api.submitAffiliatePayoutRequest(requestData);
}

export const getMyReferrals = async (): Promise<Referral[]> => {
    // const response = await api.get('/api/affiliate/referrals');
    // return response.data;
    return new Promise(resolve => setTimeout(() => resolve(MOCK_REFERRALS.slice(0, 5)), 500));
}

export const getMyPayouts = async (): Promise<Payout[]> => {
    // const response = await api.get('/api/affiliate/payouts');
    // return response.data;
    return new Promise(resolve => setTimeout(() => resolve(MOCK_PAYOUTS), 500));
}