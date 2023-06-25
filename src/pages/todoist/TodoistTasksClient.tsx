import { Tooltip, Table } from '@nextui-org/react';
import { useTodoistTasks } from './hook';
import { TodoistTask, TodoistTaskRows, TodoistTasks } from '@/types/todoist';

const TodoistTasksClient = () => {
  const { data: tasks, isLoading, isError }: { data: null | TodoistTasks; isLoading: boolean; isError: string } = useTodoistTasks();

  let tableContent: TodoistTaskRows = {
    today: <></>,
    thisWeek: <></>,
    nextWeek: <></>,
    overdue: <></>,
  };

  const tableRows = () => {
    if (tasks != null) {
      const taskTypes = Object.keys(tasks) as (keyof TodoistTasks)[];
      taskTypes.forEach((range) => {
        if (tasks != null && !tasks[range]) {
          tableContent[range] = (
            <Table.Row>
              <Table.Cell>no data...</Table.Cell>
              <Table.Cell>no data...</Table.Cell>
            </Table.Row>
          );
        } else {
          const currentTaskRows = tasks[range] as TodoistTask[];
          return currentTaskRows.map((task: TodoistTask) => (
            <Table.Row key={task.id}>
              <Table.Cell>{task.content}</Table.Cell>
              <Table.Cell>{task.priority}</Table.Cell>
            </Table.Row>
          ));
        }
      });
    }
    return tableContent;
  };

  if (isLoading) {
    const loadingContent = (
      <Table.Row>
        <Table.Cell>loading...</Table.Cell>
        <Table.Cell> - </Table.Cell>
      </Table.Row>
    );
    tableContent = {
      today: loadingContent,
      thisWeek: loadingContent,
      nextWeek: loadingContent,
      overdue: loadingContent,
    };
  } else if (isError) {
    const errorContent = (
      <Table.Row>
        <Table.Cell>⛔️ Oops! Unable to load RescueTime activities ⛔️</Table.Cell>
        <Table.Cell> - </Table.Cell>
        <Table.Cell> - </Table.Cell>
      </Table.Row>
    );
    tableContent = {
      today: errorContent,
      thisWeek: errorContent,
      nextWeek: errorContent,
      overdue: errorContent,
    };
  } else {
    tableContent = tableRows();
  }

  return (Object.keys(tableContent) as (keyof TodoistTasks)[]).map((range) => (
    <Table
      aria-label={`${range} tasks`}
      css={{
        height: '500px',
        minWidth: '500px',
      }}
      key={range}
    >
      <Table.Header>
        <Table.Column>Task</Table.Column>
        <Table.Column>Priority</Table.Column>
      </Table.Header>
      <Table.Body>{tableContent && tableContent[range] ? tableContent[range] : <Tooltip color='error' content='Something went wrong!' />}</Table.Body>
    </Table>
  ));
};

export default TodoistTasksClient;
