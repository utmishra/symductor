import type { NextApiRequest, NextApiResponse } from 'next';
import { rescueTimeService } from '@/services/rescueTime';
import { RescueTimeDailySummaryFeed } from '@/types/rescuetime';

export default async function handler(req: NextApiRequest, res: NextApiResponse<RescueTimeDailySummaryFeed>) {
  const dailySummary = await rescueTimeService.dailySummaryFeed();
  res.status(200).json(dailySummary);
}
