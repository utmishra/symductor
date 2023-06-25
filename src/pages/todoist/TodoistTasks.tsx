import dynamicClientSide from '@/utils/dynamicClientSide';

export const TodoistTasks = dynamicClientSide(() => import('./TodoistTasksClient').then((mod) => mod.default));
