import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import TrackingBoundary from '.';

export default {
  title: 'Core/TrackingBoundary',
  parameters: {
    inspectComponents: [TrackingBoundary],
  },
};

export function trackClicksAndKeypressesInAnArea() {
  return (
    <TrackingBoundary name="ReservationsTable">
      {/* eslint-disable-next-line */}
      <div onClick={() => console.log('onClick')} onKeyDown={() => console.log('onKeyDown')}>
        <LoremIpsum />
      </div>
    </TrackingBoundary>
  );
}

trackClicksAndKeypressesInAnArea.story = {
  name: 'Track clicks and keypresses in an area.',
};
