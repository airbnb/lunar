import React from 'react';
import { storiesOf } from '@storybook/react';
import DateTimeRange from './DateTimeRange';

storiesOf('Core/DateTimeRange', module)
  .addParameters({
    inspectComponents: [DateTimeRange],
  })
  .add('Different day range.', () => (
    <DateTimeRange from={new Date(2019, 1, 15, 0, 0, 0)} to={new Date(2019, 1, 17, 0, 0, 0)} />
  ))
  .add('Different weeks range.', () => (
    <DateTimeRange from={new Date(2019, 2, 1, 0, 0, 0)} to={new Date(2019, 2, 21, 0, 0, 0)} />
  ))
  .add('Different months range.', () => (
    <DateTimeRange from={new Date(2019, 3, 1, 0, 0, 0)} to={new Date(2019, 5, 15, 0, 0, 0)} />
  ))
  .add('Different years range with custom separator.', () => (
    <DateTimeRange
      from={new Date(2019, 1, 1, 0, 0, 0)}
      to={new Date(2021, 1, 1, 0, 0, 0)}
      separator=" ~ "
    />
  ));
