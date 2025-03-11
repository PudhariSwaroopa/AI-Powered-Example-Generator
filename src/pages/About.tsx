
import Header from '@/components/Header';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">About ExampleGenerator</h1>
            
            <div className="space-y-6 bg-white p-8 rounded-xl shadow-sm border">
              <p>
                ExampleGenerator was created to help make complex ideas accessible to everyone. 
                Our mission is to transform difficult concepts into easy-to-understand examples 
                that even children can grasp.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8">How It Works</h2>
              <p>
                Our AI system analyzes concepts and breaks them down into their most fundamental 
                elements. Then, it creates relatable real-world examples that illustrate the concept 
                in a way that's easy to understand, regardless of your age or background.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8">Our Approach</h2>
              <div className="grid gap-6 md:grid-cols-3 mt-4">
                {[
                  {
                    title: "Simplicity",
                    description: "We remove jargon and technical language to make concepts clear and accessible."
                  },
                  {
                    title: "Relevance",
                    description: "We create examples that connect to everyday life and experiences."
                  },
                  {
                    title: "Clarity",
                    description: "We focus on the core idea without unnecessary complexity."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="p-6 bg-secondary/50 rounded-lg"
                  >
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <p className="mt-8 text-center text-muted-foreground">
                Have a complex topic? Try our example generator today!
              </p>
            </div>
          </div>
      </main>
    </div>
  );
};

export default About;
