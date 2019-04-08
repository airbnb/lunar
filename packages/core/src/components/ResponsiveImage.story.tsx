import React from 'react';
import { storiesOf } from '@storybook/react';
import lunar from ':storybook/images/lunar-logo.png';
import Shimmer from './Shimmer';
import ResponsiveImage from './ResponsiveImage';

storiesOf('Core/ResponsiveImage', module)
  .add('An image that is constrained proportionally.', () => (
    <ResponsiveImage
      src={lunar}
      alt="Image"
      maxWidth={150}
      maxHeight={150}
      borderRadius={6}
      shimmer={<Shimmer height={150} width={150} block />}
    />
  ))
  .add('With cover.', () => (
    <ResponsiveImage
      cover
      src={lunar}
      alt="Image"
      maxWidth={150}
      maxHeight={100}
      shimmer={<Shimmer height={100} width={150} block />}
    />
  ))
  .add('With no shadow.', () => (
    <ResponsiveImage
      noShadow
      src={lunar}
      alt="Image"
      maxWidth={150}
      shimmer={<Shimmer height={150} width={150} block />}
    />
  ));
