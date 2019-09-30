import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LoremIpsum from ':storybook/components/LoremIpsum';
import TrackingBoundary from '.';

storiesOf('Core/TrackingBoundary', module)
  .addParameters({
    inspectComponents: [TrackingBoundary],
  })
  .add('Track clicks and keypresses in an area.', () => (
    <TrackingBoundary name="ReservationsTable">
      {/* eslint-disable-next-line */}
      <div onClick={action('onClick')} onKeyDown={action('onKeyDown')}>
        <LoremIpsum />
      </div>
    </TrackingBoundary>
  ));
