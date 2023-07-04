import { Table } from '@nextui-org/react';
import { useRescueTimeData } from './hook';
import { RescueTimeActivity, RescueTimeActivityResponse } from '@/types/rescuetime';
import { Duration } from 'luxon';

const RescueTimeActivitiesClient = () => {
  const { data: activities, isLoading, isError }: RescueTimeActivityResponse = useRescueTimeData('activities');

  const tableRows = () => {
    if (!activities) {
      return (
        <Table.Row>
          <Table.Cell>no data...</Table.Cell>
          <Table.Cell>no data...</Table.Cell>
          <Table.Cell>no data...</Table.Cell>
        </Table.Row>
      );
    }
    const activitiesWithRows = activities as RescueTimeActivity;
    return activitiesWithRows.rows.map((activity: (string | number)[]) => (
      <Table.Row key={activity[1]}>
        <Table.Cell>{activity[3]}</Table.Cell>
        <Table.Cell>
          {typeof activity[1] === 'number' ? Duration.fromObject({ seconds: activity[1] }).toFormat('hh:mm:ss') : '-'}({activity[1]})
        </Table.Cell>
        <Table.Cell>{activity[5]}</Table.Cell>
      </Table.Row>
    ));
  };

  let tableContent;

  if (isLoading) {
    tableContent = (
      <Table.Row>
        <Table.Cell>loading...</Table.Cell>
        <Table.Cell> - </Table.Cell>
        <Table.Cell> - </Table.Cell>
      </Table.Row>
    );
  } else if (isError) {
    tableContent = (
      <Table.Row>
        <Table.Cell>⛔️ Oops! Unable to load RescueTime activities ⛔️</Table.Cell>
        <Table.Cell> - </Table.Cell>
        <Table.Cell> - </Table.Cell>
      </Table.Row>
    );
  } else {
    tableContent = tableRows();
  }

  return (
    <Table
      aria-label='My current activities'
      css={{
        height: '500px',
        minWidth: '500px',
      }}
    >
      <Table.Header>
        <Table.Column>Activity</Table.Column>
        <Table.Column>Time</Table.Column>
        <Table.Column>Productivity</Table.Column>
      </Table.Header>
      <Table.Body>{tableContent}</Table.Body>
      <Table.Pagination shadow noMargin align='center' rowsPerPage={10} />
    </Table>
  );
};

export default RescueTimeActivitiesClient;
