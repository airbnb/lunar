import React from 'react';
import AdaptiveGrid from '.';
import LoremIpsum from ':storybook/components/LoremIpsum';

function GridItem({ empty, short = true }: { empty?: boolean; short?: boolean }) {
  if (empty) {
    return null;
  }

  return (
    <div style={{ height: '100%', border: '1px solid black', padding: '16px' }}>
      <LoremIpsum short={short} />
    </div>
  );
}

export default {
  title: 'Core/AdaptiveGrid',
  parameters: {
    inspectComponents: [AdaptiveGrid],
  },
};

export function aGridWith3ItemsPerRow() {
  return (
    <AdaptiveGrid defaultItemsPerRow={3}>
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </AdaptiveGrid>
  );
}

aGridWith3ItemsPerRow.story = {
  name: 'A grid with 3 items per row.',
};

export function aGridWith432ItemsPerRowDependingOnWidth() {
  return (
    <AdaptiveGrid defaultItemsPerRow={2} breakpoints={{ 950: 4, 800: 3 }}>
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem short={false} />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem short={false} />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </AdaptiveGrid>
  );
}

aGridWith432ItemsPerRowDependingOnWidth.story = {
  name: 'A grid with 4/3/2 items per row depending on width.',
};

export function aGridWith4ItemsPerRowAndNoPadding() {
  return (
    <AdaptiveGrid noGutter defaultItemsPerRow={4}>
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </AdaptiveGrid>
  );
}

aGridWith4ItemsPerRowAndNoPadding.story = {
  name: 'A grid with 4 items per row and no padding.',
};

export function filtersOutNullResults() {
  return (
    <AdaptiveGrid defaultItemsPerRow={3}>
      <GridItem />
      <GridItem empty />
      <GridItem />
      <GridItem empty />
      <GridItem />
      <GridItem empty />
      <GridItem />
    </AdaptiveGrid>
  );
}

filtersOutNullResults.story = {
  name: 'Filters out null results.',
};
