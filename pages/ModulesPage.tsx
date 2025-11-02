import React from 'react';
import { useModules, MergedModule } from '../hooks/useModules';
import ModuleCardPremium from '../components/dashboard/ModuleCardPremium';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import ModuleVisibility from '../components/features/ModuleVisibility';
import WaitlistCard from '../components/features/WaitlistCard';
import { useFeatureFlags } from '../providers/FeatureFlagProvider';
import { ModuleConfig } from '../config/featureFlags';

const ModulesPage: React.FC = () => {
    const { mergedModules, isLoading } = useModules();
    const navigate = useNavigate();
    const { flags } = useFeatureFlags();

    const handleModuleAction = (module: MergedModule) => {
        if (!module.isActive) {
          navigate('/app/subscription/change-plan');
          return;
        }
        
        switch(module.id) {
            case 'elias_whatsapp':
                navigate('/app/whatsapp');
                break;
            case 'elias_llamadas':
                navigate('/app/calls');
                break;
            case 'dashboard_premium':
                 // When active, it will navigate to the main dashboard
                navigate('/app/panel-control');
                break;
            default:
                // For modules like JurisPredict or AvatarPartner that don't have a dedicated page yet
                navigate('/app/modules');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <LoadingSpinner />
            </div>
        );
    }
    
    const allConfiguredModules = Object.values(flags);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-primary">Módulos Disponibles</h1>
                <p className="text-text-secondary mt-1">
                    Gestiona tus módulos activos o explora nuevas herramientas para potenciar tu estudio.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mergedModules.map((module, index) => (
                    <ModuleVisibility key={module.id} moduleId={module.id}>
                        <ModuleCardPremium
                            module={module}
                            onAction={() => handleModuleAction(module)}
                            index={index}
                        />
                    </ModuleVisibility>
                ))}
                
                {allConfiguredModules
                    .filter((mod: ModuleConfig) => !mergedModules.some(m => m.id === mod.id))
                    .map((mod: ModuleConfig, index) => (
                        <ModuleVisibility key={mod.id} moduleId={mod.id}>
                           {/* This part handles modules that are in feature flags but not yet in the user's active/inactive list from the API */}
                           <WaitlistCard moduleConfig={mod} />
                        </ModuleVisibility>
                ))}

            </div>
        </div>
    );
};

export default ModulesPage;