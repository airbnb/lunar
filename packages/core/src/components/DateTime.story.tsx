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
  .add('Micro timestamp.', () => <DateTime at={fixedDate} micro />)
  .add('Short timestamp.', () => <DateTime at={fixedDate} short />)
  .add('Medium timestamp.', () => <DateTime at={fixedDate} medium />)
  .add('Long timestamp.', () => <DateTime at={fixedDate} long />)
  .add('Long timestamp without time.', () => <DateTime at={fixedDate} long noTime noTimezone />)
  .add('Relative timestamp.', () => <DateTime at={future} relative />, { happo: false })
  .add('Custom format.', () => <DateTime at={fixedDate} format="MM/dd/yyyy" />)
  .add('Using static method.', () => <div>{DateTime.format({ at: fixedDate, long: true })}</div>);
