import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DateTimeSelect from './DateTimeSelect';

storiesOf('Core/DateTimeSelect', module)
  .add('Standard select field for dates and times.', () => (
    <DateTimeSelect name="dts-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('With a compact smaller view.', () => (
    <>
      <DateTimeSelect name="dts-compact" label="Compact" onChange={action('onChange')} compact />
      <DateTimeSelect name="dts-regular" label="Regular" onChange={action('onChange')} />
    </>
  ))
  .add('With an invalid state.', () => (
    <DateTimeSelect name="dts-invalid" label="Label" onChange={action('onChange')} invalid />
  ))
  .add('With a disabled state and label description.', () => (
    <DateTimeSelect
      name="dts-disabled"
      label="Label"
      labelDescription="Please choose a date"
      onChange={action('onChange')}
      disabled
    />
  ))
  .add('With the year hidden.', () => (
    <DateTimeSelect name="dts-noyear" label="No year" onChange={action('onChange')} hideYear />
  ))
  .add('Or all dates hidden.', () => (
    <DateTimeSelect name="dts-nodate" label="Time" onChange={action('onChange')} hideDate />
  ))
  .add('Or all times hidden.', () => (
    <DateTimeSelect name="dts-notime" label="Date" onChange={action('onChange')} hideTime />
  ))
  .add('With 12-hour days instead of 24.', () => (
    <DateTimeSelect
      name="dts-12"
      label="12-hour clock"
      onChange={action('onChange')}
      enable12HourClock
    />
  ))
  .add('With inline label.', () => (
    <DateTimeSelect name="dts-notime" label="Date" onChange={action('onChange')} hideTime inline />
  ));
