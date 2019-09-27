import React from 'react';
import lunar from ':storybook/images/lunar-logo.png';
import Shimmer from '../Shimmer';
import ResponsiveImage from '.';

export default {
  title: 'Core/ResponsiveImage',
  parameters: {
    inspectComponents: [ResponsiveImage],
  },
};

export function anImageThatIsConstrainedProportionally() {
  return (
    <ResponsiveImage
      src={lunar}
      alt="Image"
      maxWidth={150}
      maxHeight={150}
      borderRadius={6}
      shimmer={<Shimmer block height={150} width={150} />}
    />
  );
}

anImageThatIsConstrainedProportionally.story = {
  name: 'An image that is constrained proportionally.',
};

export function withContain() {
  return (
    <ResponsiveImage
      contain
      src={lunar}
      alt="Image"
      maxWidth={150}
      maxHeight={100}
      shimmer={<Shimmer block height={100} width={150} />}
    />
  );
}

withContain.story = {
  name: 'With contain.',
};

export function withCover() {
  return (
    <ResponsiveImage
      cover
      src={lunar}
      alt="Image"
      maxWidth={150}
      maxHeight={100}
      shimmer={<Shimmer block height={100} width={150} />}
    />
  );
}

withCover.story = {
  name: 'With cover.',
};

export function withNoShadow() {
  return (
    <ResponsiveImage
      noShadow
      src={lunar}
      alt="Image"
      maxWidth={150}
      shimmer={<Shimmer block height={150} width={150} />}
    />
  );
}

withNoShadow.story = {
  name: 'With no shadow.',
};
