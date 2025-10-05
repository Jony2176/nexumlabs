import React from 'react';

const PremiumCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-gradient-to-br from-gray-800 to-gray-900
      rounded-xl p-6
      border border-gray-700
      hover:border-blue-500/50
      transition-all duration-300
      hover:shadow-2xl hover:shadow-blue-500/20
      group
      ${className}
    `}>
      {/* Efecto de brillo al hover */}
      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-transparent via-white/5 to-transparent
        -translate-x-full group-hover:translate-x-full
        transition-all duration-1000
      " />
      
      {children}
    </div>
  );
};

export default PremiumCard;
