import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Organization, ClientData, Affiliate, PromoCode } from '../types';

interface AuthData {
  user: User;
  organization: Organization;
  token: string;
  refreshToken?: string; // refreshToken is optional
}

interface AuthState {
  user: User | null;
  organization: Organization | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (data: AuthData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (data) =>
        set({
          user: data.user,
          organization: data.organization,
          token: data.token,
          refreshToken: data.refreshToken || null,
          isAuthenticated: true,
        }),
      logout: () => {
        set({ user: null, organization: null, token: null, refreshToken: null, isAuthenticated: false });
        // Clear other persisted stores on logout
        useClientStore.persist.clearStorage();
        useAffiliateStore.persist.clearStorage();
        usePlatformConfigStore.persist.clearStorage();
      },
    }),
    {
      name: 'nexum-auth-storage', // Updated unique name
      // FIX: Only persist the data properties, excluding functions.
      partialize: (state) => ({
        user: state.user,
        organization: state.organization,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// --- Client Management Store ---
interface ClientState {
  clients: ClientData[];
  setClients: (clients: ClientData[]) => void;
  addClient: (client: ClientData) => void;
  updateClient: (client: ClientData) => void;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      clients: [], // Initialize with empty array
      setClients: (clients) => set({ clients }),
      addClient: (client) =>
        set((state) => ({
          clients: [client, ...state.clients],
        })),
      updateClient: (client) =>
        set((state) => ({
          clients: state.clients.map(c => c.id === client.id ? client : c),
        })),
    }),
    {
      name: 'nexum-clients-storage',
    }
  )
);

// --- Affiliate Management Store ---
interface ProgramConfig {
    firstMonthCommission: number;
    recurringCommission: number;
    cookieDuration: number;
}

interface AffiliateState {
  affiliates: Affiliate[];
  setAffiliates: (affiliates: Affiliate[]) => void;
  programConfig: ProgramConfig;
  addAffiliate: (affiliate: Affiliate) => void;
  updateProgramConfig: (config: ProgramConfig) => void;
}

const initialConfig: ProgramConfig = {
    firstMonthCommission: 25,
    recurringCommission: 10,
    cookieDuration: 30,
};

export const useAffiliateStore = create<AffiliateState>()(
  persist(
    (set) => ({
      affiliates: [], // Initialize with empty array
      setAffiliates: (affiliates) => set({ affiliates }),
      programConfig: initialConfig,
      addAffiliate: (affiliate) =>
        set((state) => ({
          affiliates: [affiliate, ...state.affiliates],
        })),
      updateProgramConfig: (config) =>
        set({ programConfig: config }),
    }),
    {
      name: 'nexum-affiliates-storage',
    }
  )
);

// --- Platform Global Config Store ---
interface PlatformPlan {
    id: string;
    name: string;
    monthlyPrice: number;
    annualPrice: number;
    active: boolean;
}
interface ModuleSettings {
    id: string,
    active: boolean;
    launchDate: string;
    liteMessageLimit: number;
    extraMessageCost: number;
}
interface IntegrationSettings {
    id: 'mercadopago';
    publicKey: string;
    accessToken: string;
    productionMode: boolean;
}

interface PlatformConfigState {
    plans: PlatformPlan[];
    promoCodes: PromoCode[];
    moduleSettings: Record<string, ModuleSettings>;
    integrations: Record<string, IntegrationSettings>;
    updatePlans: (plans: PlatformPlan[]) => void;
    addPromoCode: (codeData: Omit<PromoCode, 'id' | 'usageCount' | 'createdAt'>) => void;
    updatePromoCode: (codeId: string, updates: Partial<PromoCode>) => void;
    deletePromoCode: (codeId: string) => void;
    updateModuleSettings: (settings: Record<string, ModuleSettings>) => void;
    updateIntegrations: (settings: Record<string, IntegrationSettings>) => void;
}

export const usePlatformConfigStore = create<PlatformConfigState>()(
    persist(
        (set) => ({
            plans: [
                { id: 'lite', name: 'ELIAS Lite', monthlyPrice: 79, annualPrice: 632, active: true },
                { id: 'pro', name: 'ELIAS Pro', monthlyPrice: 199, annualPrice: 1592, active: true },
            ],
            promoCodes: [
                { id: 'promo_1', code: 'NEXUM25', discountType: 'percentage', discountValue: 25, status: 'active', usageCount: 12, usageLimit: 100, createdAt: new Date('2025-09-01').toISOString() },
                { id: 'promo_2', code: 'BIENVENIDA50', discountType: 'fixed', discountValue: 50, status: 'inactive', usageCount: 5, createdAt: new Date('2025-08-15').toISOString() },
            ],
            moduleSettings: {
                'elias_whatsapp': {
                    id: 'elias_whatsapp',
                    active: true,
                    launchDate: '2025-10-01',
                    liteMessageLimit: 500,
                    extraMessageCost: 0.02
                }
            },
            integrations: {
                'mercadopago': {
                    id: 'mercadopago',
                    publicKey: 'TEST-xxxx-xxxx-xxxx',
                    accessToken: 'supersecrettoken',
                    productionMode: true,
                }
            },
            updatePlans: (plans) => set({ plans }),
            addPromoCode: (codeData) => set((state) => ({
                promoCodes: [
                    { ...codeData, id: `promo_${Date.now()}`, usageCount: 0, createdAt: new Date().toISOString() },
                    ...state.promoCodes
                ]
            })),
            updatePromoCode: (codeId, updates) => set((state) => ({
                promoCodes: state.promoCodes.map(c => c.id === codeId ? { ...c, ...updates } : c)
            })),
            deletePromoCode: (codeId) => set((state) => ({
                promoCodes: state.promoCodes.filter(c => c.id !== codeId)
            })),
            updateModuleSettings: (settings) => set({ moduleSettings: settings }),
            updateIntegrations: (settings) => set({ integrations: settings }),
        }),
        {
            name: 'nexum-platform-config-storage',
        }
    )
);