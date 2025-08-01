// Mock data for charts and analytics
export const spendingData = [
  { month: 'Jan', amount: 1200, category: 'Food' },
  { month: 'Feb', amount: 900, category: 'Food' },
  { month: 'Mar', amount: 1100, category: 'Food' },
  { month: 'Apr', amount: 800, category: 'Food' },
  { month: 'May', amount: 1300, category: 'Food' },
  { month: 'Jun', amount: 950, category: 'Food' },
];

export const categoryData = [
  { name: 'Food & Dining', value: 35, amount: 2450 },
  { name: 'Transportation', value: 25, amount: 1750 },
  { name: 'Shopping', value: 20, amount: 1400 },
  { name: 'Entertainment', value: 10, amount: 700 },
  { name: 'Bills & Utilities', value: 10, amount: 700 },
];

export const recentUploads = [
  {
    id: 1,
    fileName: 'Starbucks_Receipt_2024.pdf',
    amount: 12.45,
    category: 'Food & Dining',
    date: '2024-01-15',
    status: 'processed',
  },
  {
    id: 2,
    fileName: 'Uber_Trip_Downtown.jpg',
    amount: 28.90,
    category: 'Transportation',
    date: '2024-01-14',
    status: 'processing',
  },
  {
    id: 3,
    fileName: 'Amazon_Purchase_Receipt.pdf',
    amount: 156.78,
    category: 'Shopping',
    date: '2024-01-13',
    status: 'processed',
  },
  {
    id: 4,
    fileName: 'Netflix_Subscription.pdf',
    amount: 15.99,
    category: 'Entertainment',
    date: '2024-01-12',
    status: 'processed',
  },
];

export const smartInsights = [
  {
    id: 1,
    type: 'warning',
    title: 'Spending Alert',
    description: 'You\'ve spent 20% more on dining this month compared to last month.',
    action: 'View Details',
  },
  {
    id: 2,
    type: 'success',
    title: 'Budget Goal Met',
    description: 'Congratulations! You\'ve successfully stayed under your transportation budget.',
    action: 'See Progress',
  },
  {
    id: 3,
    type: 'info',
    title: 'Tax Optimization',
    description: 'Found 5 business receipts that can be claimed as tax deductions.',
    action: 'Review Items',
  },
];

// Mock task data for Kanban board
export const initialTasks = {
  'todo': {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 'task-1',
        content: 'Upload Q1 business receipts',
        priority: 'high' as const,
        dueDate: '2024-01-20',
        tags: ['tax', 'business'],
      },
      {
        id: 'task-2',
        content: 'Categorize dining expenses',
        priority: 'medium' as const,
        dueDate: '2024-01-18',
        tags: ['personal'],
      },
      {
        id: 'task-3',
        content: 'Review subscription payments',
        priority: 'low' as const,
        dueDate: '2024-01-25',
        tags: ['recurring'],
      },
    ],
  },
  'inprogress': {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: 'task-4',
        content: 'Process travel receipts from business trip',
        priority: 'high' as const,
        dueDate: '2024-01-17',
        tags: ['business', 'travel'],
      },
      {
        id: 'task-5',
        content: 'Set up automatic expense categorization',
        priority: 'medium' as const,
        dueDate: '2024-01-22',
        tags: ['automation'],
      },
    ],
  },
  'done': {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 'task-6',
        content: 'Export December expense report',
        priority: 'high' as const,
        dueDate: '2024-01-05',
        tags: ['report', 'monthly'],
      },
      {
        id: 'task-7',
        content: 'Update tax deduction categories',
        priority: 'medium' as const,
        dueDate: '2024-01-10',
        tags: ['tax', 'setup'],
      },
    ],
  },
};

export const userStats = {
  totalExpenses: 7000,
  receiptsProcessed: 142,
  categoriesCreated: 12,
  timeSaved: 24,
  xpPoints: 1250,
  level: 5,
  nextLevelXP: 1500,
};