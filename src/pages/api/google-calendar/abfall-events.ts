import type { NextApiRequest, NextApiResponse } from 'next';

import { GoogleCalendar } from '@/services/googleCalendar';

import { Error } from '@/types/error';

const calendarId = process.env.GOOGLE_PRIMARY_CALENDAR_ID || 'primary';

// http://localhost:3000/api/google-calendar/abfall-events
export default async function handler(req: NextApiRequest, res: NextApiResponse<object | Error>) {
  try {
    // const googleCalendarService = await GoogleCalendar.createInstance();
    // const allEvents = await googleCalendarService.getAllEvents(calendarId);
    // if (!allEvents) {
    //   return res.status(500).json({ status: 500, error: 'Something went wrong' });
    // }
    // res.status(200).json({ status: 200, data: allEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: 'Something went wrong while instantiating Calendar service' });
  }
}
