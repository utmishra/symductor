import useFetch from '@/services/useFetch';

const TODOIST_TASKS_URL = '/api/todoist/tasks';

export const useTodoistTasks = () => {
  const { data, error } = useFetch(TODOIST_TASKS_URL);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
