import dynamic from 'next/dynamic';

export const RescueTimeActivities = dynamic(() => import('./RescueTimeActivitiesClient').then((mod) => mod.RescueTimeActivitiesClient));
