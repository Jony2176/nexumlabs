
import React from 'react';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import { ModuleId } from '../../config/featureFlags';
import WaitlistCard from './WaitlistCard';

interface ModuleVisibilityProps {
  moduleId: ModuleId;
  children: React.ReactNode;
}

const ModuleVisibility: React.FC<ModuleVisibilityProps> = ({ moduleId, children }) => {
  const { getStatus, getModuleConfig } = useFeatureFlags();
  const status = getStatus(moduleId);
  const moduleConfig = getModuleConfig(moduleId);

  switch (status) {
    case 'available':
      return <>{children}</>;
    
    case 'waitlist':
      if (moduleConfig) {
        return <WaitlistCard moduleConfig={moduleConfig} />;
      }
      return null;
      
    case 'hidden':
    case 'secret':
    default:
      return null;
  }
};

export default ModuleVisibility;