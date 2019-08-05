import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DateTimeSelect from './DateTimeSelect';

const fixedDate = new Date(2019, 1, 1, 10, 10, 10);

storiesOf('Core/DateTimeSelect', module)
  .addParameters({
    inspectComponents: [DateTimeSelect],
  })
  .add('Standard select field for dates and times.', () => (
    <DateTimeSelect
      name="dts-basic"
      label="Label"
      onChange={action('onChange')}
      value={fixedDate}
    />
  ))
  .add('With a compact smaller view.', () => (
    <>
      <DateTimeSelect
        name="dts-compact"
        label="Compact"
        onChange={action('onChange')}
        value={fixedDate}
        compact
      />
      <DateTimeSelect
        name="dts-regular"
        label="Regular"
        onChange={action('onChange')}
        value={fixedDate}
      />
    </>
  ))
  .add('With an invalid state.', () => (
    <DateTimeSelect
      name="dts-invalid"
      label="Label"
      onChange={action('onChange')}
      value={fixedDate}
      invalid
    />
  ))
  .add('With a disabled state and label description.', () => (
    <DateTimeSelect
      name="dts-disabled"
      label="Label"
      labelDescription="Please choose a date"
      onChange={action('onChange')}
      value={fixedDate}
      disabled
    />
  ))
  .add('With the year hidden.', () => (
    <DateTimeSelect
      name="dts-noyear"
      label="No year"
      onChange={action('onChange')}
      value={fixedDate}
      hideYear
    />
  ))
  .add('Or all dates hidden.', () => (
    <DateTimeSelect
      name="dts-nodate"
      label="Time"
      onChange={action('onChange')}
      value={fixedDate}
      hideDate
    />
  ))
  .add('Or all times hidden.', () => (
    <DateTimeSelect
      name="dts-notime"
      label="Date"
      onChange={action('onChange')}
      value={fixedDate}
      hideTime
    />
  ))
  .add('With 12-hour days instead of 24.', () => (
    <DateTimeSelect
      name="dts-12"
      label="12-hour clock"
      onChange={action('onChange')}
      value={fixedDate}
      enable12HourClock
    />
  ))
  .add('With inline label.', () => (
    <DateTimeSelect
      name="dts-notime"
      label="Date"
      onChange={action('onChange')}
      value={fixedDate}
      hideTime
      inline
    />
  ));
