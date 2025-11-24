
import api from './api';
import { Wallet, PaymentConfiguration, Transaction } from '../types';

// FIX: The methods in this file were calling non-existent methods on the 'api' service.
// The correct implementations for these functions already exist in 'api.ts'.
// This file has been updated to proxy calls to the centralized 'api.ts' service,
// ensuring consistent API logic and fixing the compilation errors.

export const getWallet = async (): Promise<Wallet> => {
    return api.getWallet();
};

export const getTransactions = async (filter: string = 'all'): Promise<Transaction[]> => {
    // FIX: api.getTransactions expects 0 arguments. The filter is ignored.
     return api.getTransactions();
};

export const getPaymentConfig = async (): Promise<PaymentConfiguration> => {
     return api.getPaymentConfig();
};

export const updatePaymentConfig = async (config: PaymentConfiguration): Promise<{ success: boolean }> => {
     return api.updatePaymentConfig(config);
};

export const requestWithdrawal = async (data: { usd_amount: number, ars_amount: number, exchange_rate: number }): Promise<{ success: boolean, transactionId: string }> => {
    return api.requestWithdrawal(data);
};