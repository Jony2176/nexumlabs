

import mockApi from './mockApi';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { ClientData, Wallet, PaymentConfiguration, Transaction, Affiliate, Subscription, Invoice, Referral, Payout, AffiliateStatus, PaymentMethodType } from '../types';
import { mockClients } from '../data/adminClientsMockData';
import { MOCK_AFFILIATES, MOCK_REFERRALS, MOCK_PAYOUTS } from '../data/affiliateMockData';
import { PRICING_PLANS } from '../constants';

// --- CONFIGURATION ---
// Se desactiva el modo MOCK para apuntar al backend de n8n y Google Sheets.
export const USE_MOCK = false;
// -------------------

class NexumAPI {
  public useMock: boolean;
  private authURL: string;
  private dbURL: string;
  private apiURL: string;

  constructor() {
    this.useMock = USE_MOCK;
    this.authURL = 'https://n8n-n8n.2jdegc.easypanel.host/webhook/authnexum2176';
    this.dbURL = 'https://n8n-n8n.2jdegc.easypanel.host/webhook/nexum_db';
    this.apiURL = 'https://n8n-n8n.2jdegc.easypanel.host/webhook/nexum/api';
    
    if (this.useMock) {
      console.warn('🔧 MODO MOCK ACTIVADO - Usando datos simulados. Para desactivar, edita services/api.ts');
    } else {
      console.log('🚀 MODO REAL ACTIVADO - Conectando a servicios en vivo (n8n).');
    }
  }

  private getHeaders(): HeadersInit {
      const headers: HeadersInit = {
          'Content-Type': 'application/json',
      };
      // No se necesita JWT para la conexión directa a la base de datos a través de n8n.
      return headers;
  }
  
  private buildActionPayload(action: string, payload: any) {
    const { user, organization } = useAuthStore.getState();
    return {
      action,
      payload,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'web_app_v4.0',
        user_id: user?.id || null,
        org_id: organization?.id || null,
      }
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
        if (response.status === 401) {
            useAuthStore.getState().logout();
            window.location.hash = '/login';
            toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }
        
        try {
            const errorJson = await response.json();
            const message = errorJson.error || errorJson.message || `Error del servidor: ${response.status}`;
            throw new Error(message);
        } catch (e) {
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }
    }

    const text = await response.text();
    if (!text) {
        return { success: true, data: null };
    }
    
    let json;
    try {
        json = JSON.parse(text);
    } catch (error) {
        console.warn("Initial JSON parse failed. Attempting to extract and clean response text.", text);
        const firstOpen = text.search(/\{|\[/);
        if (firstOpen === -1) {
          console.error("Response does not contain a JSON object or array.", text);
          throw new Error("El servidor envió una respuesta con un formato inválido.");
        }
        
        const lastCloseBracket = text.lastIndexOf(']');
        const lastCloseBrace = text.lastIndexOf('}');
        const lastClose = Math.max(lastCloseBracket, lastCloseBrace);

        if (lastClose === -1 || lastClose < firstOpen) {
            console.error("Response does not contain a valid JSON object or array end.", text);
            throw new Error("El servidor envió una respuesta con un formato inválido.");
        }
        const jsonString = text.substring(firstOpen, lastClose + 1);
        try {
            json = JSON.parse(jsonString);
        } catch (parseError) {
             console.error("Failed to parse the extracted JSON string:", parseError, jsonString);
             throw new Error("El servidor envió una respuesta con un formato inválido.");
        }
    }
    
    if (typeof json.success === 'boolean') {
        if (json.success) {
            return json.data !== undefined ? json.data : json;
        } else {
            throw new Error(json.error || json.message || 'El backend indicó un error pero no proveyó un mensaje.');
        }
    }
    
    if (json.error) {
        throw new Error(typeof json.error === 'object' ? JSON.stringify(json.error) : json.error);
    }

    return json;
  }
  
  public async performDbRequest(options: RequestInit) {
      try {
          const response = await fetch(this.dbURL, options);
          return this.handleResponse(response);
      } catch (error) {
          console.error(`Error en la solicitud a la BD:`, error);
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('No se pudo conectar con el servidor de base de datos.');
          }
          throw error;
      }
  }

  public async performApiRequest(options: RequestInit) {
      try {
          const response = await fetch(this.apiURL, options);
          return this.handleResponse(response);
      } catch (error) {
          console.error(`Error en la solicitud a la API:`, error);
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('No se pudo conectar con el servidor de la API.');
          }
          throw error;
      }
  }

  private async getSheetData(sheetName: string, fallbackData: any): Promise<any[]> {
    if (this.useMock) {
      return new Promise(resolve => setTimeout(() => resolve(fallbackData), 300));
    }
    try {
      const body = this.buildActionPayload(`get_${sheetName}`, {});
      const data = await this.performDbRequest({
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      return Array.isArray(data) ? data : (data ? [data] : []);
    } catch (error) {
      console.error(`Error fetching sheet ${sheetName} via n8n:`, error);
      toast.error(`No se pudo cargar: ${sheetName}. Usando datos de respaldo.`);
      return fallbackData;
    }
  }

  async register(data: any) {
    if (this.useMock) {
      return mockApi.register(data);
    }
    const body = {
        action: 'register',
        payload: data,
    };
    const response = await fetch(this.apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  async login(email: string, password: string) {
    if (this.useMock) {
      return mockApi.login(email, password);
    }
    const body = {
        action: 'login',
        payload: { email, password },
    };
    const response = await fetch(this.authURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  async getActiveModules() {
    if (this.useMock) {
      return mockApi.getActiveModules();
    }
    return this.getSheetData('module_usage', []);
  }

  async getClients(): Promise<ClientData[]> {
    const rawClients: any[] = await this.getSheetData('organizations', mockClients);

    if (rawClients === mockClients) return mockClients;

    const getMrrFromPlan = (planId: string): number => {
        const plan = PRICING_PLANS.find(p => p.id.toLowerCase() === planId.toLowerCase());
        return plan ? plan.price.monthly : 0;
    }

    return rawClients.map(raw => {
      const planId = raw.plan || 'lite';
      const mrr = getMrrFromPlan(planId);
      
      return {
        id: raw.id,
        empresa: raw.name,
        contacto: raw.email || 'N/A',
        plan: (planId.charAt(0).toUpperCase() + planId.slice(1)) as ClientData['plan'],
        mrr: raw.subscription_status === 'trialing' ? 0 : mrr,
        estado: (raw.subscription_status as ClientData['estado']) || 'active',
        consumoWhatsApp: { value: Math.floor(Math.random() * 1000), limit: 1000 },
        consumoLlamadas: { value: Math.floor(Math.random() * 300), limit: 300 },
        healthScore: Number(raw.health_score) || Math.floor(Math.random() * 50) + 50,
        fechaInicio: raw.created_at || new Date().toISOString(),
        ultimoPago: { fecha: raw.last_payment_date || new Date().toISOString(), estado: (raw.last_payment_status as any) || 'paid' },
        logoUrl: raw.logo_url || `https://avatar.vercel.sh/${raw.name.replace(/\s+/g, '')}.png?size=40`,
        cuit: raw.cuit,
        direccion: raw.address,
      };
    });
  }

  async getDashboardMetrics() {
    if (this.useMock) {
      return mockApi.getDashboardMetrics();
    }
    return this.getSheetData('Dashboard', {});
  }

  async getSubscriptions(): Promise<any[]> {
      return this.getSheetData('subscriptions', []);
  }

  async getSubscription(): Promise<Subscription | null> {
    const { organization } = useAuthStore.getState();
    if (!organization) return null;
    if (this.useMock) {
      const { data } = await mockApi.getSubscription();
      return data;
    }
    const allSubscriptions: any[] = await this.getSubscriptions();
    const userSubscription = allSubscriptions.find(sub => sub.org_id === organization.id);
    return userSubscription || null;
  }

  async getPayments(): Promise<Invoice[]> {
    const { organization } = useAuthStore.getState();
    if (!organization) return [];
     if (this.useMock) {
      const { data } = await mockApi.getInvoices();
      return data;
    }
    const allPayments: any[] = await this.getSheetData('payments', []);
    return allPayments
        .filter(p => p.org_id === organization.id)
        .map(p => ({
            id: p.id,
            org_id: p.org_id,
            date: p.created_at,
            period: new Date(p.created_at).toLocaleString('es-AR', { month: 'long', year: 'numeric' }),
            amount: p.amount,
            status: p.status === 'approved' ? 'paid' : p.status,
            pdfUrl: '#'
        }));
  }

  async getWhatsappMetrics() {
    if (this.useMock) {
      return mockApi.getWhatsappMetrics();
    }
    return this.getSheetData('usage_analytics', {});
  }

  async toggleWhatsappStatus(enabled: boolean) {
    if (this.useMock) {
      return mockApi.toggleWhatsappStatus(enabled);
    }
    const body = this.buildActionPayload('toggle_whatsapp_status', { enabled });
    return this.performApiRequest({ 
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
  }

  async submitAffiliatePayoutRequest(data: any) {
    if (this.useMock) {
      return mockApi.submitAffiliatePayoutRequest(data);
    }
    const body = this.buildActionPayload('request_affiliate_payout', data);
    return this.performApiRequest({
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
    });
  }
  
  async getAffiliates(filters: any = {}): Promise<Affiliate[]> {
    const rawData: any[] = await this.getSheetData('affiliates', MOCK_AFFILIATES);

    if (rawData === MOCK_AFFILIATES) return MOCK_AFFILIATES;
    
    const nameFromEmail = (email: string) => {
        if (!email) return 'Afiliado';
        return email.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };
    
    return rawData.map(raw => {
      const name = nameFromEmail(raw.user_email);
      
      return {
        id: raw.id,
        user_email: raw.user_email,
        nombre: name,
        estado: (raw.status as AffiliateStatus) || 'pending',
        tasa_primer_mes: Number(raw.commission_rate_first) * 100 || 0,
        tasa_recurrente: Number(raw.commission_rate_recurring) * 100 || 0,
        cookie_days: 30,
        codigo_cupon: raw.affiliate_code,
        wallet_credito: Number(raw.balance_available) || 0,
        metodo_pago: (raw.payment_method as PaymentMethodType) || 'transferencia',
        cbu_cvu: raw.bank_account,
        fecha_alta: raw.created_at,
        fecha_aprobacion: raw.updated_at,
        referrals: { active: 0, total: 0 },
        revenue: { current_month: 0, lifetime: Number(raw.total_earned) || 0 },
        commission: { pending: Number(raw.pending_payment) || 0, paid: 0, total: (Number(raw.total_earned) || 0) },
        conversion_rate: 0,
        avatarUrl: raw.avatar_url || `https://i.pravatar.cc/150?u=${raw.id}`,
      };
    });
  }
  
  async getAffiliateConversions(): Promise<Referral[]> {
      return this.getSheetData('affiliate_conversions', MOCK_REFERRALS);
  }
  
  async getWalletTransactions(): Promise<Payout[]> {
      return this.getSheetData('wallet_transactions', MOCK_PAYOUTS);
  }

  async getWallet(): Promise<Wallet> {
     if(this.useMock) {
        return mockApi.getWallet('usr_affiliate_1');
    }
    const { user } = useAuthStore.getState();
    if (!user) throw new Error("User not authenticated");
    const allAffiliates = await this.getSheetData('affiliates', []);
    const affiliateData = allAffiliates.find(a => a.user_email === user.email);
    if (!affiliateData) throw new Error("Affiliate data not found");

    return {
        affiliate_id: affiliateData.id,
        balance_usd: affiliateData.balance_available || 0,
        balance_ars: 0,
        exchange_rate: 0,
        total_referrals: 0,
        total_earned_usd: affiliateData.total_earned || 0,
        total_payouts: 0
    };
  }

  async getTransactions(filter: string = 'all'): Promise<Transaction[]> {
     if(this.useMock) {
        return mockApi.getTransactions('usr_affiliate_1', filter);
    }
    return this.getSheetData('wallet_transactions', []);
  }

  async getPaymentConfig(): Promise<PaymentConfiguration> {
     if(this.useMock) {
        return mockApi.getPaymentConfig('usr_affiliate_1');
    }
    const { user } = useAuthStore.getState();
     if (!user) throw new Error("User not authenticated");
    const allAffiliates = await this.getSheetData('affiliates', []);
    const affiliateData = allAffiliates.find(a => a.user_email === user.email);
    if (!affiliateData) throw new Error("Affiliate data not found");
    
    return {
        affiliate_id: affiliateData.id,
        cuit: affiliateData.cuit || '',
        business_name: '',
        address: '',
        mp_email: affiliateData.mp_email || '',
        mp_alias: '',
        mp_verified: !!affiliateData.mp_email,
    }
  }

  async updatePaymentConfig(config: PaymentConfiguration): Promise<{ success: boolean }> {
     if(this.useMock) {
        return mockApi.updatePaymentConfig('usr_affiliate_1', config);
    }
    const body = this.buildActionPayload('update_payment_config', { config });
    return this.performApiRequest({
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
    });
  }
  
  async requestWithdrawal(data: { usd_amount: number, ars_amount: number, exchange_rate: number }): Promise<{ success: boolean, transactionId: string }> {
    if(this.useMock) {
        return mockApi.requestWithdrawal(data);
    }
    const body = this.buildActionPayload('request_withdrawal', { ...data, automatic: true });
    return this.performApiRequest({
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
    });
  }

  async chatWithData(message: string) {
    if (this.useMock) {
      return mockApi.chatWithData(message);
    }
    const body = this.buildActionPayload('chat_with_data', { message });
    try {
        const response = await fetch(this.apiURL, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            if (response.status === 401) {
                useAuthStore.getState().logout();
                window.location.hash = '/login';
                toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
            }
            const errorBody = await response.text();
            let errorMessage = 'Ocurrió un error inesperado en el chat';
            if (errorBody) {
                try {
                    const errorJson = JSON.parse(errorBody);
                    errorMessage = errorJson.error?.message || errorJson.message || 'El servidor devolvió un error.';
                } catch (e) {
                    errorMessage = errorBody.substring(0, 200);
                }
            } else {
                errorMessage = `Error del servidor: ${response.status} ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        const text = await response.text();
        if (!text) {
          return { response: "Recibí tu mensaje, pero no tengo una respuesta en este momento." };
        }
        try {
            const json = JSON.parse(text);
            let data = json;
            if (Array.isArray(data) && data.length > 0) {
                data = data[0];
            }
            if (typeof data.success === 'boolean' && 'data' in data) {
                return data.data; 
            }
            return data;
        } catch (e) {
            return { response: text };
        }
    } catch (error) {
        console.error(`Error en la solicitud de chat:`, error);
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error('No se pudo conectar con el asistente. Revisa tu conexión.');
        }
        throw error;
    }
  }
}

export default new NexumAPI();