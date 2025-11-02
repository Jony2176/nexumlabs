

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ReferralSystem from '../../components/waitlist/ReferralSystem';
import { ArrowLeft } from 'lucide-react';
import PremiumBackground from '../../components/ui/PremiumBackground';
import Logo from '../../components/ui/Logo';

const WaitlistConfirmationPage: React.FC = () => {
    const location = useLocation();
    const { productName, position, referralLink } = location.state || { 
        productName: 'Dashboard Premium', 
        position: 234, 
        referralLink: 'https://nexum.ai/w/JK4X9' 
    };

    return (
        <div className="min-h-screen theme-bg-primary flex flex-col items-center justify-center p-4 relative">
            <PremiumBackground />
            <div className="absolute top-6 left-6 z-10">
                <Link to="/app/modules">
                    <Logo className="w-[var(--logo-base-width,150px)] h-auto" />
                </Link>
            </div>
            <div className="relative z-10 w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold theme-text-primary">
                        ¡Felicitaciones! Estás en la lista de espera para <span className="text-primary">{productName}</span>
                    </h1>
                </div>
                <ReferralSystem position={position} referralLink={referralLink} />
                <div className="text-center mt-8">
                    <Link to="/app/modules" className="text-sm theme-accent hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={16} /> Volver a los módulos
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WaitlistConfirmationPage;