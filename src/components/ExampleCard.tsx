
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';

export interface Example {
  topic: string;
  example: string;
  ageGroup?: string;
}

interface ExampleCardProps {
  example: Example;
  index?: number;
  className?: string;
}

const ExampleCard = ({ example, index = 0, className }: ExampleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn(
        'w-full bg-white rounded-xl shadow-sm border border-border',
        'p-6 transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="h-5 w-5 text-primary" />
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              {example.ageGroup ? `For ${example.ageGroup}` : 'Simple Example'}
            </h3>
            <h2 className="text-xl font-semibold tracking-tight">{example.topic}</h2>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">{example.example}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExampleCard;
