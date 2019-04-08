import React from 'react';
import { storiesOf } from '@storybook/react';
import Shimmer from './Shimmer';

storiesOf('Core/Shimmer', module)
  .add('A shimmer with random widths (default).', () => (
    <>
      <Shimmer block width="random" />
      <br />
      <Shimmer block width="random" />
      <br />
      <Shimmer block width="random" />
    </>
  ))
  .add('An inline shimmer with fixed dimensions.', () => <Shimmer width={150} height={25} />)
  .add('A circle shimmer using border radius.', () => (
    <Shimmer width={50} height={50} radius="50%" />
  ));
