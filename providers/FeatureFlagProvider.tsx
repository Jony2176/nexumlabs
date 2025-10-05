import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ModuleConfig, ModuleId, ModuleStatus } from '../config/featureFlags';
import * as FlagUtils from '../utils/featureFlags';
import { useFeatureFlagStore } from '../store/featureFlagStore';

interface FeatureFlagsContextValue {
  flags: { [key: string]: ModuleConfig };
  isAvailable: (moduleId: ModuleId) => boolean;
  getStatus: (moduleId: ModuleId) => ModuleStatus;
  getModuleConfig: (moduleId: ModuleId) => ModuleConfig | undefined;
  getDaysUntilLaunch: (moduleId: ModuleId) => number | null;
}

const FeatureFlagContext = createContext<FeatureFlagsContextValue | undefined>(undefined);

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};

export const FeatureFlagProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { flags } = useFeatureFlagStore(); // Lee los flags desde el store de Zustand
  const [currentDate, setCurrentDate] = useState(FlagUtils.getCurrentDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(FlagUtils.getCurrentDate());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  const getStatus = (moduleId: ModuleId): ModuleStatus => {
    const module = flags[moduleId]; // Usa los flags del store
    if (!module) return 'available';
    return FlagUtils.getModuleStatus(module, currentDate);
  };

  const isAvailable = (moduleId: ModuleId): boolean => {
    return getStatus(moduleId) === 'available';
  };

  const getModuleConfig = (moduleId: ModuleId): ModuleConfig | undefined => {
      return flags[moduleId]; // Usa los flags del store
  }
  
  const getDaysUntilLaunch = (moduleId: ModuleId): number | null => {
      const module = flags[moduleId];
      if (!module) return null;
      return FlagUtils.getDaysUntilLaunch(module, currentDate);
  }

  const value = { 
      flags, 
      isAvailable, 
      getStatus,
      getModuleConfig,
      getDaysUntilLaunch
  };

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
