import React from 'react';
import { storiesOf } from '@storybook/react';
import PriceComparison from './PriceComparison';

storiesOf('Core/PriceComparison', module)
  .addParameters({
    inspectComponents: [PriceComparison],
  })
  .add('Both native and USD amounts.', () => (
    <PriceComparison amount={123} amountUSD={123} currency="EUR" />
  ))
  .add('Only native amounts.', () => <PriceComparison amount={123} currency="EUR" />)
  .add('Only USD amounts.', () => <PriceComparison amountUSD={123} currency="EUR" />);
