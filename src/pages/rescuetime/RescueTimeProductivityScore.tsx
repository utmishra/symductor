import dynamicClientSide from '@/utils/dynamicClientSide';

export const RescueTimeProductivityScore = dynamicClientSide(() => import('./RescueTimeProductivityScoreClient').then((mod) => mod.default));
