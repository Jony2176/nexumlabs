
import mockApi from './mockApi';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

// --- CONFIGURATION ---
// Change to false when n8n backend is ready
export const USE_MOCK = true;
// -------------------

class NexumAPI {
  public useMock: boolean;
  private baseURL: string;

  constructor() {
    this.useMock = USE_MOCK;
    this.baseURL = process.env.API_BASE_URL || 'https://n8n-n8n.2jdegc.easypanel.host/webhook';
    
    if (this.useMock) {
      console.warn('🔧 MODO MOCK ACTIVADO - Usando datos simulados. Para desactivar, edita services/api.ts');
    }
  }

  private getHeaders(): HeadersInit {
      const headers: HeadersInit = {
          'Content-Type': 'application/json',
      };
      const token = useAuthStore.getState().token;
      if (token) {
          headers['Authorization'] = `Bearer ${token}`;
      }
      return headers;
  }

  private async handleResponse(response: Response) {
      if (!response.ok) {
          if (response.status === 401) {
              useAuthStore.getState().logout();
              window.location.hash = '/login';
              toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
          }
          const errorData = await response.json().catch(() => ({ message: 'Error en la respuesta del servidor' }));
          throw new Error(errorData.message || 'Ocurrió un error inesperado');
      }
      return response.json();
  }
  
  // FIX: Changed visibility of performRequest to public to allow usage in other service files like walletApi.ts.
  public async performRequest(endpoint: string, options: RequestInit) {
      try {
          const response = await fetch(`${this.baseURL}${endpoint}`, options);
          return this.handleResponse(response);
      } catch (error) {
          // Network error or other issue
          console.error(`Error de red para ${endpoint}:`, error);
          toast.error('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
          throw error;
      }
  }

  async register(data: any) {
    if (this.useMock) {
      return mockApi.register(data);
    }
    return this.performRequest('/api/auth/register', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    if (this.useMock) {
      return mockApi.login(email, password);
    }
    return this.performRequest('/api/auth/login', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password }),
    });
  }

  async getActiveModules() {
    if (this.useMock) {
      return mockApi.getActiveModules();
    }
    return this.performRequest('/api/modules/active', {
        method: 'GET',
        headers: this.getHeaders(),
    });
  }

  // Example for a future method
  async getDashboardMetrics() {
    if (this.useMock) {
      return mockApi.getDashboardMetrics();
    }
    return this.performRequest('/api/dashboard/metrics', {
        method: 'GET',
        headers: this.getHeaders(),
    });
  }

  // FIX: Added getSubscription method to handle fetching subscription data.
  async getSubscription() {
    if (this.useMock) {
      return mockApi.getSubscription();
    }
    return this.performRequest('/api/subscription', {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  // FIX: Added getWhatsappMetrics and toggleWhatsappStatus methods to the API service.
  async getWhatsappMetrics() {
    if (this.useMock) {
      return mockApi.getWhatsappMetrics();
    }
    return this.performRequest('/api/whatsapp/metrics', {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async toggleWhatsappStatus(enabled: boolean) {
    if (this.useMock) {
      return mockApi.toggleWhatsappStatus(enabled);
    }
    return this.performRequest('/api/whatsapp/toggle', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ enabled }),
    });
  }

  async submitAffiliatePayoutRequest(data: any) {
    if (this.useMock) {
      return mockApi.submitAffiliatePayoutRequest(data);
    }
    return this.performRequest('/api/affiliate/request-payout', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
    });
  }
  
}

export default new NexumAPI();
