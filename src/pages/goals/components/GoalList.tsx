import dynamic from 'next/dynamic';

export const GoalList = dynamic(() => import('./GoalListClient').then((mod) => mod.default));
