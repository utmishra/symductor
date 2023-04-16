import { GoogleAuth } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { google } from 'googleapis';

// Create a new JWT client using the service account credentials
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_CALENDAR_CREDENTIALS_PATH,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

const jwtClient = auth.getClient() as unknown as GoogleAuth<JSONClient>;

// Authorize the JWT client and retrieve the access token
async function authorize() {
  return (await jwtClient).getAccessToken();
}

// Retrieve the calendar events using the authorized JWT client
async function getTodaysCalendarEvents() {
  const calendar = google.calendar({ version: 'v3', auth: jwtClient });
  const events = await calendar.events.list({
    calendarId: 'primary', // Replace with your calendar ID
    timeMin: new Date().toISOString(),
    maxResults: 10, // Limit to 10 events
    singleEvents: true,
    orderBy: 'startTime',
  });
  return events.data.items;
}

const getEvents = async () => {
  authorize().then(() => {
    getTodaysCalendarEvents().then((events) => {
      console.log(events);
    });
  });
};

module.exports = { getEvents };
