// types.ts
export interface Task {
  id: number;
  title: string;
  time: string;
  description: string;
  category: string;
  dueDate: string; // Format: YYYY-MM-DD
}
