

import { User, Organization, Subscription, Addon, PaymentMethod, Invoice, Plan } from '../types';
import { MOCK_WALLET, MOCK_PAYMENT_CONFIG, MOCK_TRANSACTIONS } from '../data/walletMockData';
import { MOCK_ADDONS, MOCK_PAYMENT_METHODS, MOCK_INVOICES } from '../data/subscriptionMockData';
import { PRICING_PLANS } from '../constants';


// The user object stored in the mock database
interface MockUser extends User {
    organizationName: string;
    trialEndsAt: string;
    createdAt: string;
    organization: Organization;
    password?: string;
    onboardingCompleted: boolean;
}

class MockAPI {
  private users: MockUser[];

  constructor() {
    // Load users from localStorage on initialization
    this.users = JSON.parse(localStorage.getItem('mock_users') || '[]');
  }

  private async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  private saveUsers() {
      localStorage.setItem('mock_users', JSON.stringify(this.users));
  }

  // --- AUTHENTICATION ---
  async register(data: any) {
    await this.delay();
    
    const isHardcodedEmail = ['demo@nexum.com', 'superadmin@nexum.com', 'affiliate@nexum.com'].includes(data.email);
    if (isHardcodedEmail || this.users.find(u => u.email === data.email)) {
      throw new Error('El email ya está registrado');
    }

    const orgId = `org_${Date.now()}`;
    const newOrganization: Organization = {
        id: orgId,
        name: data.organizationName || 'Organización Demo',
        slug: (data.organizationName || 'Organización Demo').toLowerCase().replace(/\s+/g, '-'),
        email: data.email,
        phone: data.phone || '',
        modules: {}, // Mock doesn't handle module config persistence yet
        subscription_status: 'trialing',
        trial_ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const newUser: MockUser = {
      id: `usr_${Date.now()}`,
      orgId: orgId,
      email: data.email,
      firstName: data.firstName || 'Usuario',
      lastName: data.lastName || 'Demo',
      role: 'owner',
      phone: data.phone || '',
      organizationName: newOrganization.name,
      trialEndsAt: newOrganization.trial_ends_at,
      createdAt: new Date().toISOString(),
      organization: newOrganization,
      password: data.password,
      onboardingCompleted: false, // New users need onboarding
    };

    this.users.push(newUser);
    this.saveUsers();

    return {
      token: `mock_token_${Date.now()}`,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        role: newUser.role,
        orgId: newUser.orgId,
        onboardingCompleted: newUser.onboardingCompleted,
      },
      organization: newUser.organization,
    };
  }

  async login(email: string, password: string) {
    await this.delay();

    // 1. Handle hardcoded demo users as special cases
    if (email === 'demo@nexum.com') {
        if (password === 'demo123') {
            return {
                token: `mock_token_demo_${Date.now()}`,
                user: { id: 'usr_demo', orgId: 'org_demo', email: 'demo@nexum.com', firstName: 'Usuario', lastName: 'Demo', role: 'owner', onboardingCompleted: true },
                organization: { id: 'org_demo', name: 'Estudio Demo', slug: 'estudio-demo', email: 'demo@nexum.com', phone: '123456789', modules: {}, subscription_status: 'trialing', trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() }
            };
        } else {
            throw new Error('Credenciales incorrectas');
        }
    }

    if (email === 'superadmin@nexum.com') {
        if (password === 'demo123') {
            return {
                token: `mock_token_superadmin_${Date.now()}`,
                user: { id: 'usr_superadmin', orgId: 'org_admin', email: 'superadmin@nexum.com', firstName: 'Super', lastName: 'Admin', role: 'super_admin', onboardingCompleted: true },
                organization: { id: 'org_admin', name: 'NEXUM Labs HQ', slug: 'nexum-labs-hq', email: 'superadmin@nexum.com', phone: '111222333', modules: {}, subscription_status: 'active', trial_ends_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() }
            };
        } else {
            throw new Error('Credenciales incorrectas');
        }
    }
    
    if (email === 'affiliate@nexum.com') {
        if (password === 'demo123') {
            return {
                token: `mock_token_affiliate_${Date.now()}`,
                user: { id: 'usr_affiliate_1', orgId: 'org_affiliate', email: 'affiliate@nexum.com', firstName: 'Juan', lastName: 'Afiliado', role: 'affiliate', onboardingCompleted: true },
                organization: { id: 'org_affiliate', name: 'Marketing Pro', slug: 'marketing-pro', email: 'affiliate@nexum.com', phone: '987654321', modules: {}, subscription_status: 'active', trial_ends_at: new Date().toISOString() }
            };
        } else {
            throw new Error('Credenciales incorrectas');
        }
    }

    // 2. Check for registered users from localStorage
    const user = this.users.find(u => u.email === email);
    if (user && user.password === password) {
      return {
        token: `mock_token_${Date.now()}`,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
          orgId: user.orgId,
          onboardingCompleted: user.onboardingCompleted,
        },
        organization: user.organization
      };
    }
    
    // 3. If no user is found, or password was wrong for a localStorage user
    throw new Error('Credenciales incorrectas');
  }

  // --- MODULES ---
  async getActiveModules() {
    await this.delay(200);
    return {
      success: true,
      modules: [
        { id: 'elias_whatsapp', name: 'ELIAS WhatsApp Bot', active: true, trial: true },
        { id: 'elias_llamadas', name: 'ELIAS Llamadas', active: true, trial: false },
        { id: 'dashboard_premium', name: 'Dashboard Premium', active: true, trial: false },
        { id: 'elias_avatar_partner', name: 'ELIAS Avatar Partner', active: false, trial: false },
        { id: 'jurispredict_ai', name: 'JurisPredict AI', active: false, trial: false },
      ]
    };
  }
  
  // --- DASHBOARD ---
  async getDashboardMetrics() {
    await this.delay(400);
    return {
      success: true,
      metrics: {
        mrr: 12450,
        activeClients: 47,
        churnRate: 5.2,
        newClientsThisMonth: 8,
        messagesThisMonth: 15234,
        callMinutesThisMonth: 2340
      }
    };
  }
  
  // --- SUBSCRIPTION ---

  async getSubscription(): Promise<{ data: Subscription }> {
    await this.delay(300);
    const storedSub = localStorage.getItem('mock_subscription');
    if (storedSub) {
      return { data: JSON.parse(storedSub) };
    }
    const defaultSub: Subscription = {
        id: 'sub_mock_123',
        plan_id: 'pro',
        status: 'active',
        price: 199,
        currency: 'USD',
        current_period_end: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        modules: ['elias_whatsapp', 'elias_llamadas'],
    };
    localStorage.setItem('mock_subscription', JSON.stringify(defaultSub));
    return { data: defaultSub };
  }

  async getAddons(): Promise<{ data: Addon[] }> {
    await this.delay(400);
    return { data: MOCK_ADDONS };
  }

  async getPaymentMethods(): Promise<{ data: PaymentMethod[] }> {
    await this.delay(500);
    return { data: MOCK_PAYMENT_METHODS };
  }

  async getInvoices(): Promise<{ data: Invoice[] }> {
    await this.delay(600);
    return { data: MOCK_INVOICES };
  }

  async getAllPlans(): Promise<{ data: Plan[] }> {
      await this.delay(200);
      return { data: PRICING_PLANS };
  }

  async changePlan(newPlanId: string): Promise<{ data: Subscription }> {
      await this.delay(2000);
      const { data: currentSub } = await this.getSubscription();
      const newPlan = PRICING_PLANS.find(p => p.id === newPlanId);
      if (!newPlan) throw new Error('Plan no encontrado');

      const updatedSub: Subscription = {
          ...currentSub,
          plan_id: newPlanId,
          price: newPlan.price.monthly,
      };
      localStorage.setItem('mock_subscription', JSON.stringify(updatedSub));
      return { data: updatedSub };
  }

  async cancelSubscription(): Promise<{ data: Subscription }> {
      await this.delay(1500);
      const { data: currentSub } = await this.getSubscription();
      const updatedSub: Subscription = {
          ...currentSub,
          status: 'cancelled',
      };
      localStorage.setItem('mock_subscription', JSON.stringify(updatedSub));
      return { data: updatedSub };
  }

  async applyRetentionOffer(): Promise<{ data: Subscription }> {
      await this.delay(1000);
      const { data: currentSub } = await this.getSubscription();
      const updatedSub: Subscription = {
          ...currentSub,
          price: currentSub.price * 0.5,
      };
      localStorage.setItem('mock_subscription', JSON.stringify(updatedSub));
      return { data: updatedSub };
  }
  
  async pauseSubscription(): Promise<{ data: Subscription }> {
      await this.delay(1000);
      const { data: currentSub } = await this.getSubscription();
       const updatedSub: Subscription = {
          ...currentSub,
          status: 'paused', // Assume 'paused' is a valid status
          current_period_end: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // Paused for 3 months
      };
      localStorage.setItem('mock_subscription', JSON.stringify(updatedSub));
      return { data: updatedSub };
  }

  // FIX: Added mock implementation for WhatsApp metrics and status toggling.
  private whatsappMetrics = {
    enabled: true,
    number: '+54 9 11 5049-9608',
    hoy: {
        mensajes_enviados: 124,
        mensajes_recibidos: 98,
        conversaciones: 47,
        ultima_actividad: '14:23 hs',
    },
    mes: {
        mensajes_totales: 4890,
    },
  };

  async getWhatsappMetrics() {
    await this.delay(300);
    // Simulate some activity
    this.whatsappMetrics.hoy.mensajes_enviados += Math.floor(Math.random() * 5);
    this.whatsappMetrics.hoy.mensajes_recibidos += Math.floor(Math.random() * 3);
    this.whatsappMetrics.hoy.conversaciones += Math.floor(Math.random() * 2);
    return { ...this.whatsappMetrics };
  }

  async toggleWhatsappStatus(enabled: boolean) {
      await this.delay(1000);
      this.whatsappMetrics.enabled = enabled;
      return { success: true, enabled: this.whatsappMetrics.enabled };
  }

  async submitAffiliatePayoutRequest(requestData: any) {
    await this.delay(1000);
    console.log('MOCK: SUBMITTING PAYOUT REQUEST TO N8N:', requestData);
    return { status: 'success', requestId: `req_${Date.now()}` };
  }
  
  // --- WALLET ---
  async getWallet(affiliateId: string) {
    await this.delay(600);
    console.log(`MOCK: Fetching wallet for ${affiliateId}`);
    return MOCK_WALLET;
  }
  
  async requestWithdrawal(data: any) {
    await this.delay(2000);
    console.log('MOCK: Processing withdrawal request:', data);
    // In a real scenario, this would trigger a MercadoPago payout
    // and update the wallet balance in the DB.
    MOCK_WALLET.balance_usd = 0; // Simulate balance reset
    MOCK_WALLET.balance_ars = 0;
    return { success: true, transactionId: `txn_${Date.now()}` };
  }
  
  async getPaymentConfig(affiliateId: string) {
    await this.delay(400);
    console.log(`MOCK: Fetching payment config for ${affiliateId}`);
    return MOCK_PAYMENT_CONFIG;
  }

  async updatePaymentConfig(affiliateId: string, config: any) {
    await this.delay(1000);
    console.log(`MOCK: Updating payment config for ${affiliateId} with:`, config);
    // Here you would update the stored config
    Object.assign(MOCK_PAYMENT_CONFIG, config);
    return { success: true };
  }
  
  async getTransactions(affiliateId: string, filter: string) {
    await this.delay(800);
    console.log(`MOCK: Fetching transactions for ${affiliateId} with filter: ${filter}`);
    if (filter === 'all') {
      return MOCK_TRANSACTIONS;
    }
    return MOCK_TRANSACTIONS.filter(t => t.type === (filter === 'earnings' ? 'earning' : 'withdrawal'));
  }
  
  async chatWithData(message: string) {
      await this.delay(1500); // Simulate network delay
      const lowerMessage = message.toLowerCase();
      let responseText = "No he entendido tu pregunta. ¿Puedes reformularla? Mis capacidades actuales incluyen: resumir el MRR, listar clientes activos o mostrar el afiliado con más ingresos.";
      
      if (lowerMessage.includes('mrr')) {
          responseText = "El MRR actual es de $15,234 USD. Ha habido un crecimiento del 12.5% este mes.";
      } else if (lowerMessage.includes('clientes activos')) {
          responseText = "Actualmente tienes 25 clientes activos. 3 de ellos son nuevos este mes.";
      } else if (lowerMessage.includes('afiliado')) {
          responseText = "El afiliado con mayores ingresos este mes es 'Marketing Digital Pro' con $1,200 USD.";
      }
      
      return { success: true, data: { response: responseText } };
  }
}

// Export a single instance
const mockApi = new MockAPI();
export default mockApi;