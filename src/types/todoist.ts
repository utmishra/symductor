export type TodoistTask = {
  id: string;
  order: number;
  content: string;
  description: string;
  projectId: string;
  isCompleted: boolean;
  labels: string[];
  priority: number;
  commentCount: number;
  createdAt: string;
  url: string;
  creatorId: string;
};

export type TodoistTasks = {
  today: TodoistTask[];
  thisWeek: TodoistTask[];
  nextWeek: TodoistTask[];
  overdue: TodoistTask[];
};

export type TodoistTaskRows = {
  today: JSX.Element | JSX.Element[];
  thisWeek: JSX.Element | JSX.Element[];
  nextWeek: JSX.Element | JSX.Element[];
  overdue: JSX.Element | JSX.Element[];
};
