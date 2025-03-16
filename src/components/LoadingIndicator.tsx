import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  className?: string;
}

const LoadingIndicator = ({ 
  size = 'medium', 
  message, 
  className 
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <Loader2 className={cn(
        'animate-spin text-primary', 
        sizeClasses[size]
      )} />
      
      {message && (
        <p className={cn(
          'mt-3 text-muted-foreground text-center',
          size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm'
        )}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingIndicator;