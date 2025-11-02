
import mockApi from './mockApi';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { fetchSheetData } from './googleSheetApi';
import { ClientData, Wallet, PaymentConfiguration, Transaction, Affiliate } from '../types';
import { mockClients } from '../data/adminClientsMockData';
import { MOCK_AFFILIATES } from '../data/affiliateMockData';

// --- CONFIGURATION ---
// Se desactiva el modo MOCK para apuntar al backend de n8n.
export const USE_MOCK = false;
// -------------------

class NexumAPI {
  public useMock: boolean;
  private baseURL: string;

  constructor() {
    this.useMock = USE_MOCK;
    // Se actualiza la URL base para apuntar al nuevo endpoint de n8n.
    this.baseURL = process.env.API_BASE_URL || 'https://n8n-n8n.2jdegc.easypanel.host/webhook/nexum/api';
    
    if (this.useMock) {
      console.warn('🔧 MODO MOCK ACTIVADO - Usando datos simulados. Para desactivar, edita services/api.ts');
    } else {
      console.log('🚀 MODO REAL ACTIVADO - Conectando a servicios en vivo (n8n y Google Sheets).');
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
  
  /**
   * Construye un payload estandarizado para enviar al webhook de n8n.
   * @param action - El nombre de la acción a ejecutar (ej. 'user_login').
   * @param payload - Los datos específicos para esa acción.
   * @returns Un objeto estructurado para la comunicación con el backend.
   */
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
          // Si el servidor devuelve un error (4xx, 5xx)
          if (response.status === 401) {
              useAuthStore.getState().logout();
              window.location.hash = '/login';
              toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
          }

          // Read the error response as text first to avoid "body already used" errors.
          const errorBody = await response.text();
          let errorMessage = 'Ocurrió un error inesperado';

          // Try to parse the text as JSON to get a more specific message.
          if (errorBody) {
              try {
                  const errorJson = JSON.parse(errorBody);
                  errorMessage = errorJson.error?.message || errorJson.message || (typeof errorJson.error === 'string' && errorJson.error) || 'El servidor devolvió un error.';
              } catch (e) {
                  // If it's not JSON, use the raw text, but limit its length.
                  errorMessage = errorBody.substring(0, 200);
              }
          } else {
              errorMessage = `Error del servidor: ${response.status} ${response.statusText}`;
          }

          throw new Error(errorMessage);
      }

      // Si la respuesta es exitosa (2xx)
      const text = await response.text();
      if (!text) {
        // La respuesta está vacía, lo cual es válido para algunas operaciones.
        return { success: true, data: null };
      }

      const processJson = (json: any): any => {
        // Handle n8n's common array wrapper by recursively processing the first element.
        if (Array.isArray(json) && json.length > 0) {
            return processJson(json[0]);
        }
        // Comprobar si la respuesta tiene la estructura del AI Orchestrator
        if (typeof json.success === 'boolean' && 'data' in json) {
            if (json.success) {
                // Éxito: Devolvemos solo el contenido de 'data' para que el resto de la app funcione sin cambios.
                return json.data;
            } else {
                // Fracaso controlado por el orquestador: lanzamos el error que nos envía.
                throw new Error(json.error || 'El backend reportó un error.');
            }
        }
        // Si no tiene la estructura, devolvemos el JSON tal cual por compatibilidad.
        return json;
      };

      try {
        const json = JSON.parse(text);
        return processJson(json);
      } catch (error) {
        console.warn("Initial JSON parse failed. Attempting to extract and clean response text.", text);

        // This strategy finds the first opening bracket/brace and the last closing one,
        // assuming the JSON content is contiguous. This is more robust against
        // prefix/suffix text than a greedy regex.
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
            const extractedJson = JSON.parse(jsonString);
            return processJson(extractedJson);
        } catch (parseError) {
             console.error("Failed to parse the extracted JSON string:", parseError, jsonString);
             throw new Error("El servidor envió una respuesta con un formato inválido.");
        }
      }
  }
  
  // FIX: Changed visibility of performRequest to public to allow usage in other service files like walletApi.ts.
  public async performRequest(endpoint: string, options: RequestInit) {
      try {
          // Se ajusta la ruta para que sea compatible con la nueva URL base de n8n.
          // Para el patrón de comando, el endpoint principal es la URL base.
          const path = endpoint.startsWith('/api') ? endpoint.substring(4) : endpoint;
          const fullUrl = this.baseURL + (path ? `/${path}` : '');
          const response = await fetch(fullUrl, options);
          return this.handleResponse(response);
      } catch (error) {
          // Errores de red, CORS, o errores lanzados desde handleResponse
          console.error(`Error en la solicitud para ${endpoint}:`, error);
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
          }
          throw error;
      }
  }

  async register(data: any) {
    if (this.useMock) {
      return mockApi.register(data);
    }
    const body = this.buildActionPayload('create_organization_and_owner', data);
    return this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
    });
  }

  async login(email: string, password: string) {
    if (this.useMock) {
      return mockApi.login(email, password);
    }
    const body = this.buildActionPayload('user_login', { email, password });
    const loginEndpoint = 'https://n8n-n8n.2jdegc.easypanel.host/webhook/authnexum2176';

    try {
        const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        return this.handleResponse(response);
    } catch (error) {
        console.error(`Error en la solicitud de login:`, error);
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error('No se pudo conectar con el servidor. Revisa tu conexión a internet.');
        }
        throw error;
    }
  }

  async getActiveModules() {
    if (this.useMock) {
      return mockApi.getActiveModules();
    }
    // FIX: Standardized to use the POST command pattern required by the n8n webhook.
    const body = this.buildActionPayload('get_active_modules', {});
    return this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
    });
  }

  async getClients(): Promise<ClientData[]> {
    if (this.useMock) {
      return new Promise(resolve => setTimeout(() => resolve(mockClients), 500));
    }
    try {
      const body = this.buildActionPayload('admin_get_dashboard', {});
      const dashboardData: any = await this.performRequest('', {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(body),
      });

      const rawClients: any[] = dashboardData?.clients || [];

      // Keep formatting logic to ensure data consistency
      const formattedClients: ClientData[] = rawClients.map(raw => ({
        id: raw.id,
        empresa: raw.empresa,
        contacto: raw.contacto,
        plan: raw.plan,
        mrr: Number(raw.mrr) || 0,
        estado: raw.estado,
        consumoWhatsApp: { value: Number(raw.consumowhatsapp_value) || 0, limit: Number(raw.consumowhatsapp_limit) || 1000 },
        consumoLlamadas: { value: Number(raw.consumollamadas_value) || 0, limit: Number(raw.consumollamadas_limit) || 300 },
        healthScore: Number(raw.healthscore) || 50,
        fechaInicio: raw.fechainicio,
        ultimoPago: { fecha: raw.ultimopago_fecha, estado: raw.ultimopago_estado || 'pending' },
        logoUrl: raw.logourl,
        cuit: raw.cuit,
        direccion: raw.direccion,
      }));
      return formattedClients;
    } catch (error) {
      toast.error('Error al cargar clientes. Mostrando datos de respaldo.');
      return mockClients; // fallback
    }
  }

  // Example for a future method
  async getDashboardMetrics() {
    if (this.useMock) {
      return mockApi.getDashboardMetrics();
    }
    // FIX: Standardized to use the POST command pattern.
    const body = this.buildActionPayload('get_dashboard_metrics', {});
    return this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
    });
  }

  // FIX: Added getSubscription method to handle fetching subscription data.
  async getSubscription() {
    if (this.useMock) {
      return mockApi.getSubscription();
    }
    // FIX: Standardized to use the POST command pattern.
    const body = this.buildActionPayload('get_subscription', {});
    return this.performRequest('', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
  }

  // FIX: Added getWhatsappMetrics and toggleWhatsappStatus methods to the API service.
  async getWhatsappMetrics() {
    if (this.useMock) {
      return mockApi.getWhatsappMetrics();
    }
    const body = this.buildActionPayload('get_whatsapp_metrics', {});
    return this.performRequest('', { // All actions go to the main webhook
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
  }

  async toggleWhatsappStatus(enabled: boolean) {
    if (this.useMock) {
      return mockApi.toggleWhatsappStatus(enabled);
    }
    const body = this.buildActionPayload('toggle_whatsapp_status', { enabled });
    return this.performRequest('', { // All actions go to the main webhook
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
    return this.performRequest('', { // All actions go to the main webhook
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
    });
  }
  
  async getAffiliates(filters: any = {}): Promise<Affiliate[]> {
    if (this.useMock) {
      return new Promise(resolve => setTimeout(() => resolve(MOCK_AFFILIATES), 500));
    }
    try {
      const body = this.buildActionPayload('admin_list_affiliates', { filters });
      const rawData: any[] = await this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      const affiliates: Affiliate[] = rawData.map(raw => ({
        id: raw.id,
        user_email: raw.user_email,
        nombre: raw.nombre,
        estado: raw.estado,
        tasa_primer_mes: Number(raw.tasa_primer_mes) || 0,
        tasa_recurrente: Number(raw.tasa_recurrente) || 0,
        cookie_days: Number(raw.cookie_days) || 30,
        codigo_cupon: raw.codigo_cupon,
        wallet_credito: Number(raw.wallet_credito) || 0,
        metodo_pago: raw.metodo_pago,
        cbu_cvu: raw.cbu_cvu,
        fecha_alta: raw.fecha_alta,
        fecha_aprobacion: raw.fecha_aprobacion,
        referrals: {
          active: Number(raw.referrals_active) || 0,
          total: Number(raw.referrals_total) || 0
        },
        revenue: {
          current_month: Number(raw.revenue_current_month) || 0,
          lifetime: Number(raw.revenue_lifetime) || 0
        },
        commission: {
          pending: Number(raw.commission_pending) || 0,
          paid: Number(raw.commission_paid) || 0,
          total: Number(raw.commission_total) || 0
        },
        conversion_rate: Number(raw.conversion_rate) || 0,
        last_referral_date: raw.last_referral_date,
        avatarUrl: raw.avatarurl || `https://i.pravatar.cc/150?u=${raw.id}`,
      }));
      return affiliates;
    } catch (error) {
      toast.error('Error al cargar afiliados. Mostrando datos de respaldo.');
      return MOCK_AFFILIATES; // fallback
    }
  }


  // --- CONSOLIDATED WALLET API METHODS ---

  async getWallet(): Promise<Wallet> {
    if(this.useMock) {
        // The mock user ID for affiliate is hardcoded here as per previous logic
        return mockApi.getWallet('usr_affiliate_1');
    }
    const body = this.buildActionPayload('get_wallet', {});
    return this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
    });
  }

  async getTransactions(filter: string = 'all'): Promise<Transaction[]> {
     if(this.useMock) {
        return mockApi.getTransactions('usr_affiliate_1', filter);
    }
    const body = this.buildActionPayload('get_transactions', { filter });
    return this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
    });
  }

  async getPaymentConfig(): Promise<PaymentConfiguration> {
     if(this.useMock) {
        return mockApi.getPaymentConfig('usr_affiliate_1');
    }
    const body = this.buildActionPayload('get_payment_config', {});
    return this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
    });
  }

  async updatePaymentConfig(config: PaymentConfiguration): Promise<{ success: boolean }> {
     if(this.useMock) {
        return mockApi.updatePaymentConfig('usr_affiliate_1', config);
    }
    const body = this.buildActionPayload('update_payment_config', { config });
    return this.performRequest('', {
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
    return this.performRequest('', {
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
    return this.performRequest('', {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
    });
  }
  
}

export default new NexumAPI();
