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
      value={fixedDate}
      onChange={action('onChange')}
    />
  ))
  .add('With a compact smaller view.', () => (
    <>
      <DateTimeSelect
        compact
        name="dts-compact"
        label="Compact"
        value={fixedDate}
        onChange={action('onChange')}
      />
      <DateTimeSelect
        name="dts-regular"
        label="Regular"
        value={fixedDate}
        onChange={action('onChange')}
      />
    </>
  ))
  .add('With an invalid state.', () => (
    <DateTimeSelect
      invalid
      name="dts-invalid"
      label="Label"
      value={fixedDate}
      onChange={action('onChange')}
    />
  ))
  .add('With a disabled state and label description.', () => (
    <DateTimeSelect
      disabled
      name="dts-disabled"
      label="Label"
      labelDescription="Please choose a date"
      value={fixedDate}
      onChange={action('onChange')}
    />
  ))
  .add('With the year hidden.', () => (
    <DateTimeSelect
      hideYear
      name="dts-noyear"
      label="No year"
      value={fixedDate}
      onChange={action('onChange')}
    />
  ))
  .add('Or all dates hidden.', () => (
    <DateTimeSelect
      hideDate
      name="dts-nodate"
      label="Time"
      value={fixedDate}
      onChange={action('onChange')}
    />
  ))
  .add('Or all times hidden.', () => (
    <DateTimeSelect
      hideTime
      name="dts-notime"
      label="Date"
      value={fixedDate}
      onChange={action('onChange')}
    />
  ))
  .add('With 12-hour days instead of 24.', () => (
    <DateTimeSelect
      enable12HourClock
      name="dts-12"
      label="12-hour clock"
      value={fixedDate}
      onChange={action('onChange')}
    />
  ))
  .add('With inline label.', () => (
    <DateTimeSelect
      hideTime
      inline
      name="dts-notime"
      label="Date"
      value={fixedDate}
      onChange={action('onChange')}
    />
  ));
