import React from 'react';
import Text from '../Text';
import Loader from '.';

export default {
  title: 'Core/Loader',
  parameters: {
    inspectComponents: [Loader],
  },
};

export function aLoaderAbsolutelyCenteredWithinAParent() {
  return (
    <div style={{ height: 100, position: 'relative' }}>
      <Loader />
    </div>
  );
}

aLoaderAbsolutelyCenteredWithinAParent.story = {
  name: 'A loader absolutely centered within a parent.',
};

export function aLoaderInline() {
  return (
    <Text>
      Content before the loader. <Loader inline /> Content after the loader.
    </Text>
  );
}

aLoaderInline.story = {
  name: 'A loader inline.',
};

export function withALargerSizePositionedStatically() {
  return <Loader static large />;
}

withALargerSizePositionedStatically.story = {
  name: 'With a larger size positioned statically.',
};
