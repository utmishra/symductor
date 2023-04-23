import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchNonArchivedGoals } from '../../../services/goals';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const goals = await fetchNonArchivedGoals();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
