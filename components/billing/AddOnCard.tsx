
import React from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ModuleConfig } from '../../config/featureFlags';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import FeatureBadge from '../features/FeatureBadge';

interface AddOnCardProps {
    module: ModuleConfig;
    isIncluded: boolean;
}

const AddOnCard: React.FC<AddOnCardProps> = ({ module, isIncluded }) => {
    const { getStatus } = useFeatureFlags();
    const status = getStatus(module.id);

    const handleAction = () => {
        if (status === 'waitlist') {
            const email = prompt(`Ingresa tu email para unirte a la lista de espera para ${module.name}:`);
            if (email) {
                toast.success(`¡Gracias! Te hemos añadido a la lista de espera para ${module.name}.`);
            }
        } else if (isIncluded) {
            toast.success('Este módulo ya está incluido en tu plan actual.');
        } else {
            // In a real app, this would navigate to the change plan page
            // with the add-on pre-selected.
            toast.success(`Para agregar ${module.name}, por favor cambia a un plan superior.`);
        }
    };

    if (status === 'hidden' || status === 'secret') {
        return null;
    }

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className={`
                relative rounded-xl p-6 h-full flex flex-col
                bg-gradient-to-b from-gray-800 to-gray-900
                border ${status === 'waitlist' ? 'border-purple-500/50' : 'border-gray-700'}
                transition-all duration-300
                ${isIncluded ? 'opacity-70' : ''}
            `}
        >
            {module.badge && (
                <div className="absolute -top-3 left-4">
                   <FeatureBadge status={module.badge.type} text={module.badge.text} animation={module.badge.animation}/>
                </div>
            )}
            
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{module.name}</h3>
                <p className="text-gray-400 text-sm mb-4">
                    {status === 'waitlist' ? module.waitlist?.promoText : 'Disponible en planes superiores.'}
                </p>
                
                {isIncluded && (
                    <div className="bg-green-900/30 border border-green-500/50 rounded-lg px-3 py-2 my-4">
                        <p className="text-green-400 text-sm font-semibold text-center">
                        ✓ Incluido en tu plan actual
                        </p>
                    </div>
                )}
            </div>

            <button
                onClick={handleAction}
                className={`
                    w-full py-2.5 px-4 rounded-lg font-semibold transition-all mt-4
                    ${status === 'waitlist'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : isIncluded
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                `}
                disabled={isIncluded}
            >
                {status === 'waitlist' 
                    ? '🔔 Unirse a Lista de Espera'
                    : isIncluded
                    ? '✓ Ya incluido'
                    : '✨ Mejorar Plan'
                }
            </button>
        </motion.div>
    );
};

export default AddOnCard;