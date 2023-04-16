import { RescueTimeDailySummaryFeed } from '@/types/rescuetime';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const RESCUETIME_API_PATH = 'https://www.rescuetime.com/anapi/data';

export const rescueTimeService = {
  dailySummaryFeed: async (): Promise<RescueTimeDailySummaryFeed> => {
    if (!process.env.RESCUETIME_API_KEY) {
      throw new Error('No RescueTime API key provided');
    }
    const rescueTimeApi = axios.create({
      baseURL: RESCUETIME_API_PATH,
      params: {
        key: process.env.RESCUETIME_API_KEY,
        format: 'json',
      },
    });

    const dailySummary = await rescueTimeApi
      .get('/daily_summary_feed', {
        params: {
          key: process.env.RESCUETIME_API_KEY,
          format: 'json',
        },
      })
      .catch((error) => {
        console.error(error);
        return { data: false };
      });

    if (!dailySummary.data) {
      throw new Error('No data returned from RescueTime');
    }

    return dailySummary.data;
  },
};
