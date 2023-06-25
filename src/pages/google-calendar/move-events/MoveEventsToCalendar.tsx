import { Col, Container, Dropdown, Loading, Row, Tooltip } from '@nextui-org/react';
import { EventsToMove } from '../components/EventsToMove';
import { useGoogleCalendarApi } from '../repository';
import { GoogleCalendar, GoogleCalendarEvent } from '../../rescuetime/types';
import { useEffect, useState } from 'react';
import { StatusBasedButton } from '../components/StatusBasedButton';

const moveEventsToCalendarApi = '/api/google-calendar/move-events';

const MoveEventsToCalendar = () => {
  const { data: calendars, isLoading: areCalendarsLoading, isError: isCalendarsError } = useGoogleCalendarApi('calendars');
  const { data: calendarEvents, isLoading: areEventsLoading, isError: isEventsError } = useGoogleCalendarApi('events');
  const [selectedCalendar, setSelectedCalendar] = useState<string>('primary');
  const [selectedEvents, setSelectedEvents] = useState<{ id: string; checked: boolean }[]>([]);
  const [eventsMoved, setEventsMoved] = useState<'na' | 'in_progress' | 'successful' | 'failed'>('na');

  const moveEvents = async () => {
    setEventsMoved('in_progress');
  };

  useEffect(() => {
    if (eventsMoved == 'in_progress') {
      const selectedEventIds = selectedEvents.map((event) => event.id);
      // fetch call sending selectedEventIds to backend via post with eventIds and calendarId as body
      fetch(moveEventsToCalendarApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventIds: selectedEventIds,
          calendarId: selectedCalendar,
        }),
      })
        .then(() => {
          setEventsMoved('successful');
        })
        .catch((error) => {
          console.log(error);
          setEventsMoved('failed');
        });
    } else if (eventsMoved == 'successful') {
      setEventsMoved('successful');
    } else if (eventsMoved == 'failed') {
      setEventsMoved('failed');
    } else {
      setEventsMoved('na');
    }
  }, [eventsMoved]);

  useEffect(() => {
    if (calendarEvents) {
      const allEvents = calendarEvents.map((event) => {
        return { id: event.id, checked: true };
      });
      setSelectedEvents(allEvents);
    }
  }, [calendarEvents]);

  const handleEventsSelect = (changedEventId: string, checked: boolean) => {
    const selectedEventIds = selectedEvents.map((event) => event.id);
    if (selectedEventIds.includes(changedEventId)) {
      setSelectedEvents(selectedEvents.filter((event) => event.id !== changedEventId));
    } else {
      setSelectedEvents([...selectedEvents, { id: changedEventId, checked }]);
    }
  };

  return (
    <>
      <Container
        style={{
          padding: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Row justify='center' align='center'>
          <Col span={12}>
            {areEventsLoading ? (
              <Loading />
            ) : isEventsError ? (
              <Tooltip color='error' content='Something went wrong while loading calendar events' />
            ) : calendarEvents ? (
              <EventsToMove calendarEvents={calendarEvents as GoogleCalendarEvent[] | []} handleSelect={handleEventsSelect} />
            ) : (
              <Tooltip color='error' content='Something went wrong while loading calendar events' />
            )}
          </Col>
        </Row>
        {areCalendarsLoading ? (
          <Loading />
        ) : isCalendarsError ? (
          <Tooltip color='error' content='Unable to load list of Calendars' />
        ) : calendars ? (
          <Dropdown>
            <Dropdown.Button>Select Calendar</Dropdown.Button>
            <Dropdown.Menu onAction={(key) => setSelectedCalendar(key as string)}>
              {(calendars as GoogleCalendar[] | []).map((calendar) => (
                <Dropdown.Item key={calendar.id}>{calendar.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Tooltip color='error' content='Unable to load list of Calendars' />
        )}
        <StatusBasedButton state={eventsMoved} moveEvents={moveEvents} />
      </Container>
    </>
  );
};

export { MoveEventsToCalendar };
