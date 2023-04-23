import React, { useState } from 'react';
import { Goal, GoalComponentProps } from '@/types/goals';

function Goal({ id, name, description, subgoals, updateGoal, updateSubgoal, addSubgoal, addGoal }: GoalComponentProps): JSX.Element {
  const [addingSubgoal, setAddingSubgoal] = useState(false);
  const [newSubgoalText, setNewSubgoalText] = useState('');
  const [newGoalText, setNewGoalText] = useState('');
  const [editing, setEditing] = useState(false);

  const handleAddSubgoal = async () => {
    if (newSubgoalText.trim()) {
      addSubgoal(id, {
        name: newSubgoalText,
        description: '',
        completed: false,
      });
      setNewSubgoalText('');
      setAddingSubgoal(false);
    }
  };

  const handleAddGoal = async () => {
    if (newGoalText.trim()) {
      addGoal({
        name: newGoalText,
        description: '',
        subgoals: [],
        archived: false,
      });
      setNewGoalText('');
    }
  };

  const handleUpdateGoal = async () => {
    if (name.trim()) {
      await updateGoal(id, { name });
      setEditing(false);
    }
  };

  return (
    <div>
      {editing ? (
        <>
          <input type='text' value={name} onChange={(e) => updateGoal(id, { name: e.target.value })} />
          <button onClick={handleUpdateGoal}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2 onDoubleClick={() => setEditing(true)}>{name}</h2>
          <p>{description}</p>
        </>
      )}
      <ul>
        {subgoals.map((subgoal) => (
          <li key={subgoal.id}>{subgoal.name}</li>
        ))}
      </ul>
      {addingSubgoal ? (
        <>
          <input type='text' value={newSubgoalText} onChange={(e) => setNewSubgoalText(e.target.value)} />
          <button onClick={handleAddSubgoal}>Add Subgoal</button>
          <button onClick={() => setAddingSubgoal(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setAddingSubgoal(true)}>Add Subgoal</button>
      )}
      <div>
        <input type='text' value={newGoalText} onChange={(e) => setNewGoalText(e.target.value)} />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
    </div>
  );
}

export default Goal;
