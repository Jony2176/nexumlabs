
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { 
    ClientData, Wallet, PaymentConfiguration, Transaction, Affiliate, Subscription, Invoice, Referral, Payout, AffiliateStatus, PaymentMethodType,
    ClientDashboardData, UsageHistoryResponse, ActivityEvent, AffiliateDashboardData, RevenueHistoryResponse, ReferralData, AdminOverviewData, MRRHistoryResponse,
    Organization, User as UserType
} from '../types';

// --- CONFIGURATION ---
export const USE_MOCK = false;
const API_BASE_URL = "https://n8n-n8n.2jdegc.easypanel.host/webhook/nexum/api";
// -------------------

// --- RAW INTERFACES (Mapping Database Schema) ---
// Estas interfaces representan exactamente lo que devuelve N8N de Google Sheets

interface RawOrganization {
    id: string;
    name: string;
    slug: string;
    email: string;
    phone?: string;
    plan?: string;
    status?: string;
    subscription_status?: string;
    modules_config?: string | object; // Puede venir como JSON string
    current_usage?: string | object;
    trial_ends_at?: string;
    next_billing_date?: string;
    created_at?: string;
}

interface RawSubscription {
    id: string;
    org_id: string;
    plan_id: string;
    status: string;
    price_usd?: string | number;
    price_ars?: string | number;
    next_billing_date?: string;
    mercadopago_subscription_id?: string;
    auto_renew?: boolean | string;
    created_at?: string;
}

interface RawPayment {
    id: string;
    org_id: string;
    amount_usd?: string | number;
    amount_ars?: string | number;
    status: string;
    mercadopago_payment_id?: string;
    payment_method?: string;
    created_at?: string;
}

interface RawAffiliate {
    id: string;
    user_email?: string;
    email?: string; // Backup field
    nombre?: string;
    name?: string; // Backup field
    estado?: string;
    status?: string; // Backup
    affiliate_code?: string;
    balance_usd?: string | number;
    balance_ars?: string | number;
    tasa_primer_mes?: string | number;
    tasa_recurrente?: string | number;
    total_referrals?: string | number;
    active_referrals?: string | number;
    tier?: string;
    created_at?: string;
}

interface RawAffiliateConversion {
    id: string;
    affiliate_id: string;
    org_id: string;
    status: string;
    plan_id: string;
    plan_type?: string; // 'primer_mes' | 'recurrente'
    monthly_commission_usd?: string | number;
    total_commission_paid?: string | number;
    conversion_date?: string;
    created_at?: string;
}

interface RawUsage {
    id: string;
    org_id: string;
    module: string;
    quantity: string | number;
    event_type?: string;
    created_at: string;
}

interface RawTransaction {
    id: string;
    affiliate_id: string;
    type: string; // 'earning' | 'withdrawal'
    amount_usd?: string | number;
    amount_ars?: string | number;
    status: string;
    description?: string;
    created_at: string;
}

// --- HELPER FUNCTIONS ---

async function handleApiResponse(response: Response) {
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
            if (e instanceof Error) {
                throw e;
            }
            throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }
    }

    const text = await response.text();
    if (!text) {
        return null;
    }
    
    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Failed to parse JSON response:", text);
        return { response: text }; 
    }
}

async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { token } = useAuthStore.getState();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return handleApiResponse(response) as Promise<T>;
}

class NexumAPI {
  // =================================================================
  // HELPER FOR 'chat' EVENT TYPE
  // Estructura estricta para el Agente de IA en N8N
  // =================================================================
  private getChatBody(action: string, payloadObject: any) {
    const { user, organization } = useAuthStore.getState();
    
    const body = {
        event_type: 'chat',
        action: action,
        payload: payloadObject, 
        metadata: {
            user_id: user?.id || 'guest',
            user_role: user?.role || 'guest',
            org_id: organization?.id || 'unknown'
        }
    };
    
    return JSON.stringify(body);
  }

  // =================================================================
  // HELPER FOR 'database' EVENT TYPE
  // Sends the SHEET NAME directly in the 'action' field
  // =================================================================
  private async readSheet<T>(sheetName: string): Promise<T[]> {
      const response = await apiClient<any>('', {
          method: 'POST',
          body: JSON.stringify({
              event_type: 'database',
              action: sheetName 
          })
      });

      // 1. Direct array
      if (Array.isArray(response)) {
          return response;
      }

      // 2. Wrapped array
      if (response && typeof response === 'object') {
          if (Array.isArray(response.data)) return response.data;
          if (Array.isArray(response.values)) return response.values;
          if (Array.isArray(response[sheetName])) return response[sheetName];
          
          // Search logic
          const keys = Object.keys(response);
          for (const key of keys) {
              if (Array.isArray(response[key])) {
                  return response[key];
              }
          }
      }

      console.warn(`[API] readSheet('${sheetName}') unexpected format`, response);
      return [];
  }

  // =================================================================
  // AUTH & WRITE METHODS
  // =================================================================
  
  async login(email: string, password: string) {
    return apiClient('', {
        method: 'POST',
        body: JSON.stringify({ event_type: 'auth', action: 'login', email, password }),
    });
  }
  
  async register(data: any) {
    return apiClient('', {
        method: 'POST',
        body: JSON.stringify({
            event_type: 'chat',
            action: 'register_client',
            payload: data,
            metadata: { user_id: 'new_user', user_role: 'guest', org_id: 'new_org' }
        }),
    });
  }

  async completeOnboarding(data: { 
    userId: string | undefined, 
    organizationData: any, 
    planId: string, 
    whatsappConfig: any 
  }) {
    return apiClient('', {
        method: 'POST',
        body: this.getChatBody('complete_onboarding', data)
    });
  }

  async chatWithData(message: string) { 
    return apiClient('', {
        method: 'POST',
        body: this.getChatBody('chat_interaction', { message: message })
    });
  }

  async toggleWhatsappStatus(enabled: boolean) { 
    return apiClient('', {
        method: 'POST',
        body: this.getChatBody('update_module_status', { module: 'whatsapp', enabled })
    });
  }

  async submitAffiliatePayoutRequest(data: any) { 
    return apiClient('', {
        method: 'POST',
        body: this.getChatBody('create_payout_request', data)
    });
  }

  async updatePaymentConfig(config: PaymentConfiguration): Promise<{ success: boolean }> { 
    return apiClient('', {
        method: 'POST',
        body: this.getChatBody('update_affiliate_config', config)
    });
  }
  
  async requestWithdrawal(data: any): Promise<{ success: boolean; transactionId: string; }> { 
    return apiClient('', {
        method: 'POST',
        body: this.getChatBody('process_withdrawal', data)
    });
  }

  // =================================================================
  // READ OPERATIONS WITH MAPPING
  // =================================================================

  // --- Client Read Operations ---

  async getClientDashboard(): Promise<ClientDashboardData> {
      const { organization } = useAuthStore.getState();
      if (!organization) throw new Error("No organization in session");

      // 1. Read Raw Data
      const [orgs, subscriptions, usage] = await Promise.all([
          this.readSheet<RawOrganization>('organizations'),
          this.readSheet<RawSubscription>('subscriptions'),
          this.readSheet<RawUsage>('usage_tracking')
      ]);

      const orgData = orgs.find(o => o.id === organization.id);
      if (!orgData) throw new Error("Organization not found in DB");

      // 2. Parse and Map
      
      // Parse modules_config if it's a JSON string
      let modulesConfig = orgData.modules_config;
      if (typeof modulesConfig === 'string') {
          try { modulesConfig = JSON.parse(modulesConfig); } catch (e) {}
      }

      // Find active subscription
      const subData = subscriptions.find(s => s.org_id === organization.id && s.status === 'active') || 
                      subscriptions.find(s => s.org_id === organization.id);

      // Calculate usage
      const orgUsage = usage.filter(u => u.org_id === organization.id);
      const currentUsage = { whatsapp_messages: 0, call_minutes: 0, avatar_queries: 0, predict_cases: 0 };

      orgUsage.forEach(u => {
          const qty = Number(u.quantity) || 0;
          if (u.module === 'whatsapp') currentUsage.whatsapp_messages += qty;
          if (u.module === 'calls') currentUsage.call_minutes += qty;
          if (u.module === 'avatar') currentUsage.avatar_queries += qty;
          if (u.module === 'predict') currentUsage.predict_cases += qty;
      });

      // 3. Return App Interface
      return {
          organization: {
              id: orgData.id,
              name: orgData.name,
              plan: orgData.plan || 'Lite',
              status: orgData.status || 'active',
              modules_config: (modulesConfig as any) || {},
              current_usage: currentUsage,
              trial_ends_at: orgData.trial_ends_at || null,
              next_billing_date: orgData.next_billing_date || new Date().toISOString()
          } as any,
          subscription: {
              id: subData?.id || 'none',
              plan_id: subData?.plan_id || 'none',
              status: subData?.status || 'none',
              // MAPPING: price_usd -> price
              price_usd: Number(subData?.price_usd) || 0,
              price_ars: Number(subData?.price_ars) || 0,
              next_billing_date: subData?.next_billing_date || new Date().toISOString(),
              auto_renew: subData?.auto_renew === true || subData?.auto_renew === 'true'
          }
      };
  }

  async getClientUsageHistory(orgId: string, period: string): Promise<UsageHistoryResponse> {
      const usage = await this.readSheet<RawUsage>('usage_tracking');
      const filtered = usage.filter(u => u.org_id === orgId);
      
      const aggregated = filtered.map(u => ({
          date: u.created_at,
          whatsapp_messages: u.module === 'whatsapp' ? Number(u.quantity) : 0,
          call_minutes: u.module === 'calls' ? Number(u.quantity) : 0,
          avatar_queries: u.module === 'avatar' ? Number(u.quantity) : 0
      }));

      return { data: aggregated };
  }

  async getClientRecentActivity(orgId: string, limit: number): Promise<{ data: ActivityEvent[] }> {
      const usage = await this.readSheet<RawUsage>('usage_tracking');
      // Map RawUsage to ActivityEvent
      const mapped: ActivityEvent[] = usage
        .filter(u => u.org_id === orgId)
        .map(u => ({
            id: u.id,
            event_type: u.event_type || 'usage_log',
            module: u.module,
            quantity: Number(u.quantity),
            created_at: u.created_at,
            metadata: {}
        }))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, limit);
        
      return { data: mapped };
  }

  async getClientPayments(orgId: string): Promise<Invoice[]> {
      const payments = await this.readSheet<RawPayment>('payments');
      return payments
        .filter(p => p.org_id === orgId)
        .map(p => ({
            id: p.id,
            org_id: p.org_id,
            date: p.created_at || new Date().toISOString(), // Map created_at to date
            period: 'Mensual',
            amount: Number(p.amount_usd) || 0, // Map amount_usd to amount
            status: (p.status === 'approved' || p.status === 'paid') ? 'paid' : 'failed',
            pdfUrl: '#'
        }));
  }

  async getSubscription(): Promise<Subscription | null> { 
    const { organization } = useAuthStore.getState();
    if (!organization) return null;
    
    const subs = await this.readSheet<RawSubscription>('subscriptions');
    const rawSub = subs.find(s => s.org_id === organization.id && s.status === 'active');
    
    if (!rawSub) return null;

    // Map RawSubscription to App Subscription
    return {
        id: rawSub.id,
        org_id: rawSub.org_id,
        plan_id: rawSub.plan_id,
        status: rawSub.status,
        price: Number(rawSub.price_usd) || 0, // MAPPING: price_usd -> price
        currency: 'USD',
        current_period_end: rawSub.next_billing_date || new Date().toISOString(), // MAPPING: next_billing_date -> current_period_end
        modules: [] 
    };
  }

  async getWhatsappMetrics() { 
    const { organization } = useAuthStore.getState();
    if (!organization) return null;
    
    const usage = await this.readSheet<RawUsage>('usage_tracking');
    const whatsappUsage = usage.filter(u => u.org_id === organization.id && u.module === 'whatsapp');
    const totalMessages = whatsappUsage.reduce((sum, u) => sum + (Number(u.quantity) || 0), 0);

    return {
        enabled: true,
        number: organization.phone || 'N/A',
        hoy: {
            mensajes_enviados: Math.floor(totalMessages * 0.01),
            mensajes_recibidos: Math.floor(totalMessages * 0.015),
            conversaciones: Math.floor(totalMessages * 0.002),
            ultima_actividad: new Date().toISOString()
        },
        mes: {
            mensajes_totales: totalMessages
        }
    };
  }

  // --- Affiliate Read Operations ---

  async getAffiliateDashboard(): Promise<AffiliateDashboardData> {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error("User not found");

      const [affiliates, conversions] = await Promise.all([
          this.readSheet<RawAffiliate>('affiliates'),
          this.readSheet<RawAffiliateConversion>('affiliate_conversions')
      ]);

      const myProfile = affiliates.find(a => a.id === user.id || a.user_email === user.email || a.email === user.email);
      
      // Fallback
      const safeProfile = {
          id: user.id,
          name: myProfile?.nombre || myProfile?.name || user.firstName,
          affiliate_code: myProfile?.affiliate_code || 'PENDING',
          balance_usd: Number(myProfile?.balance_usd) || 0,
          balance_ars: Number(myProfile?.balance_ars) || 0,
          total_referrals: Number(myProfile?.total_referrals) || 0,
          active_referrals: Number(myProfile?.active_referrals) || 0,
          tier: myProfile?.tier || 'Bronze'
      };

      const myConversions = conversions.filter(c => c.affiliate_id === safeProfile.id);
      
      const thisMonth = new Date().getMonth();
      const conversionsThisMonth = myConversions.filter(c => c.conversion_date && new Date(c.conversion_date).getMonth() === thisMonth);
      
      const firstMonthCommissions = conversionsThisMonth.reduce((sum, c) => sum + (c.plan_type === 'primer_mes' ? Number(c.monthly_commission_usd) : 0), 0);
      const recurringCommissions = myConversions.reduce((sum, c) => sum + (c.plan_type === 'recurrente' ? Number(c.monthly_commission_usd) : 0), 0);

      return {
          affiliate: safeProfile,
          thisMonthEarnings: {
              first_month_commissions: firstMonthCommissions,
              recurring_commissions: recurringCommissions,
              total: firstMonthCommissions + recurringCommissions
          },
          conversionRate: {
              clicks: 100, // Mock
              conversions: myConversions.length,
              rate: myConversions.length / 100
          }
      };
  }

  async getAffiliateRevenue(affiliateId: string, period: string): Promise<RevenueHistoryResponse> {
      // --- REAL DATA FROM WALLET TRANSACTIONS ---
      
      // 1. Fetch transaction history
      const transactions = await this.readSheet<RawTransaction>('wallet_transactions');
      
      // 2. Filter for this affiliate AND type 'earning' (ingresos)
      const earnings = transactions.filter(t => 
          t.affiliate_id === affiliateId && 
          t.type === 'earning'
      );

      // 3. Group by Month (YYYY-MM)
      const monthlyData: Record<string, { first_month: number; recurring: number; total: number }> = {};

      earnings.forEach(tx => {
          if (!tx.created_at) return;
          
          // Format: YYYY-MM
          const date = new Date(tx.created_at);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          if (!monthlyData[monthKey]) {
              monthlyData[monthKey] = { first_month: 0, recurring: 0, total: 0 };
          }

          const amount = Number(tx.amount_usd) || 0;
          const description = (tx.description || '').toLowerCase();

          // Determine type based on description keyword
          if (description.includes('recurrente')) {
              monthlyData[monthKey].recurring += amount;
          } else {
              // Default to first_month / CPA if not specified as recurring
              monthlyData[monthKey].first_month += amount;
          }
          monthlyData[monthKey].total += amount;
      });

      // 4. Transform to Array and Sort chronologically
      const data = Object.keys(monthlyData).sort().map(monthKey => ({
          month: monthKey, // e.g. "2025-11"
          first_month: monthlyData[monthKey].first_month,
          recurring: monthlyData[monthKey].recurring,
          total: monthlyData[monthKey].total
      }));

      // Return empty array structure if no data found to avoid chart crash
      if (data.length === 0) {
          return { data: [] };
      }

      return { data };
  }

  async getAffiliateReferrals(affiliateId: string): Promise<{ data: ReferralData[] }> {
      const conversions = await this.readSheet<RawAffiliateConversion>('affiliate_conversions');
      const orgs = await this.readSheet<RawOrganization>('organizations');
      
      const myConversions = conversions.filter(c => c.affiliate_id === affiliateId);
      
      const referrals: ReferralData[] = myConversions.map(c => {
          const org = orgs.find(o => o.id === c.org_id);
          return {
              org_id: c.org_id,
              org_name: org ? org.name : 'Unknown Org',
              plan_id: c.plan_id,
              status: (c.status as any) || 'active',
              monthly_commission_usd: Number(c.monthly_commission_usd) || 0,
              total_commission_paid: Number(c.total_commission_paid) || 0,
              conversion_date: c.conversion_date || c.created_at || new Date().toISOString(),
              plan_type: (c.plan_type as 'primer_mes' | 'recurrente') || 'recurrente'
          };
      });

      return { data: referrals };
  }

  async getWallet(): Promise<Wallet> {
    const { user } = useAuthStore.getState();
    const affiliates = await this.readSheet<RawAffiliate>('affiliates');
    const myProfile = affiliates.find(a => a.id === user?.id || a.user_email === user?.email || a.email === user?.email);
    
    return {
        affiliate_id: user?.id || '',
        balance_usd: Number(myProfile?.balance_usd) || 0,
        balance_ars: Number(myProfile?.balance_ars) || 0,
        exchange_rate: 1200, 
        total_referrals: Number(myProfile?.total_referrals) || 0,
        total_earned_usd: 0, 
        total_payouts: 0 
    };
  }
  
  async getTransactions(): Promise<Transaction[]> { 
    const { user } = useAuthStore.getState();
    const txs = await this.readSheet<RawTransaction>('wallet_transactions');
    return txs.filter(t => t.affiliate_id === user?.id).map(t => ({
        id: t.id,
        affiliate_id: t.affiliate_id,
        type: t.type as any,
        amount_usd: Number(t.amount_usd) || 0,
        amount_ars: Number(t.amount_ars) || 0,
        status: t.status as any,
        description: t.description || '',
        created_at: t.created_at
    }));
  }
  
  async getPaymentConfig(): Promise<PaymentConfiguration> {
    const { user } = useAuthStore.getState();
    return {
        affiliate_id: user?.id || '',
        cuit: '',
        business_name: '',
        address: '',
        mp_email: '',
        mp_alias: '',
        mp_verified: false
    };
  }

  // --- Admin Read Operations (Frontend Aggregation) ---

  async getAdminOverview(): Promise<AdminOverviewData> {
      const [orgs, subs, payments, affiliates, events] = await Promise.all([
          this.readSheet<RawOrganization>('organizations'),
          this.readSheet<RawSubscription>('subscriptions'),
          this.readSheet<RawPayment>('payments'),
          this.readSheet<RawAffiliate>('affiliates'),
          this.readSheet<any>('system_events'),
      ]);

      const activeOrgs = orgs.filter(o => o.status === 'active' || o.subscription_status === 'active').length;
      const trialOrgs = orgs.filter(o => o.status === 'trialing' || o.subscription_status === 'trialing').length;
      const activeSubs = subs.filter(s => s.status === 'active');
      
      // MAPPING: price_usd -> MRR
      const mrr = activeSubs.reduce((sum, s) => sum + (Number(s.price_usd) || 0), 0);
      
      // MAPPING: balance_usd -> Pending Commissions
      const pendingCommissions = affiliates.reduce((sum, a) => sum + (Number(a.balance_usd) || 0), 0);
      const activeAffiliates = affiliates.filter(a => a.estado === 'active' || a.status === 'active').length;

      const planCounts: Record<string, number> = {};
      orgs.forEach(o => {
          const plan = o.plan || 'Unknown';
          planCounts[plan] = (planCounts[plan] || 0) + 1;
      });
      const planDistribution = Object.entries(planCounts).map(([plan, count]) => ({
          plan,
          count,
          percentage: (count / orgs.length) * 100
      }));

      const topAffiliates = affiliates
          .sort((a, b) => (Number(b.balance_usd) || 0) - (Number(a.balance_usd) || 0))
          .slice(0, 5)
          .map(a => ({
              id: a.id,
              name: a.nombre || a.name || 'Unnamed',
              active_referrals: Number(a.active_referrals) || 0,
              balance_usd: Number(a.balance_usd) || 0
          }));

      const criticalAlerts = events
          .filter(e => e.severity === 'critical' || e.severity === 'error')
          .map(e => ({
              id: e.id,
              event_type: e.event_type,
              severity: e.severity,
              message: e.message,
              created_at: e.created_at
          }));

      return {
          metrics: {
              total_organizations: orgs.length,
              active_organizations: activeOrgs,
              trialing_organizations: trialOrgs,
              mrr_usd: mrr,
              total_users: 0, 
              active_users: 0,
              total_affiliates: affiliates.length,
              active_affiliates: activeAffiliates,
              pending_commissions_usd: pendingCommissions,
              churn_rate: 0 
          },
          plan_distribution: planDistribution,
          top_affiliates: topAffiliates,
          critical_alerts: criticalAlerts
      };
  }

  async getAdminMRRHistory(period: string): Promise<MRRHistoryResponse> {
      return { 
          data: [
              { month: '2025-11', mrr: 2032, new_mrr: 100, churned_mrr: 0, expansion_mrr: 0 }
          ] 
      };
  }

  async getClients(): Promise<ClientData[]> { 
    const orgs = await this.readSheet<RawOrganization>('organizations');
    const subs = await this.readSheet<RawSubscription>('subscriptions');

    return orgs.map(o => {
        const sub = subs.find(s => s.org_id === o.id);
        return {
            id: o.id,
            empresa: o.name,
            contacto: o.email,
            plan: (o.plan as any) || 'Lite',
            // MAPPING: price_usd -> mrr
            mrr: Number(sub?.price_usd) || 0,
            estado: (o.status as any) || (o.subscription_status as any) || 'active',
            consumoWhatsApp: { value: 0, limit: 1000 }, 
            consumoLlamadas: { value: 0, limit: 1000 },
            healthScore: 100,
            fechaInicio: o.created_at || new Date().toISOString(),
            // Ensure ultimoPago.fecha has a valid fallback date
            ultimoPago: { fecha: new Date().toISOString(), estado: 'paid' }
        };
    });
  }

  async getAdminOrganizations(): Promise<any> {
    return this.getClients();
  }

  async getAffiliates(): Promise<Affiliate[]> {
    const rawAffiliates = await this.readSheet<RawAffiliate>('affiliates');
    return rawAffiliates.map(a => ({
        id: a.id,
        user_email: a.user_email || a.email || '',
        nombre: a.nombre || a.name || '',
        estado: (a.estado || a.status || 'pending') as AffiliateStatus,
        tasa_primer_mes: Number(a.tasa_primer_mes) || 0,
        tasa_recurrente: Number(a.tasa_recurrente) || 0,
        cookie_days: 30,
        wallet_credito: 0,
        metodo_pago: 'transferencia' as PaymentMethodType,
        fecha_alta: a.created_at || new Date().toISOString(),
        referrals: { 
            active: Number(a.active_referrals) || 0, 
            total: Number(a.total_referrals) || 0 
        },
        revenue: { current_month: 0, lifetime: 0 }, 
        commission: { 
            pending: Number(a.balance_usd) || 0, 
            paid: 0, 
            total: 0 
        },
        conversion_rate: 0,
        avatarUrl: `https://ui-avatars.com/api/?name=${a.nombre || 'User'}&background=random`
    }));
  }

  async getAdminAffiliates(): Promise<any> {
    return this.getAffiliates();
  }

  async getSystemEvents(severity: string): Promise<any> {
    const events = await this.readSheet<any>('system_events');
    if (severity) {
        return events.filter(e => e.severity === severity);
    }
    return events;
  }

  // --- Fallbacks ---
  async getActiveModules() { return { modules: [] }; }
  async getPayments(): Promise<Invoice[]> { 
    const { organization } = useAuthStore.getState();
    if (!organization) return [];
    return this.getClientPayments(organization.id);
  }
}

export default new NexumAPI();
