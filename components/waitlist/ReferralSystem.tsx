import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Linkedin, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';
import { Progress } from '../ui/Progress';
// FIX: Imported the 'Button' component to resolve 'Cannot find name' errors.
import Button from '../ui/Button';

interface ReferralSystemProps {
  position: number;
  referralLink: string;
}

const rewards = [
  { referrals: 3, label: "Sube 50 lugares", unlocked: false },
  { referrals: 5, label: "Acceso garantizado día 1", unlocked: false },
  { referrals: 10, label: "1 mes GRATIS extra", unlocked: false }
];

const ReferralSystem: React.FC<ReferralSystemProps> = ({ position, referralLink }) => {
    const [referralCount, setReferralCount] = useState(0); // Mock state
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        toast.success('¡Enlace copiado!');
        setTimeout(() => setCopied(false), 2000);
    };
    
    const progressPercentage = Math.min((referralCount / 10) * 100, 100);

    const shareOnLinkedIn = () => {
        const text = `¡Me acabo de unir a la lista de espera para la nueva plataforma de NEXUM! Parece que va a cambiar las reglas del juego para los estudios jurídicos. Únete tú también:`;
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}&summary=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };
    
    const shareOnWhatsApp = () => {
        const text = `¡Me acabo de unir a la lista de espera para la nueva plataforma de NEXUM! Parece que va a cambiar las reglas del juego para los estudios jurídicos. Únete tú también: ${referralLink}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto theme-bg-card border theme-border rounded-xl shadow-lg p-6 md:p-8"
        >
            <h2 className="text-2xl font-bold theme-text-primary text-center">¡Estás en la lista! Eres el <span className="text-primary">#{position}</span></h2>
            <p className="theme-text-secondary text-center mt-2 mb-6">🎯 Mejora tu posición refiriendo a tus colegas:</p>

            <div className="space-y-4 mb-6">
                {rewards.map((reward, i) => {
                    const isUnlocked = referralCount >= reward.referrals;
                    return (
                        <div key={i} className={cn("flex items-center p-3 rounded-lg transition-all", isUnlocked ? "bg-green-500/10 text-green-400" : "theme-bg-secondary")}>
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center mr-3 border-2", isUnlocked ? "bg-green-500 border-green-500 text-white" : "border-gray-500")}>
                                {isUnlocked ? <Check size={16} /> : <span className="text-xs font-bold">{i + 1}</span>}
                            </div>
                            <span className="font-semibold">{reward.label}</span>
                            <span className="ml-auto text-sm theme-text-muted">{reward.referrals} Referidos</span>
                        </div>
                    );
                })}
            </div>
            
            <div className="mb-6">
                 <Progress value={progressPercentage} />
                 <p className="text-sm theme-text-secondary text-center mt-2">{referralCount} de 10 referidos para el premio máximo.</p>
            </div>


            <div>
                <label className="block text-sm font-medium theme-text-primary mb-2">Tu enlace único:</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        readOnly
                        value={referralLink}
                        className="flex-grow"
                    />
                    <Button onClick={handleCopy} size="icon" variant={copied ? "default" : "secondary"}>
                        {copied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
            
             <div className="mt-6">
                <p className="text-sm font-medium text-center theme-text-secondary mb-2">O comparte directamente:</p>
                <div className="flex justify-center gap-4">
                     <Button variant="outline" onClick={shareOnLinkedIn}>
                        <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                    </Button>
                     <Button variant="outline" onClick={shareOnWhatsApp}>
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.803 6.123l-1.218 4.439 4.555-1.19z"/></svg>
                        WhatsApp
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ReferralSystem;