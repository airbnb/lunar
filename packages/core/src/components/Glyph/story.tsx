import React from 'react';
import Text from '../Text';
import Glyph from '.';

export default {
  title: 'Core/Glyph',
  parameters: {
    inspectComponents: [Glyph],
  },
};

export function fractionsAsDiagonalOrStacked() {
  return (
    <Text>
      <Glyph diagonal>1/3</Glyph>
      <br />
      <Glyph stacked>1/3</Glyph>
    </Text>
  );
}

fractionsAsDiagonalOrStacked.story = {
  name: 'Fractions as diagonal or stacked.',
};

export function zerosWithASlash() {
  return (
    <Text>
      <Glyph slashed>1000</Glyph>
    </Text>
  );
}

zerosWithASlash.story = {
  name: 'Zeros with a slash.',
};

export function fixedWidthNumbersForTabularRendering() {
  return (
    <Text>
      <Glyph tabular>123.45</Glyph>
      <br />
      <Glyph tabular>456.70</Glyph>
    </Text>
  );
}

fixedWidthNumbersForTabularRendering.story = {
  name: 'Fixed width numbers for tabular rendering.',
};

export function numbersWithOrdinalSuffixes() {
  return (
    <Text>
      <Glyph ordinal>1st</Glyph> <Glyph ordinal>2nd</Glyph> <Glyph ordinal>3rd</Glyph>
    </Text>
  );
}

numbersWithOrdinalSuffixes.story = {
  name: 'Numbers with ordinal suffixes.',
};
