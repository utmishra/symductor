import type { NextApiRequest, NextApiResponse } from 'next';
import { RescueTimeService } from '@/services/rescueTime';
import { RescueTimeApiResponse } from '@/types/rescuetime';
import { Error } from '@/types/error';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RescueTimeApiResponse | Error>) {
  if (!process.env.RESCUETIME_API_KEY) {
    return res.status(500).json({ status: 500, error: 'No RescueTime API key provided' });
  }
  const rescueTimeService = new RescueTimeService(process.env.RESCUETIME_API_KEY);
  const dailySummary = await rescueTimeService.dailySummaryFeed();
  if (!dailySummary) {
    return res.status(500).json({ status: 500, error: 'Something went wrong' });
  }
  res.status(200).json({ status: 200, data: dailySummary.data });
}
