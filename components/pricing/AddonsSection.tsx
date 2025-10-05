import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import { FEATURE_FLAGS } from '../../config/featureFlags';
import { useDualPrice } from '../../hooks/useDualPrice';
import { LayoutDashboard, BrainCircuit, User, Clock } from 'lucide-react';
import Button from '../ui/Button';

const iconMap: { [key: string]: React.ElementType } = {
    dashboard_premium: LayoutDashboard,
    jurispredict_ai: BrainCircuit,
    elias_avatar_partner: User,
};

const AddonCard: React.FC<{ module: any, currency: 'USD' | 'ARS' }> = ({ module, currency }) => {
    const navigate = useNavigate();
    const { priceInfo, isLoading } = useDualPrice(module.waitlist?.price || 0);
    const Icon = iconMap[module.id] || LayoutDashboard;

    const waitlistCounters: { [key: string]: string } = {
        'dashboard_premium': '234 personas en lista de espera',
        'jurispredict_ai': '73/100 lugares ocupados',
        'elias_avatar_partner': 'Registra tu interés ahora'
    };

    return (
        <motion.div whileHover={{ y: -5 }} className="card-premium p-6 flex flex-col h-full text-center relative">
            {module.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                        <Clock size={12} /> {module.badge.text}
                    </span>
                </div>
            )}
            <div className="pt-4">
                <Icon className="w-10 h-10 text-nexum-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-text-primary">{module.name}</h3>
                <p className="text-sm text-text-secondary mt-1 mb-4 flex-grow">
                    {module.waitlist?.promoText}
                </p>
                {priceInfo && module.waitlist?.price && (
                    <div className="my-2">
                        <p className="text-2xl font-bold text-text-primary">
                            {currency === 'USD' ? `$${module.waitlist.price} USD` : `~${priceInfo.formattedARS}`}
                            <span className="text-sm font-normal">/mes</span>
                        </p>
                    </div>
                )}
                <Button onClick={() => navigate('/app/modules')} variant="outline" className="w-full mt-auto">
                    {module.id === 'jurispredict_ai' ? 'Solicitar Acceso Beta' : 'Unirse a Lista de Espera'}
                </Button>
                <p className="text-xs text-text-muted mt-2">{waitlistCounters[module.id]}</p>
            </div>
        </motion.div>
    )
}

const AddonsSection: React.FC<{ currency: 'USD' | 'ARS' }> = ({ currency }) => {
    const { getStatus } = useFeatureFlags();
    
    const addons = [
        FEATURE_FLAGS['dashboard_premium'],
        FEATURE_FLAGS['jurispredict_ai'],
        FEATURE_FLAGS['elias_avatar_partner']
    ].filter(addon => getStatus(addon.id) !== 'available');

    if (addons.length === 0) return null;

    return (
        <section className="py-20 theme-bg-card border-y theme-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-text-primary mb-2">🚀 Potencia tu Estudio con Add-ons Premium</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Sé de los primeros en acceder a nuestras herramientas más avanzadas y obtén una ventaja competitiva.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {addons.map(addon => (
                       <AddonCard key={addon.id} module={addon} currency={currency} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AddonsSection;