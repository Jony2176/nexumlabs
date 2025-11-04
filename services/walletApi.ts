
import api from './api';
import mockApi from './mockApi';
import { Wallet, PaymentConfiguration, Transaction } from '../types';

const affiliateId = 'usr_affiliate_1'; // Hardcoded for mock scenario

export const getWallet = async (): Promise<Wallet> => {
    if(api.useMock) {
        return mockApi.getWallet(affiliateId);
    }
    const response = await api.performDbRequest({
        method: 'POST',
        body: JSON.stringify({ action: 'get_wallet' })
    });
    return response;
};

export const getTransactions = async (filter: string = 'all'): Promise<Transaction[]> => {
     if(api.useMock) {
        return mockApi.getTransactions(affiliateId, filter);
    }
    const response = await api.performDbRequest({
        method: 'POST',
        body: JSON.stringify({ action: 'get_transactions', payload: { filter } })
    });
    return response;
};

export const getPaymentConfig = async (): Promise<PaymentConfiguration> => {
     if(api.useMock) {
        return mockApi.getPaymentConfig(affiliateId);
    }
    const response = await api.performDbRequest({
        method: 'POST',
        body: JSON.stringify({ action: 'get_payment_config' })
    });
    return response;
};

export const updatePaymentConfig = async (config: PaymentConfiguration): Promise<{ success: boolean }> => {
     if(api.useMock) {
        return mockApi.updatePaymentConfig(affiliateId, config);
    }
    const response = await api.performApiRequest({
        method: 'POST',
        body: JSON.stringify({ action: 'update_payment_config', payload: config })
    });
    return response;
};

export const requestWithdrawal = async (data: { usd_amount: number, ars_amount: number, exchange_rate: number }): Promise<{ success: boolean, transactionId: string }> => {
    if(api.useMock) {
        return mockApi.requestWithdrawal(data);
    }
    const response = await api.performApiRequest({
        method: 'POST',
        body: JSON.stringify({ action: 'request_withdrawal', payload: data })
    });
    return response;
};
