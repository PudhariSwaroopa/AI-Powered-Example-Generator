
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  className?: string;
}

const LoadingIndicator = ({ 
  size = 'medium', 
  message = 'Crafting a simple example...',
  className 
}: LoadingIndicatorProps) => {
  const dimensions = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className="relative">
        <div className={cn(
          'rounded-full border-2 border-t-primary/80 border-r-primary/30 border-b-primary/10 border-l-primary/60',
          dimensions[size],
          'animate-spin'
        )} />
        <div className={cn(
          'absolute top-0 left-0 right-0 bottom-0',
          'rounded-full border-2 border-t-transparent border-r-primary/10 border-b-primary/30 border-l-transparent',
          dimensions[size],
          'animate-spin delay-150'
        )} 
        style={{ animationDirection: 'reverse' }}
        />
      </div>
      
      {message && (
        <p className="text-center text-muted-foreground animate-pulse-soft mt-2">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingIndicator;
