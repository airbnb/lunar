import React from 'react';
import { storiesOf } from '@storybook/react';
import DateTimeRange from './DateTimeRange';

const date = new Date();
date.setDate(date.getDate() - 1);

const week = new Date();
week.setDate(week.getDate() - 14);

const month = new Date();
month.setMonth(month.getMonth() - 3);

const year = new Date();
year.setFullYear(year.getFullYear() - 2);

storiesOf('Core/DateTimeRange', module)
  .add('Different day range.', () => <DateTimeRange from={date} to={Date.now()} />)
  .add('Different weeks range.', () => <DateTimeRange from={week} to={Date.now()} />)
  .add('Different months range.', () => <DateTimeRange from={month} to={Date.now()} />)
  .add('Different years range with custom separator.', () => (
    <DateTimeRange from={year} to={Date.now()} separator=" ~ " />
  ));
