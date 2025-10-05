import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass';
}

const Card: React.FC<CardProps> = ({ className, variant = 'default', ...props }) => {
  const baseClass = variant === 'glass' ? 'glass-card' : 'card-premium';
  return (
    <div
      className={cn(baseClass, className)}
      {...props}
    />
  );
};

export default Card;