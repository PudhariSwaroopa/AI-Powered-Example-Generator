
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import LoadingIndicator from '@/components/LoadingIndicator';
import ExampleCard from '@/components/ExampleCard';
import { generateMultipleExamples, Example } from '@/utils/exampleGenerator';
import { ArrowLeft, Share2, Bookmark, Copy } from 'lucide-react';
import { toast } from 'sonner';

const ExamplePage = () => {
  const { topic } = useParams<{ topic: string }>();
  const [examples, setExamples] = useState<Example[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamples = async () => {
      if (!topic) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const decodedTopic = decodeURIComponent(topic);
        const generatedExamples = await generateMultipleExamples(decodedTopic, 3);
        setExamples(generatedExamples);
      } catch (err) {
        console.error("Error fetching examples:", err);
        setError("Failed to generate examples. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamples();
  }, [topic]);

  const handleSearch = (query: string) => {
    navigate(`/example/${encodeURIComponent(query)}`);
  };

  const handleCopyExample = (example: string) => {
    navigator.clipboard.writeText(example);
    toast.success("Example copied to clipboard");
  };

  const handleSaveExample = () => {
    // In a real app, this would save to user's account
    toast.success("Example saved to your collection");
  };

  const handleShareExample = () => {
    if (navigator.share && examples.length > 0) {
      navigator.share({
        title: `Simple Example: ${examples[0].topic}`,
        text: examples[0].example,
        url: window.location.href,
      }).catch(err => {
        console.error("Error sharing:", err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard. Ready to share!");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <SearchBar 
              initialValue={topic ? decodeURIComponent(topic) : ''} 
              onSearch={handleSearch}
              className="mx-auto"
            />
          </div>
          
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <LoadingIndicator 
                size="large" 
                message="Crafting simple examples for you..." 
              />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to home
              </button>
            </div>
          ) : (
              <div className="space-y-8">
                {examples.map((example, index) => (
                  <div key={index} className="relative">
                    <ExampleCard 
                      example={example} 
                      index={index} 
                    />
                    
                    <div className="absolute right-4 top-4 flex space-x-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        onClick={() => handleCopyExample(example.example)}
                        title="Copy example"
                      >
                        <Copy className="h-4 w-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        onClick={handleSaveExample}
                        title="Save example"
                      >
                        <Bookmark className="h-4 w-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        onClick={handleShareExample}
                        title="Share example"
                      >
                        <Share2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-8">
                  <p className="text-muted-foreground mb-4">
                    Not what you're looking for?
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Try a different topic
                  </button>
                </div>
              </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExamplePage;
