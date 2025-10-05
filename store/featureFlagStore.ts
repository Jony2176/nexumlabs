
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FEATURE_FLAGS, FeatureFlagConfig } from '../config/featureFlags';

interface FeatureFlagState {
  flags: FeatureFlagConfig;
  setFlags: (flags: FeatureFlagConfig) => void;
  resetFlags: () => void;
}

export const useFeatureFlagStore = create<FeatureFlagState>()(
  persist(
    (set) => ({
      flags: FEATURE_FLAGS, // Estado inicial por defecto
      setFlags: (newFlags) => set({ flags: newFlags }),
      resetFlags: () => set({ flags: FEATURE_FLAGS }),
    }),
    {
      name: 'nexum-feature-flags-storage', // Nombre para el almacenamiento local
      // FIX: Added partialize to only persist the 'flags' data, excluding non-serializable functions.
      // This ensures that changes made in the admin panel are correctly saved and rehydrated.
      partialize: (state) => ({ flags: state.flags }),
    }
  )
);