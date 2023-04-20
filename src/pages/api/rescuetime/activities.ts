import type { NextApiRequest, NextApiResponse } from 'next';
import { RescueTimeService } from '../../../services/rescueTime';
import { RescueTimeActivity } from '../../../types/rescuetime';
import { sendErrorToChatGPT } from '../../../services/aiDebug';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: number; data?: RescueTimeActivity; error?: Error | string }>,
) {
  try {
    if (!process.env.RESCUETIME_API_KEY) {
      return res.status(500).json({ status: 500, error: 'No RescueTime API key provided' });
    }
    const rescueTimeService = new RescueTimeService(process.env.RESCUETIME_API_KEY);
    const dailySummary = await rescueTimeService.currentActivity();
    if (!dailySummary) {
      return res.status(500).json({ status: 500, error: 'Something went wrong' });
    }
    res.status(200).json({ status: 200, data: dailySummary });
  } catch (error) {
    if (error instanceof Error) {
      sendErrorToChatGPT({ fileName: __filename, error: error.message });
      res.status(500).json({ status: 500, error: error.message });
    } else {
      sendErrorToChatGPT({ fileName: __filename, error: 'An unknown error occurred' });
      res.status(500).json({ status: 500, error: 'An unknown error occurred' });
    }
  }
}
