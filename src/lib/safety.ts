export const UNSAFE_TOPICS = [
  'suicide', 'kill', 'die', 'hurt myself', 'harm myself',
  'bomb', 'weapon', 'terror',
  'medical advice', 'doctor', 'prescription', 'diagnosis'
];

export function checkSafety(input: string): { isSafe: boolean; reason?: string } {
  const lower = input.toLowerCase();
  
  for (const topic of UNSAFE_TOPICS) {
    if (lower.includes(topic)) {
      return { 
        isSafe: false, 
        reason: "I cannot discuss this topic. Please seek professional help if you are in distress." 
      };
    }
  }
  
  return { isSafe: true };
}
