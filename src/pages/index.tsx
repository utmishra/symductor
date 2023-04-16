import Image from 'next/image';
import { Container, Row, Text, Col, Card } from '@nextui-org/react';
import { RescueTimeProductivityScore } from './components/rescuetime/';

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
        <Col span={9}>
          <Row justify='center' align='center'>
            <Col span={12}>
              <Text h1 style={{ textAlign: 'left' }}>
                Mission Control
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify='center' align='center'>
        <Col span={12}>
          <Card>
            <Card.Header>
              <Text h3>Productivity Score</Text>
            </Card.Header>
            <Card.Body>
              <RescueTimeProductivityScore />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
