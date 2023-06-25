import { Button, Loading, Tooltip } from '@nextui-org/react';
import { MoveEvent } from '../../rescuetime/types';

const StatusBasedButton = (props: { state: 'na' | 'in_progress' | 'successful' | 'failed'; moveEvents: MoveEvent }) => {
  return (
    <>
      <Button
        style={{
          marginTop: '1rem',
        }}
        onClick={() => {
          props.moveEvents('in_progress');
        }}
      >
        {props.state === 'na' && 'Move Events'}
        {props.state === 'in_progress' && <Loading />}
        {props.state === 'failed' && <Tooltip color='error' content='Something went wrong' />}
        {props.state === 'successful' && <Tooltip color='success' content='Events moved successfully' />}
      </Button>
    </>
  );
};

export { StatusBasedButton };
