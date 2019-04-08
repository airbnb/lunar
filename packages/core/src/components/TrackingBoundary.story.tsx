import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LoremIpsum from ':storybook/components/LoremIpsum';
import TrackingBoundary from './TrackingBoundary';

storiesOf('Core/TrackingBoundary', module).add('Track clicks and keypresses in an area.', () => (
  <TrackingBoundary name="ReservationsTable">
    <div onClick={action('onClick')} onKeyDown={action('onKeyDown')}>
      <LoremIpsum />
    </div>
  </TrackingBoundary>
));
