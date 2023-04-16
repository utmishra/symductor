import type { NextApiRequest, NextApiResponse } from 'next';
import { rescueTimeService } from '@/services/rescueTime';
import { RescueTimeApiResponse } from '@/types/rescuetime';
import { Error } from '@/types/error';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RescueTimeApiResponse | Error>) {
  const dailySummary = await rescueTimeService.dailySummaryFeed();
  if (!dailySummary) {
    return res.status(500).json({ status: 500, error: 'Something went wrong' });
  }
  res.status(200).json({ status: 200, data: dailySummary.data });
}
