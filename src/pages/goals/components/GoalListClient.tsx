import React from 'react';
import useGoals from '../hooks/useGoals';
import { Text } from '@nextui-org/react';
import { addGoal, addSubgoal, updateGoal, updateSubgoal, deleteGoal, deleteSubgoal } from '@/services/goals';
import Goal from './Goal';

export const GoalListClient: React.FC = () => {
  const { goals, isLoading, error } = useGoals();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <div>
      {goals.map((goal) => (
        <Goal
          key={goal.id}
          id={''}
          name={''}
          description={''}
          archived={false}
          subgoals={[]}
          updateGoal={updateGoal}
          updateSubgoal={updateSubgoal}
          addSubgoal={addSubgoal}
          addGoal={addGoal}
          deleteGoal={deleteGoal}
          deleteSubgoal={deleteSubgoal}
        />
      ))}
    </div>
  );
};