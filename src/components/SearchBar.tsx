
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  large?: boolean;
  onSearch?: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

const SearchBar = ({
  large = false,
  onSearch,
  initialValue = '',
  placeholder = 'Enter any topic for a simple example...',
  autoFocus = false,
  className,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/example/${encodeURIComponent(query)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'relative w-full max-w-2xl transition-all duration-300 ease-in-out',
        large ? 'scale-100' : 'scale-95',
        className
      )}
    >
      <div 
        className={cn(
          'relative flex items-center w-full overflow-hidden transition-all duration-300',
          'bg-white border shadow-sm',
          large ? 'h-16 rounded-2xl' : 'h-12 rounded-xl',
          isFocused ? 'border-primary shadow-md' : 'border-border'
        )}
      >
        <div className="pl-4">
          <Search 
            className={cn(
              "text-muted-foreground transition-all",
              large ? "h-5 w-5" : "h-4 w-4",
              isFocused && "text-primary"
            )} 
          />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent px-4 outline-none",
            large ? "text-lg py-4" : "text-base py-2"
          )}
        />
        
        <button
          type="submit"
          disabled={!query.trim()}
          className={cn(
            "inline-flex items-center justify-center h-full px-4 font-medium transition-all",
            "bg-primary text-primary-foreground",
            large ? "text-base min-w-28" : "text-sm min-w-24",
            !query.trim() && "opacity-80",
          )}
        >
          <Sparkles className={cn("mr-2", large ? "h-4 w-4" : "h-3.5 w-3.5")} />
          Generate
        </button>
      </div>
      
      {large && (
        <p className="mt-3 text-sm text-muted-foreground text-center px-4">
          Ask for any concept and get a simple explanation with real-life examples
        </p>
      )}
    </form>
  );
};

export default SearchBar;
