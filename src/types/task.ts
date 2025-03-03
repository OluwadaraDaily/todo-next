export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export interface ITaskData {
  title: string;
  description: string;
}