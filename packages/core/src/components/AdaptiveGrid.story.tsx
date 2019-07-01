import React from 'react';
import { storiesOf } from '@storybook/react';
import AdaptiveGrid from './AdaptiveGrid';
import Card, { Content } from './Card';

const gridItem = (
  <div style={{ height: '100%', border: '1px solid black', padding: '16px' }}>Grid Item</div>
);
const bigGridItem = (
  <div style={{ height: '100%', border: '1px solid black', padding: '16px' }}>
    Very Big Grid Item Very Big Grid Item Very Big Grid Item Very Big Grid Item Very Big Grid Item
    Very Big Grid Item Very Big Grid Item Very Big Grid Item Very Big Grid Item Very Big Grid Item
  </div>
);

storiesOf('Core/AdaptiveGrid', module)
  .addParameters({
    inspectComponents: [AdaptiveGrid],
  })
  .add('A grid with 3 items per row', () => (
    <AdaptiveGrid defaultItemsPerRow={3}>
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
    </AdaptiveGrid>
  ))
  .add('A grid with 4/3/2 items per row depending on width', () => (
    <AdaptiveGrid defaultItemsPerRow={2} breakpoints={{ 950: 4, 800: 3 }}>
      {gridItem}
      {gridItem}
      {bigGridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {bigGridItem}
      {gridItem}
      {gridItem}
    </AdaptiveGrid>
  ))
  .add('A grid with 4 items per row and no padding', () => (
    <AdaptiveGrid defaultItemsPerRow={4} noGutter>
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
      {gridItem}
    </AdaptiveGrid>
  ));
