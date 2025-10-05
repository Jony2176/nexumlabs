
import React from 'react';
import { BadgeType, BadgeAnimation } from '../../config/featureFlags';
import { cn } from '../../utils/cn';

interface FeatureBadgeProps {
  status: BadgeType;
  text?: string;
  animation?: BadgeAnimation;
  className?: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ status, text, animation = 'none', className }) => {
  const baseClasses = 'px-2 py-0.5 text-[10px] rounded-full font-bold leading-none';

  const styles: { [key in BadgeType]: string } = {
    new: 'bg-green-500 text-white',
    beta: 'bg-blue-500 text-white',
    coming_soon: 'bg-yellow-500 text-black',
    sale: 'bg-red-500 text-white',
  };

  const animations: { [key in BadgeAnimation]: string } = {
    pulse: 'animate-pulse-badge',
    glow: 'animate-glow-badge',
    shimmer: 'animate-shimmer-badge',
    none: '',
  };

  return (
    <span
      className={cn(baseClasses, styles[status], animations[animation], className)}
      aria-label={`Estado: ${text || status}`}
    >
      {text || status.replace('_', ' ').toUpperCase()}
    </span>
  );
};

export default FeatureBadge;