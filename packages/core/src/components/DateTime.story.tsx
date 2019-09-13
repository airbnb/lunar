import React from 'react';
import { storiesOf } from '@storybook/react';
import DateTime from './DateTime';

const future = new Date();
future.setDate(future.getDate() + 12);

const fixedDate = new Date(2019, 1, 1, 0, 0, 0);

storiesOf('Core/DateTime', module)
  .addParameters({
    inspectComponents: [DateTime],
  })
  .add('Micro timestamp.', () => <DateTime micro at={fixedDate} />)
  .add('Short timestamp.', () => <DateTime short at={fixedDate} />)
  .add('Medium timestamp.', () => <DateTime medium at={fixedDate} />)
  .add('Long timestamp.', () => <DateTime long at={fixedDate} />)
  .add('Long timestamp without time.', () => <DateTime long noTime noTimezone at={fixedDate} />)
  .add('Relative timestamp.', () => <DateTime relative at={future} />, { happo: false })
  .add('Custom format.', () => <DateTime at={fixedDate} format="MM/dd/yyyy" />)
  .add('Using static method.', () => <div>{DateTime.format({ at: fixedDate, long: true })}</div>);
