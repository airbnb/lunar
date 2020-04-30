import React from 'react';
import DateTime from '.';
import Empty from '../Empty';

const future = new Date();
future.setDate(future.getDate() + 12);

const fixedDate = new Date(2019, 1, 1, 0, 0, 0);

export default {
  title: 'Core/DateTime',
  parameters: {
    inspectComponents: [DateTime],
  },
};

export function microTimestamp() {
  return <DateTime micro at={fixedDate} />;
}

microTimestamp.story = {
  name: 'Micro timestamp.',
};

export function shortTimestamp() {
  return <DateTime short at={fixedDate} />;
}

shortTimestamp.story = {
  name: 'Short timestamp.',
};

export function mediumTimestamp() {
  return <DateTime medium at={fixedDate} />;
}

mediumTimestamp.story = {
  name: 'Medium timestamp.',
};

export function longTimestamp() {
  return <DateTime long at={fixedDate} />;
}

longTimestamp.story = {
  name: 'Long timestamp.',
};

export function longTimestampWithoutTime() {
  return <DateTime long noTime noTimezone at={fixedDate} />;
}

longTimestampWithoutTime.story = {
  name: 'Long timestamp without time.',
};

export function relativeTimestamp() {
  return <DateTime relative at={future} />;
}

relativeTimestamp.story = {
  name: 'Relative timestamp.',
  parameters: { happo: false },
};

export function customFormat() {
  return <DateTime at={fixedDate} format="MM/dd/yyyy" />;
}

customFormat.story = {
  name: 'Custom format.',
};

export function usingStaticMethod() {
  return <div>{DateTime.format({ at: fixedDate, long: true })}</div>;
}

usingStaticMethod.story = {
  name: 'Using static method.',
};

export function withAnInvalidAtValue() {
  return (
    <div>
      <div>
        Component fallback: <DateTime at="[Hidden]" />
      </div>

      <div>Static method with fallback: {DateTime.format({ at: '[Hidden]', long: true })}</div>

      <div>
        Static method with custom fallback:{' '}
        {DateTime.format({ at: '[Hidden]', long: true }) || <Empty />}
      </div>
    </div>
  );
}

withAnInvalidAtValue.story = {
  name: 'Fallback when an invalid date value is provided.',
};
