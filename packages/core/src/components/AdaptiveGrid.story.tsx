import React from 'react';
import { storiesOf } from '@storybook/react';
import AdaptiveGrid from './AdaptiveGrid';
import Card from './Card';

storiesOf('Core/AdaptiveGrid', module)
  .addParameters({
    inspectComponents: [AdaptiveGrid],
  })
  .add('A grid with 3 items per row', () => (
    <AdaptiveGrid defaultItems={3}>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
    </AdaptiveGrid>
  ))
  .add('A grid with 4/3/2 items per row depending on width', () => (
    <AdaptiveGrid defaultItems={2} breakpoints={{ 1200: 4, 1000: 3 }}>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
    </AdaptiveGrid>
  ))
  .add('A grid with 4 items per row and no padding', () => (
    <AdaptiveGrid defaultItems={4} noPadding>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
    </AdaptiveGrid>
  ));
