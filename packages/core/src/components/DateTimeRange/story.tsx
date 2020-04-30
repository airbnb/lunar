import React from 'react';
import DateTimeRange from '.';

export default {
  title: 'Core/DateTimeRange',
  parameters: {
    inspectComponents: [DateTimeRange],
  },
};

export function differentDayRange() {
  return (
    <DateTimeRange from={new Date(2019, 1, 15, 0, 0, 0)} to={new Date(2019, 1, 17, 0, 0, 0)} />
  );
}

differentDayRange.story = {
  name: 'Different day range.',
};

export function differentWeeksRange() {
  return <DateTimeRange from={new Date(2019, 2, 1, 0, 0, 0)} to={new Date(2019, 2, 21, 0, 0, 0)} />;
}

differentWeeksRange.story = {
  name: 'Different weeks range.',
};

export function differentMonthsRange() {
  return <DateTimeRange from={new Date(2019, 3, 1, 0, 0, 0)} to={new Date(2019, 5, 15, 0, 0, 0)} />;
}

differentMonthsRange.story = {
  name: 'Different months range.',
};

export function differentYearsRangeWithCustomSeparator() {
  return (
    <DateTimeRange
      from={new Date(2019, 1, 1, 0, 0, 0)}
      to={new Date(2021, 1, 1, 0, 0, 0)}
      separator=" ~ "
    />
  );
}

differentYearsRangeWithCustomSeparator.story = {
  name: 'Different years range with custom separator.',
};

export function withAnInvalidValues() {
  return (
    <div>
      <div>
        Invalid from: <DateTimeRange from="[Hidden]" to={new Date(2019, 1, 17, 0, 0, 0)} />
      </div>

      <div>
        Invalid to: <DateTimeRange from={new Date(2019, 1, 15, 0, 0, 0)} to="[Hidden]" />
      </div>

      <div>
        Both invalid: <DateTimeRange from="[Hidden]" to="[Hidden]" />
      </div>
    </div>
  );
}

withAnInvalidValues.story = {
  name: 'Fallback when an invalid date values are provided.',
};
