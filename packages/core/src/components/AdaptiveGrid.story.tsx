import React from 'react';
import { storiesOf } from '@storybook/react';
import AdaptiveGrid from './AdaptiveGrid';
import LoremIpsum from ':storybook/components/LoremIpsum';

function gridItem(short: boolean = true): React.ReactNode {
  return (
    <div style={{ height: '100%', border: '1px solid black', padding: '16px' }}>
      <LoremIpsum short={short} />
    </div>
  );
}

storiesOf('Core/AdaptiveGrid', module)
  .addParameters({
    inspectComponents: [AdaptiveGrid],
  })
  .add('A grid with 3 items per row', () => (
    <AdaptiveGrid defaultItemsPerRow={3}>
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
    </AdaptiveGrid>
  ))
  .add('A grid with 4/3/2 items per row depending on width', () => (
    <AdaptiveGrid defaultItemsPerRow={2} breakpoints={{ 950: 4, 800: 3 }}>
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem(false)}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem(false)}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
    </AdaptiveGrid>
  ))
  .add('A grid with 4 items per row and no padding', () => (
    <AdaptiveGrid noGutter defaultItemsPerRow={4}>
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
      {gridItem()}
    </AdaptiveGrid>
  ));
