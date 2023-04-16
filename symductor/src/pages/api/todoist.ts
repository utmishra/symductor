import type { NextApiRequest, NextApiResponse } from 'next';
import { todoistService } from '@/services/todoist';
import { TodoistTasks } from '@/types/todoist';
import { Error } from '@/types/error';

export default async function handler(req: NextApiRequest, res: NextApiResponse<TodoistTasks | Error>) {
  const tasks = await todoistService();
  if (!tasks) {
    res.status(500).json({ status: 500, error: 'Error fetching tasks from Todoist' });
  }
  res.status(200).json(tasks);
}
