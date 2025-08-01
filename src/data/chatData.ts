export interface ChatMessageType {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export const initialMessages: ChatMessageType[] = [
  {
    id: '1',
    message: 'Hello! I\'m Raseed AI Assistant. I can help you organize receipts, track expenses, and analyze your spending patterns. How can I assist you today?',
    isBot: true,
    timestamp: new Date(),
  },
];

export const botResponses = [
  "Hey there! Just snap a photo of your receipt, and I’ll pull out all the key details for you — super easy!",
  "Looking for something specific? I can quickly fetch receipts by date, category, or even the store name. Just ask!",
  "Want to get a better look at your spending habits? I can break down your expenses and highlight where your money’s going.",
  "Sure thing! You can upload new receipts, browse your past expenses, or even set up custom categories — I’m here to help.",
  "Nice one! I’m good at scanning receipts, organizing your expenses, and even generating detailed financial reports.",
  "Trying to find a particular receipt? Just tell me what you remember — date, amount, or where you shopped — and I’ll locate it.",
  "Curious about how this month’s spending looks? I can show you your trends by category, merchant, or both!",
  "Want a heads-up before you overspend? I can alert you when you're nearing your budget in any category you choose.",
  "Need your data exported? I can generate CSVs, PDFs, or even sync it with tools like QuickBooks or Google Sheets.",
  "Doing taxes? I’ll help organize receipts into deductible categories and whip up a clean, easy-to-read report.",
];


export const getRandomBotResponse = (): string => {
  return botResponses[Math.floor(Math.random() * botResponses.length)];
};

export const getBotResponseDelay = (): number => {
  // Random delay between 800ms and 2500ms to simulate thinking
  return 800 + Math.random() * 1700;
};