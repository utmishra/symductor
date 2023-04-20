import { RescueTimeActivity, RescueTimeApiResponse } from '@/types/rescuetime';
import axios from 'axios';
import { DateTime } from 'luxon';

const RESCUETIME_API_PATH = 'https://www.rescuetime.com/anapi';

export class RescueTimeService {
  apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('No RescueTime API key provided');
    }
    this.apiKey = apiKey;
  }

  async dailySummaryFeed(): Promise<RescueTimeApiResponse> {
    const dailySummary = await axios.get(`${RESCUETIME_API_PATH}/daily_summary_feed`, {
      params: {
        key: this.apiKey,
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
  }

  async currentActivity(): Promise<RescueTimeActivity | false> {
    const dailySummary = await axios.get(`${RESCUETIME_API_PATH}/data`, {
      params: {
        key: this.apiKey,
        format: 'json',
        perspective: 'interval',
        resolution_time: 'minute',
        restrict_begin: DateTime.local().toFormat('yyyy-MM-dd'),
        restrict_end: DateTime.local().minus({ days: 1 }).toFormat('yyyy-MM-dd'),
      },
    });
    if (dailySummary.status >= 200 && dailySummary.status < 300) {
      return dailySummary.data;
    } else {
      return false;
    }
  }
}
