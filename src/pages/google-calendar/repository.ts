import useFetch from '@/services/useFetch';
import { GoogleCalendarEventsHookResponse, GoogleCalendarsHookResponse, RequestType } from '../rescuetime/types';

const API_URL = {
  events: '/api/google-calendar/abfall-events',
  calendars: '/api/google-calendar/all-calendars',
};

export const useGoogleCalendarApi = (type: RequestType): GoogleCalendarEventsHookResponse | GoogleCalendarsHookResponse => {
  const { data, error } = useFetch(API_URL[type]);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
