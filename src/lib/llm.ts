import { SYSTEM_PROMPT } from './personality';

export async function generateResponse(userText: string): Promise<string> {
  // Mock LLM for now
  // In a real implementation, this would call Gemini API or OpenAI API
  console.log("LLM Input:", userText);
  
  const lower = userText.toLowerCase();
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (lower.includes("hello") || lower.includes("hi")) return "Hi there! I'm Lola. How are you feeling today?";
  if (lower.includes("name")) return "I'm Lola, your digital friend.";
  if (lower.includes("sad") || lower.includes("upset")) return "I'm sorry to hear that. Do you want to talk about it?";
  if (lower.includes("happy") || lower.includes("good")) return "That's wonderful! What made you smile?";
  if (lower.includes("weather")) return "I can't check the weather yet, but I hope it's sunny inside your heart!";
  if (lower.includes("thank")) return "You are very welcome!";
  
  return "I'm listening. Tell me more.";
}
