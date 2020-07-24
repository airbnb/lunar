import React from 'react';
import DateTimeSelect from '.';

const fixedDate = new Date(2019, 1, 1, 10, 10, 10);

export default {
  title: 'Core/DateTimeSelect',
  parameters: {
    inspectComponents: [DateTimeSelect],
  },
};

export function standardSelectFieldForDatesAndTimes() {
  return (
    <DateTimeSelect
      name="dts-basic"
      label="Label"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

standardSelectFieldForDatesAndTimes.story = {
  name: 'Standard select field for dates and times.',
};

export function inDifferentSizes() {
  return (
    <>
      <DateTimeSelect
        small
        name="dts-small"
        label="Small"
        value={fixedDate}
        onChange={() => console.log('onChange')}
      />
      <DateTimeSelect
        name="dts-regular"
        label="Regular"
        value={fixedDate}
        onChange={() => console.log('onChange')}
      />
      <DateTimeSelect
        large
        name="dts-large"
        label="Large"
        value={fixedDate}
        onChange={() => console.log('onChange')}
      />
    </>
  );
}

inDifferentSizes.story = {
  name: 'In different sizes.',
};

export function withAnInvalidState() {
  return (
    <DateTimeSelect
      invalid
      name="dts-invalid"
      label="Label"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

withAnInvalidState.story = {
  name: 'With an invalid state.',
};

export function withADisabledStateAndLabelDescription() {
  return (
    <DateTimeSelect
      disabled
      name="dts-disabled"
      label="Label"
      labelDescription="Please choose a date"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

withADisabledStateAndLabelDescription.story = {
  name: 'With a disabled state and label description.',
};

export function withTheYearHidden() {
  return (
    <DateTimeSelect
      hideYear
      name="dts-noyear"
      label="No year"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

withTheYearHidden.story = {
  name: 'With the year hidden.',
};

export function orAllDatesHidden() {
  return (
    <DateTimeSelect
      hideDate
      name="dts-nodate"
      label="Time"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

orAllDatesHidden.story = {
  name: 'Or all dates hidden.',
};

export function orAllTimesHidden() {
  return (
    <DateTimeSelect
      hideTime
      name="dts-notime"
      label="Date"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

orAllTimesHidden.story = {
  name: 'Or all times hidden.',
};

export function with12HourDaysInsteadOf24() {
  return (
    <DateTimeSelect
      enable12HourClock
      name="dts-12"
      label="12-hour clock"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

with12HourDaysInsteadOf24.story = {
  name: 'With 12-hour days instead of 24.',
};

export function withInlineLabel() {
  return (
    <DateTimeSelect
      hideTime
      inline
      name="dts-notime"
      label="Date"
      value={fixedDate}
      onChange={() => console.log('onChange')}
    />
  );
}

withInlineLabel.story = {
  name: 'With inline label.',
};

export function withInvalidDate() {
  return (
    <DateTimeSelect
      name="dts-basic"
      label="Label"
      value="[Hidden]"
      onChange={() => console.log('onChange')}
    />
  );
}

withInvalidDate.story = {
  name: "Fallback to today's date if value is invalid",
  parameters: { happo: false },
};
