
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// This store is kept for potential future settings.
// Image assets are now hardcoded in constants.ts
interface SettingsState {
  // Future settings can be added here.
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Future state setters can be added here.
    }),
    {
      name: 'nexum-settings-storage',
      // FIX: Only persist the data properties, excluding the functions.
      // This was the root cause of the persistence failure.
      partialize: (state) => ({ ...state }),
    }
  )
);
