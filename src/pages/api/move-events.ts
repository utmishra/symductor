import type { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalendar } from '@/services/googleCalendar';

import { Error } from '@/types/error';

// http://localhost:3000/api/google-calendar/move-events
export default async function POST(req: NextApiRequest, res: NextApiResponse<object | Error>) {
  try {
    const eventIds = req.body.eventIds;
    const calendarId = req.body.calendarId;

    const googleCalendarService = await GoogleCalendar.createInstance();
    const allEvents = await googleCalendarService.moveEventsToCalendar(eventIds, calendarId);
    if (!allEvents) {
      return res.status(500).json({ status: 500, error: 'Something went wrong' });
    }
    res.status(200).json({ status: 200, data: allEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Something went wrong while instantiating Calendar service' });
  }
}
