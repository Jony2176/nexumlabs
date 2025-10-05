
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Organization } from '../types';

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