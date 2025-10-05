
import React from 'react';
import AddOnCard from './AddOnCard';
import { FEATURE_FLAGS, ModuleConfig } from '../../config/featureFlags';
import { PRICING_PLANS } from '../../constants';

interface AddOnsSectionProps {
  userPlanId: string;
}

const AddOnsSection: React.FC<AddOnsSectionProps> = ({ userPlanId }) => {
  const currentPlan = PRICING_PLANS.find(p => p.id === userPlanId);
  const availableModules = Object.values(FEATURE_FLAGS);

  if (!currentPlan) {
    return null; // Or show a loading/error state
  }

  return (
    <div className="mt-12" id="addons">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold theme-text-primary mb-2">
          🧩 Potencia tu Estudio con Módulos Adicionales
        </h2>
        <p className="theme-text-secondary max-w-2xl mx-auto">
          Agrega funcionalidades específicas o únete a la lista de espera para nuestros próximos lanzamientos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableModules.map(module => (
          <AddOnCard
            key={module.id} 
            module={module}
            isIncluded={currentPlan.requiredModules?.includes(module.id) || false}
          />
        ))}
      </div>
    </div>
  );
};

export default AddOnsSection;