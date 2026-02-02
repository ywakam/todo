export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string; // ISO 8601形式
  createdAt: string;
  updatedAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export type SortType = 'createdAt' | 'dueDate' | 'priority';
