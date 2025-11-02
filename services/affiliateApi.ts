


import api from './api';
import { Affiliate, Referral, Visit, Payout } from '../types';
import { MOCK_AFFILIATES, MOCK_REFERRALS, MOCK_VISITS, MOCK_PAYOUTS } from '../data/affiliateMockData';
import toast from 'react-hot-toast';

// --- ADMIN ENDPOINTS ---

export const getAffiliates = async (filters: any = {}): Promise<Affiliate[]> => {
  // FIX: Delegated affiliate data fetching to the main API service to resolve API key errors
  // and centralize data access logic, removing the direct Google Sheets dependency.
  return api.getAffiliates(filters);
};

export const getAffiliateById = async (id: string): Promise<Affiliate | undefined> => {
  // This would also need to be adapted if individual fetching is required
  return new Promise(resolve => setTimeout(() => resolve(MOCK_AFFILIATES.find(a => a.id === id)), 300));
};

export const updateAffiliate = async (affiliateId: string, data: Partial<Affiliate>): Promise<{ status: 'success' }> => {
    // NOTE: The Google Sheets API v4 with a simple API key is READ-ONLY.
    // To enable write operations, OAuth2 or a backend service (like the existing n8n) would be required.
    // This function will log the intended action but will not modify the sheet.
    console.log(`INTENDED UPDATE (read-only): Updating affiliate ${affiliateId} with data:`, data);
    toast.info('La escritura en Google Sheets no está habilitada en este modo.');
    return new Promise(resolve => resolve({ status: 'success' }));
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