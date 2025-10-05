import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexum-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    default: "btn-primary-premium",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "btn-secondary-premium",
    secondary: "bg-gray-100 text-text-primary hover:bg-gray-200 dark:bg-gray-800 dark:text-text-primary dark:hover:bg-gray-700",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800/50",
    link: "text-nexum-primary underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    default: "h-11 px-6",
    sm: "h-9 rounded-md px-3",
    lg: "h-12 rounded-lg px-8 text-base",
    icon: "h-10 w-10",
  };
  
  const finalClassName = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (asChild) {
    const child = React.Children.only(props.children);
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        ...props,
        className: cn(finalClassName, (child.props as any).className),
      });
    }
  }

  return (
    <button
      className={finalClassName}
      {...props}
    />
  );
};

export default Button;