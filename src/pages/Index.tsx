
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ExampleCard from '@/components/ExampleCard';
import { generateExample, Example } from '@/utils/exampleGenerator';

const popularTopics = [
  "Gravity",
  "Photosynthesis",
  "Democracy",
  "Atoms",
  "Climate Change",
  "Internet",
];

const Index = () => {
  const [featuredExample, setFeaturedExample] = useState<Example | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeaturedExample = async () => {
      try {
        setIsLoading(true);
        const example = await generateExample("gravity");
        setFeaturedExample(example);
      } catch (error) {
        console.error("Failed to load featured example:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedExample();
  }, []);

  const handlePopularTopicClick = (topic: string) => {
    navigate(`/example/${encodeURIComponent(topic)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Complex Ideas,{" "}
                <span className="text-primary">Example Generator</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Transform any difficult concept into easy-to-understand examples.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <SearchBar large autoFocus />
            </motion.div>
          </div>
      </section>
      
      {/* Popular Topics */}
      <section className="py-12 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Popular Topics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularTopics.map((topic, index) => (
              <motion.button
                key={topic}
                onClick={() => handlePopularTopicClick(topic)}
                className="p-4 rounded-lg bg-white shadow-sm border border-border hover:border-primary/30 hover:shadow transition-all text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <span className="font-medium">{topic}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Example */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Featured Example</h2>
          
          {featuredExample ? (
            <ExampleCard example={featuredExample} />
          ) : (
            <div className="h-48 flex items-center justify-center">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-secondary rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary rounded"></div>
                    <div className="h-4 bg-secondary rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto py-8 border-t">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ExampleGenerator — Making complex ideas simple for everyone</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
