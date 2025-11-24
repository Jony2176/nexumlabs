import * as React from 'react';
import { cn } from '../../utils/cn';

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'destructive' | 'warning' | 'info' | 'success' }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
      variant === 'destructive'
        ? 'border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500'
        : variant === 'warning'
        ? 'border-yellow-500/50 text-yellow-800 dark:text-yellow-300 dark:border-yellow-500 [&>svg]:text-yellow-500'
        : variant === 'info'
        ? 'border-blue-500/50 text-blue-800 dark:text-blue-300 dark:border-blue-500 [&>svg]:text-blue-500'
        : 'border-border-color text-text-primary',
      className
    )}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
