import dynamic from 'next/dynamic';

const GoalList = dynamic(() => import('./GoalListClient').then((mod) => mod.default));

export default GoalList;
