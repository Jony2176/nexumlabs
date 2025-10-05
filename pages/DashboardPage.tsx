

import React from 'react';
import DashboardBasico from '../components/dashboard/DashboardBasico';
import DashboardPremium from '../components/dashboard/DashboardPremium';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useFeatureFlags } from '../providers/FeatureFlagProvider';
import { useModules } from '../hooks/useModules';

const DashboardPage: React.FC = () => {
  const { isAvailable } = useFeatureFlags();
  const { mergedModules, isLoading: modulesLoading } = useModules();

  const isPremiumLaunched = isAvailable('dashboard_premium');
  
  // This mock will always be false for the demo user, as per the mock API.
  // In a real scenario, this would reflect the user's actual subscription add-on.
  const hasAddon = !!mergedModules.find(m => m.id === 'dashboard_premium' && m.isActive);

  const hasPremium = isPremiumLaunched && hasAddon;

  if (modulesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (hasPremium) {
    return <DashboardPremium />;
  }
  
  return <DashboardBasico />;
};

export default DashboardPage;