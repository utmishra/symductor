import { Dispatch, SetStateAction } from 'react';

export type RequestType = 'events' | 'calendars';

export type GoogleCalendarEvent = {
  id: string;
  summary: string;
};

export type GoogleCalendar = {
  id: string;
  name: string;
};

export type GoogleCalendarEventsHookResponse = {
  data?: GoogleCalendarEvent[] | null;
  isLoading: boolean;
  isError: boolean;
};

export type GoogleCalendarsHookResponse = {
  data: GoogleCalendar[] | null;
  isLoading: boolean;
  isError: string | boolean | null;
};

export type HandleEventSelect = (changedEventId: string, checkedId: boolean) => void;
export type MoveEvent = Dispatch<SetStateAction<'na' | 'in_progress' | 'successful' | 'failed'>>;
