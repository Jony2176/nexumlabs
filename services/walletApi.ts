
import api from './api';
import mockApi from './mockApi';
import { Wallet, PaymentConfiguration, Transaction } from '../types';

const affiliateId = 'usr_affiliate_1'; // Hardcoded for mock scenario

export const getWallet = async (): Promise<Wallet> => {
    if(api.useMock) {
        return mockApi.getWallet(affiliateId);
    }
    // Real API call
    const response = await api.performRequest(`/api/affiliate/wallet/${affiliateId}`, { method: 'GET' });
    return response.data;
};

export const getTransactions = async (filter: string = 'all'): Promise<Transaction[]> => {
     if(api.useMock) {
        return mockApi.getTransactions(affiliateId, filter);
    }
    const response = await api.performRequest(`/api/affiliate/transactions/${affiliateId}?filter=${filter}`, { method: 'GET' });
    return response.data;
};

export const getPaymentConfig = async (): Promise<PaymentConfiguration> => {
     if(api.useMock) {
        return mockApi.getPaymentConfig(affiliateId);
    }
    const response = await api.performRequest(`/api/affiliate/payment-config`, { method: 'GET' });
    return response.data;
};

export const updatePaymentConfig = async (config: PaymentConfiguration): Promise<{ success: boolean }> => {
     if(api.useMock) {
        return mockApi.updatePaymentConfig(affiliateId, config);
    }
    const response = await api.performRequest('/api/affiliate/payment-config', {
        method: 'PUT',
        body: JSON.stringify(config)
    });
    return response;
};

export const requestWithdrawal = async (data: { usd_amount: number, ars_amount: number, exchange_rate: number }): Promise<{ success: boolean, transactionId: string }> => {
    if(api.useMock) {
        return mockApi.requestWithdrawal(data);
    }
    const response = await api.performRequest('/api/affiliate/withdraw', {
        method: 'POST',
        body: JSON.stringify({ ...data, automatic: true })
    });
    return response;
};
