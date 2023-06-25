import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';
import * as util from 'util';
import { DateTime } from 'luxon';

const readFile = util.promisify(fs.readFile);

export class GoogleCalendar {
  private static SCOPES = ['https://www.googleapis.com/auth/calendar'];
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

  public async moveAbfallEventsToWerstoffCalendar(
    startDate: string,
    endDate: string,
    sourceCalendarId: string | 'primary',
    targetCalendarId: string,
  ): Promise<{ status: 200 | 500 | 400 | 401; message: string }> {
    if (!this.calendarClient) {
      throw new Error('Google Calendar client not initialized');
    }

    const abfalleventKeyWords = [
      'Kehricht',
      'Grüngut',
      'Karton',
      'Papier',
      'Kompostabgabe',
      'Häckselaktion',
      'Frühjahr',
      'Herbst',
      'Sonderabfallmobil',
      'Hauptsammelstelle',
      'geschlossen',
      'Tour',
      'Öki-Bus',
      'fällt',
      'aus',
      'Nachmittag',
    ];
    const startTime = DateTime.fromFormat(startDate, 'yyyy-MM-dd');
    const endTime = DateTime.fromFormat(endDate, 'yyyy-MM-dd');

    const response = await this.calendarClient.events.list({
      calendarId: sourceCalendarId,
      timeMin: startTime.toISO() as string,
      timeMax: endTime.toISO() as string,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const calendarEvents = response.data.items;
    if (calendarEvents && calendarEvents !== undefined && calendarEvents.length > 0) {
      const abfallEvents = calendarEvents.filter((event): event is calendar_v3.Schema$Event => {
        return (
          typeof event.summary === 'string' &&
          abfalleventKeyWords.some((keyword) => (event && event.summary != null ? event.summary.includes(keyword) : false))
        );
      });

      await this.moveEventsToCalendar(abfallEvents, sourceCalendarId, targetCalendarId);
      return {
        status: 200,
        message: `Moved ${abfallEvents.length} events from ${sourceCalendarId} to ${targetCalendarId}`,
      };
    } else {
      return {
        status: 500,
        message: 'Something went wrong while fetching events from Google Calendar',
      };
    }
  }

  public async moveEventsToCalendar(events: calendar_v3.Schema$Event[], sourceCalendarId: string, targetCalendarId: string) {
    if (!this.calendarClient) {
      throw new Error('Google Calendar client not initialized');
    }

    const batchSize = 50;
    const batches = [];
    for (let i = 0; i < events.length; i += batchSize) {
      batches.push(events.slice(i, i + batchSize));
    }

    const moveResponse = [];
    for (const batch of batches) {
      for (const event of batch) {
        console.info('------------------------------------------------');
        console.info(`Moving event ${event.id}: ${event.summary} to ${targetCalendarId}`);
        if (event.id != null) {
          try {
            const currentMoveResponse = await this.calendarClient.events.move({
              calendarId: sourceCalendarId,
              eventId: event.id,
              destination: targetCalendarId,
            });
          } catch (error) {
            console.error(error);
            console.error('!!!SKIPPED!!!');
          }
          console.info('MOVED!!!!');
        } else {
          console.info('SKIPPED!!!!');
        }
        console.info('------------------------------------------------');
      }
    }
  }

  public async getEventsForNextSevenDays(calendarId: string) {
    const startTime = DateTime.now();
    const endTime = startTime.plus({ days: 7 });

    const response = await this.calendarClient.events.list({
      calendarId: calendarId,
      timeMin: startTime.toISO() as string,
      timeMax: endTime.toISO() as string,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items;
  }
}
