import axios from 'axios';

export interface Example {
  topic: string;
  example: string;
  ageGroup?: string;
}

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

// Add your API key directly here
const GEMINI_API_KEY = 'AIzaSyAowkX4rgYzGmSsHtP1NG9hxlGIdVXscfI';

export const generateExample = async (topic: string, ageGroup?: string): Promise<Example> => {
  try {
    const prompt = ageGroup 
      ? `Generate a simple, clear example explaining "${topic}" for ${ageGroup}. Under 150 words.`
      : `Generate a simple, clear example explaining "${topic}" that anyone can understand. Under 150 words.`;

    const response = await axios.post(
      `${GEMINI_API_ENDPOINT}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      }
    );

    // For debugging
    console.log('API Response:', response.data);

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    return {
      topic,
      example: generatedText,
      ageGroup
    };
  } catch (error) {
    console.error('Error generating example:', error);
    
    // Return a fallback example instead of throwing an error
    return {
      topic,
      example: `Example for ${topic}: This is a placeholder example because we couldn't connect to the API. Please check your API key and try again.`,
      ageGroup
    };
  }
};

export const generateMultipleExamples = async (
  topic: string, 
  count: number = 3
): Promise<Example[]> => {
  try {
    const ageGroups = ['children', 'teenagers', 'adults'];
    
    const promises = Array(count).fill(0).map((_, index) => {
      const ageGroup = count > 1 ? ageGroups[index % ageGroups.length] : undefined;
      return generateExample(topic, ageGroup);
    });
    
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error generating multiple examples:', error);
    
    // Return fallback examples
    return Array(count).fill(0).map((_, index) => ({
      topic,
      example: `Example ${index + 1} for ${topic}: This is a placeholder example because we couldn't connect to the API.`,
      ageGroup: count > 1 ? ['children', 'teenagers', 'adults'][index % 3] : undefined
    }));
  }
};