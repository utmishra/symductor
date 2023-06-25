import { Container, Row, Col, Text, Table, Checkbox } from '@nextui-org/react';
import { GoogleCalendarEvent, HandleEventSelect } from '../../rescuetime/types';

const EventsToMove = (props: { calendarEvents: GoogleCalendarEvent[]; handleSelect: HandleEventSelect }) => {
  return (
    <>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Row justify='center' align='center'>
          <Col span={12}>
            <Text
              style={{
                fontSize: '4rem',
              }}
            >
              Abfall Calendar Events
            </Text>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Cell>Selected</Table.Cell>
                  <Table.Cell>Event Name</Table.Cell>
                  <Table.Cell>Event ID</Table.Cell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {props.calendarEvents.map((event: GoogleCalendarEvent) => (
                  <Table.Row key={event.id}>
                    <Table.Cell>
                      <Checkbox
                        key={event.id}
                        onChange={(checked) => {
                          props.handleSelect(event.id, checked);
                        }}
                        isSelected
                      />
                    </Table.Cell>
                    <Table.Cell>{event.summary}</Table.Cell>
                    <Table.Cell>{event.id}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export { EventsToMove };
