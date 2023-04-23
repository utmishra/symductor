import dynamicClientSide from '@/utils/dynamicClientSide';

export const RescueTimeProductivityScore = dynamicClientSide(() => import('./RescueTimeProductivityScoreClient'));
