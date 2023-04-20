import { Card, Row, Col, Progress, Tooltip, Grid, NormalColors } from '@nextui-org/react';
import { useRescueTimeData } from './hook';
import { useMemo } from 'react';
import { RescueTimeDailySummaryFeed } from '@/types/rescuetime';

const getProgressColor = (value: number): NormalColors => {
  switch (true) {
    case value < 60:
      return 'error';
    case value < 75:
      return 'warning';
    case value < 90:
      return 'primary';
    default:
      return 'success';
  }
};

const renderProgressBar = (status: string, productivityScore: number | null, error?: string) => {
  switch (status) {
    case 'success':
      if (productivityScore !== null) {
        return <Progress color={getProgressColor(productivityScore)} striped value={productivityScore} />;
      } else {
        return <Tooltip color='error' content={error} />;
      }
    case 'error':
      return <Tooltip color='error' content={error} />;
    case 'loading':
      return <Progress striped indeterminated />;
    default:
      return <Progress striped indeterminated />;
  }
};

const thisWeekOrLastWeekScore = (data: RescueTimeDailySummaryFeed[]): number => {
  const itsEarlyWeek = new Date().getDay() < 4;
  if (itsEarlyWeek) {
    return data.slice(1, 8).reduce((acc, curr) => acc + curr.productivity_pulse, 0) / (data.length - 1);
  } else {
    return Math.floor(
      data
        .filter((currentData) => {
          return new Date(currentData.date).getDay() > 3;
        })
        .reduce((acc, curr) => acc + curr.productivity_pulse, 0) / data.length,
    );
  }
};

const thisMonthScore = (data: RescueTimeDailySummaryFeed[]): number => {
  return Math.floor(data.reduce((acc, curr) => acc + curr.productivity_pulse, 0) / data.length);
};

export const RescueTimeProductivityScore = () => {
  const { data, isLoading, isError }: { data: null | RescueTimeDailySummaryFeed[]; isLoading: boolean; isError: string } = useRescueTimeData();

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
    <>
      <Grid.Container gap={1} justify='center'>
        <Grid md={3}>
          <Card>
            <Card.Header>
              <span style={{ fontSize: '1.3rem' }}>Today: </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {data !== null && data[0] ? Math.floor(data[0]['productivity_pulse']) : ''}%
              </span>
            </Card.Header>
            <Card.Body>
              <Row justify='center' align='center'>
                <Col span={12}>
                  {renderProgressBar(
                    data !== null && data[0] ? cardType : 'error',
                    data !== null && data[0] ? data[0]['productivity_pulse'] : null,
                    isError,
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid md={3}>
          <Card>
            <Card.Header>
              <span style={{ fontSize: '1.3rem' }}>{new Date().getDay() < 4 ? 'this week' : 'last week'}</span>:{' '}
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data !== null ? thisWeekOrLastWeekScore(data) : ''}%</span>
            </Card.Header>
            <Card.Body>
              <Row justify='center' align='center'>
                <Col span={12}>{renderProgressBar(cardType, data !== null && data[0] ? thisWeekOrLastWeekScore(data) : null, isError)}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid md={3}>
          <Card>
            <Card.Header>
              <span style={{ fontSize: '1.3rem' }}>This month: </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{data !== null ? thisMonthScore(data) : ''}%</span>
            </Card.Header>
            <Card.Body>
              <Row justify='center' align='center'>
                <Col span={12}>{renderProgressBar(cardType, data !== null && data[0] ? thisMonthScore(data) : null, isError)}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
};
