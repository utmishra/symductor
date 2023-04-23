import Image from 'next/image';
import { Container, Row, Text, Col, Card, Grid } from '@nextui-org/react';
import { RescueTimeProductivityScore } from './rescuetime/RescueTimeProductivityScore';
import { RescueTimeActivities } from './rescuetime/RescueTimeActivities';

export default function Home() {
  return (
    <Container
      style={{
        background: '#cde2fe !important',
      }}
    >
      <Row justify='center' align='center'>
        <Col span={3}>
          <Image
            src='/images/logo.png'
            width={200}
            height={200}
            alt='Marvin Dashboard logo'
            style={{
              padding: '10px',
              margin: '20px',
            }}
          />
        </Col>
        <Col span={6}>
          <Row justify='center' align='center'>
            <Col span={12}>
              <Text h1 style={{ textAlign: 'center' }}>
                Mission Control
              </Text>
            </Col>
          </Row>
        </Col>
        <Col span={3}></Col>
      </Row>
      <Row justify='center' align='center'>
        <Col span={12}>
          <Card>
            <Card.Header>
              <Text h3 style={{ padding: '0.2rem' }}>
                Productivity Score
              </Text>
            </Card.Header>
            <Card.Body>
              <RescueTimeProductivityScore />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Grid.Container gap={1} justify='center'>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <RescueTimeActivities />
            </Grid>
          </Grid.Container>
        </Col>
      </Row>
    </Container>
  );
}
