import { TodoistApi } from '@doist/todoist-api-typescript';
import { DateTime } from 'ts-luxon';

export const todoistService = async () => {
  if (!process.env.TODOIST_API_KEY) {
    throw new Error('No API key provided');
  }

  const todoistApi = new TodoistApi(process.env.TODOIST_API_KEY);
  try {
    const thisWeek = DateTime.local().plus({ days: 7 });
    const nextWeek = DateTime.local().plus({ days: 14 });

    const tasksToday = await todoistApi.getTasks({ filter: 'today' });
    const tasksThisWeek = await todoistApi.getTasks({ filter: `due before: ${thisWeek.toFormat('LLL dd')}` });
    const tasksNextWeek = await todoistApi.getTasks({ filter: `due before: ${nextWeek.toFormat('LLL dd')}` });
    const tasksOverdue = await todoistApi.getTasks({ filter: 'overdue' });

    return {
      today: tasksToday,
      thisWeek: tasksThisWeek,
      nextWeek: tasksNextWeek,
      overdue: tasksOverdue,
    };
  } catch (error) {
    throw new Error('Error fetching tasks from Todoist');
  }
};
