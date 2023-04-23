import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchGoals } from '../../../services/goals';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const goals = await fetchGoals();
    console.log('Fetched goals:', goals);
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
