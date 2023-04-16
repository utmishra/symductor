import { RescueTimeApiResponse } from '@/types/rescuetime';
import axios from 'axios';

const RESCUETIME_API_PATH = 'https://www.rescuetime.com/anapi';

export const rescueTimeService = {
  dailySummaryFeed: async (): Promise<RescueTimeApiResponse> => {
    if (!process.env.RESCUETIME_API_KEY) {
      throw new Error('No RescueTime API key provided');
    }

    const dailySummary = await axios.get(`${RESCUETIME_API_PATH}/daily_summary_feed`, {
      params: {
        key: process.env.RESCUETIME_API_KEY,
        format: 'json',
      },
    });
    if (dailySummary.status >= 200 && dailySummary.status < 300) {
      return {
        status: 200,
        data: dailySummary.data,
      };
    } else {
      return {
        status: dailySummary.status,
        error: 'Something went wrong while fetching RescueTime data',
      };
    }
  },
};
