
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
  logoSize: number;
  setLogoSize: (size: number) => void;
  globalLogoUrl: string | null;
  setGlobalLogoUrl: (url: string | null) => void;
  globalLogoSize: number;
  setGlobalLogoSize: (size: number) => void;
  useRetinaLogo: boolean;
  setUseRetinaLogo: (use: boolean) => void;
  retinaLogoUrl: string | null;
  setRetinaLogoUrl: (url: string | null) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      logoUrl: null,
      setLogoUrl: (url) => set({ logoUrl: url }),
      logoSize: 60,
      setLogoSize: (size) => set({ logoSize: size }),
      globalLogoUrl: null,
      setGlobalLogoUrl: (url) => set({ globalLogoUrl: url }),
      globalLogoSize: 150,
      setGlobalLogoSize: (size) => set({ globalLogoSize: size }),
      useRetinaLogo: false,
      setUseRetinaLogo: (use) => set({ useRetinaLogo: use }),
      retinaLogoUrl: null,
      setRetinaLogoUrl: (url) => set({ retinaLogoUrl: url }),
    }),
    {
      name: 'nexum-settings-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        logoUrl: state.logoUrl,
        logoSize: state.logoSize,
        globalLogoUrl: state.globalLogoUrl,
        globalLogoSize: state.globalLogoSize,
        useRetinaLogo: state.useRetinaLogo,
        retinaLogoUrl: state.retinaLogoUrl,
      }),
    }
  )
);