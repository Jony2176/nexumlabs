// FIX: Imported 'React' to resolve 'Cannot find name' error.
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { MODULES } from '../constants';
import { Bot } from 'lucide-react';

// Represents the structure of the data coming from the API
interface ApiModuleStatus {
  id: string;
  active: boolean;
  trial: boolean;
}

// Represents the final merged module data used in the UI
export interface MergedModule {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  ssoLink: string;
  isActive: boolean;
  isTrial: boolean;
}


export const useModules = () => {
  const [mergedModules, setMergedModules] = useState<MergedModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.getActiveModules();
        // FIX: Handle different response structures from the API for modules.
        const apiModules: ApiModuleStatus[] = Array.isArray(response) ? response : response.modules || [];

        // Merge static data with API data
        const enhancedModules = MODULES.map(staticModule => {
          const apiStatus = apiModules.find(apiModule => apiModule.id === staticModule.id);
          return {
            ...staticModule,
            isActive: apiStatus?.active || false,
            isTrial: apiStatus?.trial || false,
          };
        });

        setMergedModules(enhancedModules);

      } catch (err: any) {
        setError('Failed to fetch modules.');
        console.error(err);
        // Fallback to static modules with inactive state on error
        setMergedModules(MODULES.map(m => ({ ...m, isActive: false, isTrial: false })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  return { mergedModules, isLoading, error };
};
