import React from 'react';
import { storiesOf } from '@storybook/react';
import DateTime from './DateTime';

const future = new Date();
future.setDate(future.getDate() + 12);

storiesOf('Core/DateTime', module)
  .add('Micro timestamp.', () => <DateTime at={Date.now()} micro />)
  .add('Short timestamp.', () => <DateTime at={Date.now()} short />)
  .add('Medium timestamp.', () => <DateTime at={Date.now()} medium />)
  .add('Long timestamp.', () => <DateTime at={Date.now()} long />)
  .add('Long timestamp without time.', () => <DateTime at={Date.now()} long noTime noTimezone />)
  .add('Relative timestamp.', () => <DateTime at={future} relative />)
  .add('Custom format.', () => <DateTime at={Date.now()} format="MM/dd/yyyy" />)
  .add('Using static method.', () => <div>{DateTime.format({ at: Date.now(), long: true })}</div>);
