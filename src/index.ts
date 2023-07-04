import { RescuetimeCommand } from './commands/rescuetime';
import prompt from 'prompt';
import dotenv from 'dotenv';

dotenv.config();

const schema = {
  properties: {
    command: {
      description: 'Enter command (rescuetime)',
      pattern: /^rescuetime$/,
      message: 'Command not found',
      required: true,
    },
    option: {
      description: 'Enter option (get-daily-activity)',
      pattern: /^get-daily-activity$/,
      message: 'Option not found',
      required: true,
    },
    perspective: {
      description: 'Enter perspective (rank or interval)',
      pattern: /^rank$|^interval$/,
      message: 'Perspective must be either rank or interval',
      required: true,
    },
    range: {
      description: 'Enter range (today, last 7 days, last week, last 15 days)',
      pattern: /^today$|^last 7 days$|^last week$|^last 15 days$/,
      message: 'Range must be either today, last 7 days, last week, or last 15 days',
      required: true,
    },
  },
};

prompt.start();

prompt.get(schema, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  if (process.env.RESCUETIME_API_KEY === undefined) {
    console.error('RESCUETIME_API_KEY is not defined');
    return;
  }

  if (result.perspective !== 'rank' && result.perspective !== 'interval') {
    console.error('Perspective must be either rank or interval');
    return;
  }

  if (!['today', 'last 7 days', 'last week', 'last 15 days'].includes(result.range as string)) {
    console.error('Range must be either today, last 7 days, last week, or last 15 days');
    return;
  }

  if (result.command === 'rescuetime') {
    const rescuetimeCommand = new RescuetimeCommand(process.env.RESCUETIME_API_KEY);
    rescuetimeCommand.getDailyActivity(result.perspective, result.range as string).then((data) => {
      console.log(data);
    });
  } else {
    console.error('Command not found');
  }
});
