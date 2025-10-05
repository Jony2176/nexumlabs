
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, MessageSquare, Phone, LayoutDashboard, User, BrainCircuit, Puzzle } from 'lucide-react';
import { MergedModule } from '../../hooks/useModules';

interface ModuleCardPremiumProps {
  module: MergedModule;
  onAction: () => void;
  index?: number;
}

const MotionDiv = motion.div;

const moduleConfig: any = {
    elias_whatsapp: {
      icon: MessageSquare,
      gradient: 'from-blue-600 to-cyan-600',
    },
    elias_llamadas: {
      icon: Phone,
      gradient: 'from-purple-600 to-pink-600',
    },
    dashboard_premium: {
      icon: LayoutDashboard,
      gradient: 'from-emerald-600 to-teal-600',
    },
    elias_avatar_partner: {
      icon: User,
      gradient: 'from-orange-600 to-red-600',
    },
    jurispredict_ai: {
      icon: BrainCircuit,
      gradient: 'from-indigo-600 to-purple-600',
      badge: 'ENTERPRISE'
    }
}

const ModuleCardPremium: React.FC<ModuleCardPremiumProps> = ({ module, onAction, index = 0 }) => {
    const config = moduleConfig[module.id] || { icon: Puzzle, gradient: 'from-gray-600 to-gray-700' };
    const Icon = config.icon;
    const isActive = module.isActive;

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative h-full flex flex-col"
        >
            {/* Glow effect on hover */}
            <div className={`
                absolute inset-0 bg-gradient-to-r ${config.gradient} 
                rounded-2xl opacity-0 group-hover:opacity-20 blur-xl 
                transition-opacity duration-500
            `} />
            
            {/* Card principal */}
            <div className={`
                relative bg-bg-secondary/50 dark:bg-nexum-surface/50 backdrop-blur-xl 
                border ${isActive ? 'border-primary/30' : 'border-border-color'}
                hover:border-primary/50 rounded-2xl p-6
                transition-all duration-300
                ${!isActive && 'opacity-60'}
                flex-grow flex flex-col
            `}>
                {config.badge && (
                    <div className="absolute -top-2 -right-2">
                        <span className="px-2 py-1 text-[10px] font-bold bg-gradient-to-r from-nexum-gradient-start to-nexum-gradient-end text-white rounded-full shadow-lg">
                            {config.badge}
                        </span>
                    </div>
                )}

                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} bg-opacity-10 backdrop-blur-sm`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium
                        ${isActive 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                        }
                    `}>
                        {isActive ? (module.isTrial ? 'Trial' : 'Activo') : 'Inactivo'}
                    </div>
                </div>

                <div className="flex-grow">
                    <h3 className="text-lg font-medium text-text-primary mb-1">{module.title}</h3>
                    <p className="text-sm text-text-secondary">{module.description}</p>
                </div>
                
                <button
                    onClick={onAction}
                    className={`
                        mt-6 w-full py-2.5 rounded-lg font-medium text-sm
                        transition-all duration-300 group
                        ${isActive 
                            ? 'bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20' 
                            : 'bg-border-color/30 dark:bg-nexum-border/30 text-text-secondary cursor-pointer hover:bg-border-color/50 dark:hover:bg-nexum-border/50'
                        }
                    `}>
                    <span className="flex items-center justify-center gap-2">
                        {isActive ? (
                            <>
                                Acceder
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        ) : (
                            <>
                                <Lock className="w-4 h-4" />
                                Activar Ahora
                            </>
                        )}
                    </span>
                </button>
            </div>
        </MotionDiv>
    );
};

export default ModuleCardPremium;