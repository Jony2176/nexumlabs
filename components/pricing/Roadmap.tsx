
import React from 'react';
import { FEATURE_FLAGS } from '../../config/featureFlags';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import { formatLaunchDate } from '../../utils/featureFlags';
import { Rocket } from 'lucide-react';
import FeatureBadge from '../features/FeatureBadge';
import { motion } from 'framer-motion';

const Roadmap: React.FC = () => {
    const { getStatus } = useFeatureFlags();

    const upcomingModules = Object.values(FEATURE_FLAGS)
        .map(mod => ({ ...mod, status: getStatus(mod.id) }))
        .filter(mod => mod.status === 'waitlist' || mod.status === 'hidden')
        .sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime());

    if (upcomingModules.length === 0) {
        return null;
    }

    return (
        <div className="my-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold theme-text-primary mb-2">
                    🚀 Roadmap de Productos 2026
                </h2>
                <p className="theme-text-secondary max-w-2xl mx-auto">
                    Estamos construyendo el futuro de la legal tech. Esto es lo que viene. Sé de los primeros en acceder.
                </p>
            </div>
            
            <div className="relative max-w-3xl mx-auto">
                {/* Timeline */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 w-0.5 h-full bg-border-color"></div>

                {upcomingModules.map((module, index) => (
                    <motion.div 
                        key={module.id} 
                        className="relative mb-12 pl-12 md:pl-0"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 md:w-1/2">
                                <div className={`p-4 rounded-lg border theme-border shadow-md ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8 md:text-right'}`}>
                                    <p className="font-bold theme-text-primary">{module.name}</p>
                                    <p className="text-sm theme-text-secondary">{module.waitlist?.promoText}</p>
                                    {module.badge && (
                                        <div className={`mt-2 ${index % 2 !== 0 ? 'md:justify-end' : ''} flex`}>
                                            <FeatureBadge status={module.badge.type} text={module.badge.text} animation={module.badge.animation} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-1/2 md:w-auto md:flex-1">
                                 <p className={`font-semibold text-primary ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>{formatLaunchDate(module.launchDate)}</p>
                            </div>
                        </div>

                        {/* Dot */}
                        <div className="absolute left-4 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full theme-bg-secondary border-2 theme-border flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Roadmap;