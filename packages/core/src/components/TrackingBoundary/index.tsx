/* eslint-disable no-param-reassign */

import React from 'react';
import componentName from '../../prop-types/componentName';

export type Props = {
  /** Content to wrap. */
  children: NonNullable<React.ReactNode>;
  /** A unique name to identify this boundary in the context stack. */
  name?: string;
};

/** Wraps a component and provides a context stack for click and keydown tracking purposes. */
export default class TrackingBoundary extends React.Component<Props> {
  static propTypes = {
    name: componentName,
  };

  static defaultProps = {
    name: '',
  };

  private handleTrackContext = ({ nativeEvent }: { nativeEvent: MouseEvent | KeyboardEvent }) => {
    const { name } = this.props;

    if (!name) {
      return;
    }

    if (nativeEvent.trackingContext) {
      nativeEvent.trackingContext.push(name);
    } else {
      nativeEvent.trackingContext = [name];
    }
  };

  render() {
    const { children, name } = this.props;

    if (!name) {
      return children;
    }

    return (
      <tracking-boundary
        onClick={this.handleTrackContext}
        onKeyDown={this.handleTrackContext}
        data-tracking-name={name}
      >
        {children}
      </tracking-boundary>
    );
  }
}
