import type { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalendar } from '@/services/googleCalendar';

import { Error } from '@/types/error';

// http://localhost:3000/api/google-calendar/move-events
export default async function POST(req: NextApiRequest, res: NextApiResponse<object | Error>) {
  try {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const sourceCalendarId = req.body.sourceCalendarId;
    const targetCalendarId = req.body.targetCalendarId;

    const googleCalendarService = await GoogleCalendar.createInstance();
    const response = await googleCalendarService.moveAbfallEventsToWerstoffCalendar(startDate, endDate, sourceCalendarId, targetCalendarId);
    if (!response) {
      return res.status(500).json({ status: 500, error: 'Something went wrong' });
    }
    res.status(200).json({ status: 200, data: 'Moved!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Something went wrong while instantiating Calendar service' });
  }
}
