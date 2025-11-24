import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

const badgeVariants: { [key: string]: string } = {
    default: 'border-transparent bg-blue-600 text-blue-50 hover:bg-blue-600/80',
    secondary: 'border-transparent bg-gray-200 text-gray-800 hover:bg-gray-200/80 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700/80',
    destructive: 'border-transparent bg-red-500 text-white hover:bg-red-500/80',
    outline: 'text-text-primary border-border-color',
    success: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    warning: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
};

const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
  return <div className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', badgeVariants[variant], className)} {...props} />;
};

export default Badge;
