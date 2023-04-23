export interface Goal {
  id: string;
  name: string;
  description: string;
  archived: boolean;
  subgoals: Subgoal[];
}

export interface Subgoal {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export type GoalComponentProps = Goal & {
  updateGoal: (goalId: string, data: Partial<Goal>) => void;
  updateSubgoal: (goalId: string, subgoalId: string, data: Partial<Subgoal>) => void;
  addSubgoal: (goalId: string, data: Omit<Subgoal, 'id'>) => void;
  addGoal: (data: Omit<Goal, 'id'>) => void;
  deleteGoal: (goalId: string) => void;
  deleteSubgoal: (goalId: string, subgoalId: string) => void;
};
