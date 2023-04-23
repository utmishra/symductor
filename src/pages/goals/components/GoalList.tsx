import React from 'react';
import Goal from './Goal';
import { updateGoal, updateSubgoal, addSubgoal, addGoal } from '../../../services/goals';
import { Goal as GoalType } from '../../../types/goals';

function GoalList(goals: GoalType[]) {
  return (
    <div>
      {goals.map((goal) => (
        <Goal key={goal.id} {...goal} updateGoal={updateGoal} updateSubgoal={updateSubgoal} addGoal={addGoal} addSubgoal={addSubgoal} />
      ))}
    </div>
  );
}

export default GoalList;
