import React from 'react';
import Shimmer from '.';

export default {
  title: 'Core/Shimmer',
  parameters: {
    inspectComponents: [Shimmer],
  },
};

export function aShimmerWithRandomWidthsDefault() {
  return (
    <>
      <Shimmer block width="random" />
      <br />
      <Shimmer block width="random" />
      <br />
      <Shimmer block width="random" />
    </>
  );
}

aShimmerWithRandomWidthsDefault.story = {
  name: 'A shimmer with random widths (default).',
  parameters: { happo: false },
};

export function anInlineShimmerWithFixedDimensions() {
  return <Shimmer width={150} height={25} />;
}

anInlineShimmerWithFixedDimensions.story = {
  name: 'An inline shimmer with fixed dimensions.',
};

export function aCircleShimmerUsingBorderRadius() {
  return <Shimmer width={50} height={50} radius="50%" />;
}

aCircleShimmerUsingBorderRadius.story = {
  name: 'A circle shimmer using border radius.',
};
