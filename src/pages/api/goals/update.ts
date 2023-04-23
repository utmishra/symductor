import type { NextApiRequest, NextApiResponse } from 'next';
import { updateGoal, updateSubgoal, addGoal, addSubgoal, deleteGoal, deleteSubgoal } from '../../../services/goals';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const { action, goalId, subgoalId, data } = req.body;

    try {
      switch (action) {
        case 'addGoal':
          const newGoalId = await addGoal(data);
          res.status(200).json({ goalId: newGoalId });
          break;
        case 'addSubgoal':
          const newSubgoalId = await addSubgoal(goalId, data);
          res.status(200).json({ subgoalId: newSubgoalId });
          break;
        case 'updateGoal':
          await updateGoal(goalId, data);
          res.status(200).json({ message: 'Goal updated' });
          break;
        case 'updateSubgoal':
          await updateSubgoal(goalId, subgoalId, data);
          res.status(200).json({ message: 'Subgoal updated' });
          break;
        case 'deleteGoal':
          await deleteGoal(goalId);
          res.status(200).json({ message: 'Goal deleted' });
          break;
        case 'deleteSubgoal':
          await deleteSubgoal(goalId, subgoalId);
          res.status(200).json({ message: 'Subgoal deleted' });
          break;
        default:
          res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
