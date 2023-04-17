import { Card, Row, Col, Progress, Tooltip } from '@nextui-org/react';
import { useRescueTimeData } from './repository';
import { useEffect, useState } from 'react';
import { RescueTimeApiResponse } from '@/types/rescuetime';
import { Error } from '@/types/error';

const renderProgressBar = (status: string, response?: RescueTimeApiResponse | undefined | null, error?: string) => {
  switch (status) {
    case 'success':
      if (response && response.data && response.data[0].productivity_pulse) {
        return <Progress value={response?.data[0].productivity_pulse} />;
      } else {
        return <Tooltip color='error' content='Something went wrong' />;
      }
    case 'error':
      return <Tooltip color='error' content={error} />;
    case 'loading':
      return <Progress indeterminated />;
    default:
      return <Progress indeterminated />;
  }
};

export const RescueTimeProductivityScore = () => {
  const { data, isLoading, isError } = useRescueTimeData();
  const [cardType, setCardType] = useState('loading');

  if (isError) {
    setCardType('error');
  }

  useEffect(() => {
    if (data) {
      setCardType('success');
    } else if (isLoading) {
      setCardType('loading');
    } else if (isError) {
      setCardType('error');
    }
  }, [data]);

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
