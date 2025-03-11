
import { toast } from 'sonner';

export interface Example {
  topic: string;
  example: string;
  ageGroup?: string;
}

// This is a mock implementation. In a real app, this would connect to a backend service.
export const generateExample = async (topic: string): Promise<Example> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // In a real implementation, this would be an API call to your backend
    // which would then use an AI service to generate the example
    
    // For demo purposes, we'll return mock data based on the topic
    const examples: Record<string, Example> = {
      "gravity": {
        topic: "Gravity",
        example: "Imagine you're holding an apple, and when you open your hand, it falls to the ground. That's gravity! It's like an invisible hand pulling everything toward the Earth. This is why when you jump, you always come back down, and why the moon orbits around our planet instead of floating away into space."
      },
      "photosynthesis": {
        topic: "Photosynthesis",
        example: "Think of plants as having tiny solar panels in their leaves. When sunlight hits these panels, they capture the sun's energy and use it to turn water and air into food for the plant to grow. It's like how you need to eat food to grow, but plants make their own food using sunlight!"
      },
      "democracy": {
        topic: "Democracy",
        example: "Imagine you and your friends deciding what game to play at recess. Instead of one person choosing for everyone, you all get to vote on your favorite game. The game with the most votes wins, and that's what everyone plays. That's how democracy works - people vote to make decisions together."
      },
      "inflation": {
        topic: "Inflation",
        example: "Remember when your favorite candy bar cost $1? Now imagine one day it costs $2, but your allowance stayed the same. That's inflation! It means things cost more money over time, so the same amount of money can buy less than before."
      },
      "internet": {
        topic: "The Internet",
        example: "Think of the internet like a giant library, but instead of books on shelves, the information is stored in computers all around the world. When you search for something, it's like asking a librarian who can instantly find and bring you exactly what you're looking for from anywhere in this worldwide library."
      }
    };
    
    // Check if we have a pre-defined example for this topic
    const lowerCaseTopic = topic.toLowerCase();
    const matchingTopic = Object.keys(examples).find(key => 
      lowerCaseTopic.includes(key) || key.includes(lowerCaseTopic)
    );
    
    if (matchingTopic) {
      return examples[matchingTopic];
    }
    
    // For topics we don't have predefined examples for, generate a generic response
    // In a real implementation, this would call an AI service
    return {
      topic: topic.charAt(0).toUpperCase() + topic.slice(1),
      example: `Imagine ${topic} is like playing with your favorite toy, but each time you play, you discover something new about how it works. It's a bit like learning a new game where the rules make more sense as you practice!`
    };
    
  } catch (error) {
    console.error("Error generating example:", error);
    toast.error("Failed to generate an example. Please try again.");
    throw new Error("Failed to generate an example");
  }
};

// In a real implementation, this function would call your backend
export const generateMultipleExamples = async (topic: string, count: number = 3): Promise<Example[]> => {
  // For demo purposes, we'll just repeat the main example with slight variations
  const mainExample = await generateExample(topic);
  const examples: Example[] = [mainExample];
  
  // Generate additional examples
  for (let i = 1; i < count; i++) {
    examples.push({
      topic: mainExample.topic,
      example: `Here's another way to think about ${topic}: ${mainExample.example.split('.')[1] || ''} This is similar to how ${['water flows downhill', 'puzzle pieces fit together', 'friends share toys', 'birds build nests', 'seasons change'][i % 5]}.`
    });
  }
  
  return examples;
};
