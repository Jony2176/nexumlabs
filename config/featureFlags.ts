

export type ModuleId = 'elias_whatsapp' | 'elias_llamadas' | 'dashboard_premium' | 'jurispredict_ai' | 'elias_avatar_partner' | string;

export type ModuleStatus = 'available' | 'waitlist' | 'hidden' | 'secret';

export type BadgeType = 'new' | 'beta' | 'coming_soon' | 'sale';
export type BadgeAnimation = 'pulse' | 'glow' | 'shimmer' | 'none';

export interface WaitlistConfig {
  enabled: boolean;
  promoText: string;
  earlyBirdDiscount: number;
  initialCount: number;
  price?: number;
}

export interface ModuleConfig {
  id: ModuleId;
  name: string;
  status: ModuleStatus; // Default status if dates don't apply
  launchDate: string; // ISO Date string for when the module goes live
  revealDate?: string; // Optional: ISO Date string for when to switch from 'hidden' to 'waitlist'
  badge?: {
    type: BadgeType;
    text: string;
    animation?: BadgeAnimation;
  };
  waitlist?: WaitlistConfig;
}

export interface FeatureFlagConfig {
  [key: string]: ModuleConfig;
}

// ===================================================================================
// CENTRAL FEATURE FLAG CONFIGURATION
// This is the single source of truth for the entire platform's module availability.
// ===================================================================================
export const FEATURE_FLAGS: FeatureFlagConfig = {
  'elias_whatsapp': {
    id: 'elias_whatsapp',
    name: 'ELIAS WhatsApp Bot',
    status: 'available',
    launchDate: '2024-10-01T00:00:00Z',
  },
  'elias_llamadas': {
    id: 'elias_llamadas',
    name: 'ELIAS Llamadas IA',
    status: 'available',
    launchDate: '2024-10-01T00:00:00Z',
  },
  'dashboard_premium': {
    id: 'dashboard_premium',
    name: 'Dashboard Premium',
    status: 'waitlist',
    launchDate: '2026-01-01T03:00:00Z', 
    badge: {
      type: 'coming_soon',
      text: 'ENERO 2026',
      animation: 'pulse',
    },
    waitlist: {
      enabled: true,
      promoText: 'Analytics avanzados que aumentan tu conversión hasta un 40%.',
      earlyBirdDiscount: 50,
      initialCount: 342,
      price: 199,
    },
  },
  'jurispredict_ai': {
    id: 'jurispredict_ai',
    name: 'JurisPredict AI',
    status: 'hidden', 
    revealDate: '2026-02-01T00:00:00Z', 
    launchDate: '2026-03-15T00:00:00Z',
    badge: {
      type: 'coming_soon',
      text: 'MARZO 2026',
      animation: 'glow',
    },
    waitlist: {
      enabled: true,
      promoText: 'Predice el resultado de tus casos con 87% de precisión. Únete a la revolución.',
      earlyBirdDiscount: 50,
      initialCount: 73,
    },
  },
  'elias_avatar_partner': {
    id: 'elias_avatar_partner',
    name: 'Avatar Partner',
    status: 'secret', 
    launchDate: '2026-06-01T00:00:00Z',
    waitlist: {
        enabled: false,
        promoText: '',
        earlyBirdDiscount: 0,
        initialCount: 0,
    }
  }
};
