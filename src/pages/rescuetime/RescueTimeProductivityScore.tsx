import { Card, Row, Col, Progress, Tooltip } from '@nextui-org/react';
import { useRescueTimeData } from './hook';
import { useMemo } from 'react';
import { RescueTimeDailySummaryFeed } from '@/types/rescuetime';

const renderProgressBar = (status: string, data?: RescueTimeDailySummaryFeed[] | undefined | null, error?: string) => {
  switch (status) {
    case 'success':
      if (data && data[0].productivity_pulse) {
        return <Progress striped value={data[0].productivity_pulse} />;
      } else {
        return <Tooltip color='error' content='Something went wrong' />;
      }
    case 'error':
      return <Tooltip color='error' content={error} />;
    case 'loading':
      return <Progress striped indeterminated />;
    default:
      return <Progress striped indeterminated />;
  }
};

export const RescueTimeProductivityScore = () => {
  const { data, isLoading, isError } = useRescueTimeData();

  const cardType = useMemo(() => {
    if (isError) {
      return 'error';
    } else if (isLoading) {
      return 'loading';
    } else if (data) {
      return 'success';
    } else {
      return 'loading';
    }
  }, [data, isLoading, isError]);

  return (
    <Card>
      <Card.Header>Your Productivity Score today</Card.Header>
      <Card.Body>
        <Row justify='center' align='center'>
          <Col span={12}>{renderProgressBar(cardType, data, isError)}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
