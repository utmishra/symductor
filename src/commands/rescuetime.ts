import { RescueTimeService } from '../services/rescueTime';
import { DateTime } from 'luxon';

export class RescuetimeCommand {
  service: RescueTimeService;

  constructor(apiKey: string) {
    this.service = new RescueTimeService(apiKey);
  }

  async getDailyActivity(perspective: 'rank' | 'interval', range: string) {
    let startDate: DateTime = DateTime.now().startOf('day');
    const endDate: DateTime = DateTime.now().endOf('day');

    switch (range) {
      case 'today':
        startDate = DateTime.now().startOf('day');
        break;
      case 'last 7 days':
        startDate = DateTime.now().minus({ days: 7 });
        break;
      case 'last week':
        startDate = DateTime.now().minus({ weeks: 1 }).startOf('week');
        break;
      case 'last 15 days':
        startDate = DateTime.now().minus({ days: 15 });
        break;
    }

    return await this.service.analytics(startDate, endDate, 'day', perspective);
  }
}
