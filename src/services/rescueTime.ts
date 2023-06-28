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
    const today = DateTime.local();
    const beginTime = today.startOf('day').toFormat('yyy-LL-dd');
    const endTime = today.minus({ days: 3 }).toFormat('yyyy-LL-dd');
    const activities = await axios.get(`${RESCUETIME_API_PATH}/data`, {
      params: {
        key: this.apiKey,
        format: 'json',
        perspective: 'rank',
        restrict_begin: beginTime,
        restrict_end: endTime,
      },
    });
    if (activities.status >= 200 && activities.status < 300) {
      return activities.data;
    } else {
      return false;
    }
  }

  async analytics(
    startDate: DateTime,
    endDate: DateTime,
    unitBreakDown: 'month' | 'week' | 'day' | 'hour' | 'minute' = 'minute',
    perspective: 'rank' | 'interval' = 'interval',
  ): Promise<RescueTimeActivity> {
    console.log('Fetching RescueTime data...');
    const analytics = await axios.get(`${RESCUETIME_API_PATH}/data`, {
      params: {
        key: this.apiKey,
        format: 'json',
        perspective,
        restrict_begin: startDate.toFormat('yyyy-LL-dd'),
        restrict_end: endDate.toFormat('yyyy-LL-dd'),
        interval: unitBreakDown,
      },
    });

    if (analytics.status >= 200 && analytics.status < 300) {
      return analytics.data as Promise<RescueTimeActivity>;
    } else {
      throw new Error(`Something went wrong while fetching RescueTime data. HTTP status code: ${analytics.status}`);
    }
  }
}
