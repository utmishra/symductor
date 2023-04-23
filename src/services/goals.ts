import { db } from '../firebaseConfig';
import { collection, doc, getDoc, addDoc, setDoc, getDocs } from 'firebase/firestore';
import { Goal, Subgoal } from '../types/goals';

const goalsCollection = collection(db, 'goals');

export async function fetchGoals(): Promise<Goal[]> {
  const snapshot = await getDocs(goalsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Goal[];
}

export async function updateGoal(goalId: string, data: Partial<Goal>): Promise<void> {
  const goalDoc = doc(goalsCollection, goalId);
  const goalSnapshot = await getDoc(goalDoc);
  const goalData = goalSnapshot.data() as Goal;

  await setDoc(goalDoc, { ...goalData, ...data });
}

export async function updateSubgoal(goalId: string, subgoalId: string, data: Partial<Subgoal>): Promise<void> {
  const goalDoc = doc(goalsCollection, goalId);
  const goalSnapshot = await getDoc(goalDoc);
  const goalData = goalSnapshot.data() as Goal;

  const updatedSubgoals = goalData.subgoals.map((subgoal) => (subgoal.id === subgoalId ? { ...subgoal, ...data } : subgoal));

  await setDoc(goalDoc, { ...goalData, subgoals: updatedSubgoals });
}

export async function addGoal(data: Partial<Goal>): Promise<string> {
  const newGoal = await addDoc(goalsCollection, data);
  return newGoal.id;
}

export async function addSubgoal(goalId: string, data: Partial<Subgoal>): Promise<void> {
  const goalDoc = doc(goalsCollection, goalId);
  const goalSnapshot = await getDoc(goalDoc);
  const goalData = goalSnapshot.data() as Goal;

  const updatedSubgoals = [...goalData.subgoals, data];

  await setDoc(goalDoc, { ...goalData, subgoals: updatedSubgoals });
}
