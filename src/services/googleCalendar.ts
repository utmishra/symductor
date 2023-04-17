import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';
import * as util from 'util';
import { GoogleCalendarEvent } from '@/pages/rescuetime/types';

const readFile = util.promisify(fs.readFile);
const werstoffEvents = [
  'Kehricht',
  'Grüngut',
  'Karton',
  'Papier',
  'Kompostabgabe',
  'Häckselaktion Frühjahr',
  'Häckselaktion Herbst',
  'Sonderabfallmobil',
  'Hauptsammelstelle geschlossen',
  'Tour Öki-Bus fällt aus',
  'Hauptsammelstelle Nachmittag geschlossen',
  'Tour Öki-Bus Nachmittag fällt aus',
  'Reminder of the last day of validity',
];

export class GoogleCalendar {
  private static SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
  private calendarClient: calendar_v3.Calendar;

  private constructor(calendarClient: calendar_v3.Calendar) {
    this.calendarClient = calendarClient;
  }

  public static async createInstance(): Promise<GoogleCalendar> {
    const authClient = await GoogleCalendar.authenticate();
    const calendarClient = google.calendar({ version: 'v3', auth: authClient });
    return new GoogleCalendar(calendarClient);
  }

  private static async authenticate(): Promise<OAuth2Client> {
    if (!process.env.GOOGLE_CALENDAR_CREDENTIALS_PATH) {
      throw new Error('GOOGLE_CALENDAR_CREDENTIALS_PATH environment variable not found');
    }

    const content = await readFile(process.env.GOOGLE_CALENDAR_CREDENTIALS_PATH, 'utf-8');
    const credentials = JSON.parse(content);
    const { client_email, private_key } = credentials;

    if (!client_email || !private_key) {
      throw new Error('Invalid Google Calendar credentials file');
    }

    const client = new google.auth.JWT(client_email, undefined, private_key, GoogleCalendar.SCOPES);

    return new Promise((resolve, reject) => {
      client.authorize((error) => {
        if (error) {
          reject(error);
        } else {
          resolve(client);
        }
      });
    });
  }

  public async getEventsForNextSevenDays(calendarId: string | 'primary'): Promise<calendar_v3.Schema$Event[]> {
    if (!this.calendarClient) {
      throw new Error('Google Calendar client not initialized');
    }

    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const response = await this.calendarClient.events.list({
      calendarId: calendarId,
      timeMin: now.toISOString(),
      timeMax: weekFromNow.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;
    if (!events) {
      console.log('No upcoming events found.');
      return [];
    }
    return events;
  }

  // Filter all event IDs from events in the next 30 days, where the event Summary is in German language
  public async getEventIdsForNextThirtyDays(calendarId: string | 'primary'): Promise<GoogleCalendarEvent[]> {
    if (!this.calendarClient) {
      throw new Error('Google Calendar client not initialized');
    }

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const response = await this.calendarClient.events.list({
      calendarId: calendarId,
      timeMin: now.toISOString(),
      timeMax: thirtyDaysFromNow.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;
    if (!events) {
      console.log('No upcoming events found.');
      return [];
    }

    const abfallEvents: GoogleCalendarEvent[] = events
      .filter((event) => event.summary && werstoffEvents.includes(event.summary))
      .map((event): GoogleCalendarEvent => {
        if (!event.id || !event.summary) {
          throw new Error('Event ID or Summary is missing');
        }
        return { id: event.id, summary: event.summary };
      });

    return abfallEvents;
  }

  public async moveEventsToCalendar(eventIds: string[], targetCalendarId: string) {
    if (!this.calendarClient) {
      throw new Error('Google Calendar client not initialized');
    }

    const promises = eventIds.map((eventId) => {
      return this.calendarClient.events.move({
        calendarId: 'primary',
        eventId: eventId,
        destination: targetCalendarId,
      });
    });

    return Promise.all(promises);
  }
}
