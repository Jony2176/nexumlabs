import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { ModuleConfig } from '../../config/featureFlags';
import { useFeatureFlags } from '../../providers/FeatureFlagProvider';
import { formatLaunchDate } from '../../utils/featureFlags';
import { useNavigate } from 'react-router-dom';
import { useDualPrice } from '../../hooks/useDualPrice';

interface WaitlistCardProps {
  moduleConfig: ModuleConfig;
}

const MotionDiv = motion.div;

const WaitlistCard: React.FC<WaitlistCardProps> = ({ moduleConfig }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getDaysUntilLaunch } = useFeatureFlags();
  const navigate = useNavigate();
  const { priceInfo } = useDualPrice(moduleConfig.waitlist?.price || 0);

  const daysLeft = getDaysUntilLaunch(moduleConfig.id);
  const fakeWaitlistCount = (moduleConfig.waitlist?.initialCount || 100) + (email.length % 10);
  
  const isDashboardPremium = moduleConfig.id === 'dashboard_premium';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor, ingresa un email válido.');
      return;
    }
    setIsSubmitting(true);
    
    // Mock API call to n8n webhook
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('¡Te hemos añadido a la lista!');
    
    navigate('/app/waitlist-confirmation', { 
      state: { 
        productName: moduleConfig.name,
        // These would come from the API in a real app
        position: fakeWaitlistCount + 1,
        referralLink: `https://nexum.ai/w/${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      } 
    });
  };
  
  return (
    <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -4 }}
        className="group relative h-full flex flex-col"
    >
        <div className={`absolute inset-0 bg-gradient-to-r ${isDashboardPremium ? 'from-yellow-500 to-orange-500' : 'from-purple-600 to-indigo-600'} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
        <div className={`relative bg-bg-secondary/50 dark:bg-nexum-surface/50 backdrop-blur-xl border ${isDashboardPremium ? 'border-yellow-500/30' : 'border-purple-500/30'} rounded-2xl p-6 flex-grow flex flex-col`}>
            <div className="flex-grow">
                 <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-medium text-text-primary mb-1">{moduleConfig.name}</h3>
                        <span className="text-xs font-bold uppercase text-yellow-400">{isDashboardPremium ? 'ADD-ON' : ''}</span>
                    </div>
                    {moduleConfig.badge && (
                        <span className="px-2 py-1 text-[10px] font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-full shadow-lg animate-pulse">
                            {moduleConfig.badge.text}
                        </span>
                    )}
                 </div>
                 <p className="text-sm text-text-secondary my-4">
                    {moduleConfig.waitlist?.promoText || `Próximamente en NEXUM Platform.`}
                 </p>

                 {priceInfo && moduleConfig.waitlist?.price && (
                    <div className="my-4">
                        <p className="text-2xl font-bold text-text-primary">{priceInfo.formattedUSD}<span className="text-sm font-normal text-gray-400">/mes adicional</span></p>
                        <p className="text-sm text-gray-400">≈ {priceInfo.formattedARS}</p>
                    </div>
                 )}
                 
                 {moduleConfig.waitlist?.earlyBirdDiscount && (
                    <div className="text-xs p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 text-purple-300 mb-4">
                        <strong>🎁 Early Bird:</strong> {moduleConfig.waitlist?.earlyBirdDiscount}% OFF los primeros 3 meses.
                    </div>
                 )}
                 <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span>Lanzamiento: <strong>{formatLaunchDate(moduleConfig.launchDate)}</strong> ({daysLeft} días)</span>
                 </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-auto">
                <div className="flex gap-2">
                    <input
                        type="email"
                        placeholder="tu.email@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow w-full px-3 py-2 text-sm"
                        required
                    />
                    <button type="submit" disabled={isSubmitting} className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50">
                        {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <ArrowRight className="w-5 h-5"/>}
                    </button>
                </div>
                <p className="text-xs text-text-muted mt-2 text-center">
                    Únete a {fakeWaitlistCount}+ profesionales en la lista de espera.
                </p>
            </form>
        </div>
    </MotionDiv>
  );
};

export default WaitlistCard;