/* eslint-disable no-param-reassign */

import React from 'react';
import componentName from '../../prop-types/componentName';

export type TrackingBoundaryProps = {
  /** Content to wrap. */
  children: NonNullable<React.ReactNode>;
  /** A unique name to identify this boundary in the context stack. */
  name?: string;
};

/** Wraps a component and provides a context stack for click and keydown tracking purposes. */
function TrackingBoundary({ children, name }: TrackingBoundaryProps) {
  if (!name) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  const handleTrackContext = ({ nativeEvent }: { nativeEvent: MouseEvent | KeyboardEvent }) => {
    if (nativeEvent.trackingContext) {
      nativeEvent.trackingContext.push(name);
    } else {
      nativeEvent.trackingContext = [name];
    }
  };

  return (
    <div
      data-tracking-boundary
      data-tracking-name={name}
      role="none"
      onClick={handleTrackContext}
      onKeyDown={handleTrackContext}
    >
      {children}
    </div>
  );
}

TrackingBoundary.propTypes = {
  name: componentName,
};

export default TrackingBoundary;
