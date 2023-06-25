import { db } from '../firebaseConfig';
import { collection, doc, getDoc, addDoc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { Goal, Subgoal } from '../types/goals';

const goalsCollection = collection(db, 'goals');

export async function fetchGoals(): Promise<Goal[] | false> {
  try {
    const snapshot = await getDocs(goalsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Goal[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateGoal(goalId: string, data: Partial<Goal>): Promise<void | false> {
  try {
    const goalDoc = doc(goalsCollection, goalId);
    const goalSnapshot = await getDoc(goalDoc);
    const goalData = goalSnapshot.data() as Goal;

    await setDoc(goalDoc, { ...goalData, ...data });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateSubgoal(goalId: string, subgoalId: string, data: Partial<Subgoal>): Promise<void | false> {
  try {
    const goalDoc = doc(goalsCollection, goalId);
    const goalSnapshot = await getDoc(goalDoc);
    const goalData = goalSnapshot.data() as Goal;

    const updatedSubgoals = goalData.subgoals.map((subgoal) => (subgoal.id === subgoalId ? { ...subgoal, ...data } : subgoal));

    await setDoc(goalDoc, { ...goalData, subgoals: updatedSubgoals });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addGoal(data: Partial<Goal>): Promise<string | false> {
  try {
    const newGoal = await addDoc(goalsCollection, data);
    return newGoal.id;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function addSubgoal(goalId: string, data: Partial<Subgoal>): Promise<void | false> {
  try {
    const goalDoc = doc(goalsCollection, goalId);
    const goalSnapshot = await getDoc(goalDoc);
    const goalData = goalSnapshot.data() as Goal;

    const updatedSubgoals = [...goalData.subgoals, data];

    await setDoc(goalDoc, { ...goalData, subgoals: updatedSubgoals });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteGoal(goalId: string): Promise<void | false> {
  const goalDoc = doc(goalsCollection, goalId);
  try {
    await deleteDoc(goalDoc);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteSubgoal(goalId: string, subgoalId: string): Promise<void | false> {
  try {
    const goalDoc = doc(goalsCollection, goalId);
    const goalSnapshot = await getDoc(goalDoc);
    const goalData = goalSnapshot.data() as Goal;

    const updatedSubgoals = goalData.subgoals.filter((subgoal) => subgoal.id !== subgoalId);

    await setDoc(goalDoc, { ...goalData, subgoals: updatedSubgoals });
  } catch (error) {
    console.error(error);
    return false;
  }
}
