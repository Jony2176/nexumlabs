import React from 'react';

const PremiumBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden theme-bg-primary">
            {/* Base grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] dark:opacity-[1]" />
            
            {/* Orbes de luz difusa - only for dark mode for better aesthetics */}
            <div className="hidden dark:block">
                <div className="absolute top-0 left-0 w-96 h-96 bg-nexum-primary/10 rounded-full filter blur-[150px] animate-pulse-slow" style={{ animationDelay: '0s' }}/>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-nexum-secondary/10 rounded-full filter blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}/>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-nexum-accent/5 rounded-full filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
            </div>
        </div>
    );
}

export default PremiumBackground;