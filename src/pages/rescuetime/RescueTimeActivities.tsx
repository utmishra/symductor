import { Table } from '@nextui-org/react';
import { useRescueTimeData } from './hook';
import { RescueTimeActivity, RescueTimeActivityResponse } from '@/types/rescuetime';

export const RescueTimeActivities = () => {
  const { data: activities, isLoading, isError }: RescueTimeActivityResponse = useRescueTimeData('activities');

  const tableRows = () => {
    console.log('Activities: ', activities);
    if (!activities) {
      return (
        <Table.Row>
          <Table.Cell>no data...</Table.Cell>
        </Table.Row>
      );
    }
    const activitiesWithRows = activities as RescueTimeActivity;
    return activitiesWithRows.rows.map((activity: (string | number)[]) => (
      <Table.Row key={activity[1]}>
        <Table.Cell>{activity[1]}</Table.Cell>
        <Table.Cell>{activity[0]}</Table.Cell>
        <Table.Cell>{activity[2]}</Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <Table>
      <Table.Header>
        <Table.Column>
          <Table.Cell>Activity</Table.Cell>
          <Table.Cell>Time</Table.Cell>
          <Table.Cell>Productivity</Table.Cell>
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {isLoading ? (
          <Table.Row>
            <Table.Cell>loading...</Table.Cell>
          </Table.Row>
        ) : isError ? (
          <Table.Row>
            <Table.Cell>error...</Table.Cell>
          </Table.Row>
        ) : (
          tableRows()
        )}
      </Table.Body>
    </Table>
  );
};
