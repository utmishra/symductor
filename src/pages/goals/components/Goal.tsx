import React, { useState } from 'react';
import { GoalComponentProps } from '@/types/goals';
import ConfirmationModal from '@/pages/common/ConfirmationModal';
import { toast } from 'react-toastify';
import { Button, Input, Tooltip } from '@nextui-org/react';

function Goal({
  id,
  name,
  description,
  subgoals,
  updateGoal,
  updateSubgoal,
  addSubgoal,
  addGoal,
  deleteGoal,
  deleteSubgoal,
}: GoalComponentProps): JSX.Element {
  const [addingSubgoal, setAddingSubgoal] = useState(false);
  const [newSubgoalText, setNewSubgoalText] = useState('');
  const [newGoalText, setNewGoalText] = useState('');
  const [editing, setEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteSubgoalDialog, setShowDeleteSubgoalDialog] = useState(false);
  const [subgoalToDelete, setSubgoalToDelete] = useState<string | null>(null);

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
      updateGoal(id, { name });
      setEditing(false);
    }
  };

  const handleDeleteGoal = async () => {
    try {
      deleteGoal(id);
      setShowDeleteDialog(false);
      toast.success('Goal deleted successfully.');
    } catch (error) {
      toast.error('Error deleting goal. Please try again.');
    }
  };

  const handleUpdateSubgoal = async (subgoalId: string, newName: string) => {
    try {
      updateSubgoal(id, subgoalId, { name: newName });
      toast.success('Subgoal updated successfully.');
    } catch (error) {
      toast.error('Error updating subgoal. Please try again.');
    }
  };

  const handleDeleteSubgoal = async () => {
    if (subgoalToDelete) {
      try {
        deleteSubgoal(id, subgoalToDelete);
        setShowDeleteSubgoalDialog(false);
        setSubgoalToDelete(null);
        toast.success('Subgoal deleted successfully.');
      } catch (error) {
        toast.error('Error deleting subgoal. Please try again.');
      }
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
        {subgoals && typeof subgoals.map == 'function' ? (
          subgoals.map((subgoal) => (
            <div key={subgoal.id}>
              {/* ... subgoal elements */}
              <Input value={subgoal.name} onChange={(e) => handleUpdateSubgoal(subgoal.id, e.target.value)} placeholder='Subgoal name' />
              <Button
                size='md'
                type='reset'
                onClick={() => {
                  setShowDeleteSubgoalDialog(true);
                  setSubgoalToDelete(subgoal.id);
                }}
              >
                Delete Subgoal
              </Button>
            </div>
          ))
        ) : (
          <Tooltip color='error' content='Error loading subgoals' />
        )}
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
      <Button size='md' type='reset' onClick={() => setShowDeleteDialog(true)}>
        Delete Goal
      </Button>

      <ConfirmationModal
        open={showDeleteDialog}
        title='Delete Goal'
        message='Are you sure you want to delete this goal?'
        onConfirm={handleDeleteGoal}
        onClose={() => setShowDeleteDialog(false)}
        confirmButtonText='Yes, Delete'
        cancelButtonText='No, Keep'
        confirmButtonColor='error'
        cancelButtonColor='default'
      />
      <ConfirmationModal
        open={showDeleteSubgoalDialog}
        title='Delete Subgoal'
        message='Are you sure you want to delete this subgoal?'
        onConfirm={handleDeleteSubgoal}
        onClose={() => setShowDeleteSubgoalDialog(false)}
        confirmButtonText='Yes, Delete'
        cancelButtonText='No, Keep'
        confirmButtonColor='error'
        cancelButtonColor='default'
      />
    </div>
  );
}

export default Goal;
