import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Glyph from './Glyph';

storiesOf('Core/Glyph', module)
  .add('Fractions as diagonal or stacked.', () => (
    <Text>
      <Glyph diagonal>1/3</Glyph>
      <br />
      <Glyph stacked>1/3</Glyph>
    </Text>
  ))
  .add('Zeros with a slash.', () => (
    <Text>
      <Glyph slashed>1000</Glyph>
    </Text>
  ))
  .add('Fixed width numbers for tabular rendering.', () => (
    <Text>
      <Glyph tabular>123.45</Glyph>
      <br />
      <Glyph tabular>456.70</Glyph>
    </Text>
  ))
  .add('Numbers with ordinal suffixes.', () => (
    <Text>
      <Glyph ordinal>1st</Glyph> <Glyph ordinal>2nd</Glyph> <Glyph ordinal>3rd</Glyph>
    </Text>
  ));
