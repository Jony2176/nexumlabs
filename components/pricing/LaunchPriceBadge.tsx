
import React from 'react';

interface LaunchPriceBadgeProps {
  discount: number;
  size?: 'sm' | 'md' | 'lg';
}

const LaunchPriceBadge: React.FC<LaunchPriceBadgeProps> = ({ discount, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return (
    <span className={`bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full ${sizeClasses[size]}`}>
      ⚡ {discount}% OFF
    </span>
  );
};

export default LaunchPriceBadge;
