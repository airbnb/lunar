import React from 'react';
import { storiesOf } from '@storybook/react';
import DynamicGrid from './DynamicGrid';
import Card from './Card';

storiesOf('Core/DynamicGrid', module)
  .addParameters({
    inspectComponents: [DynamicGrid],
  })
  .add('A grid with 3 items per row', () => (
    <DynamicGrid defaultItems={3}>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
    </DynamicGrid>
  ))
  .add('A grid with 4/3/2 items per row depending on width', () => (
    <DynamicGrid defaultItems={2} breakpoints={{ 1200: 4, 1000: 3 }}>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
    </DynamicGrid>
  ))
  .add('A grid with 4 items per row and no padding', () => (
    <DynamicGrid defaultItems={4} padding={0}>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
    </DynamicGrid>
  ))
  .add('A grid with 4 items per row and extra padding', () => (
    <DynamicGrid defaultItems={4} padding={5}>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
      <Card>Grid Item</Card>
    </DynamicGrid>
  ));
