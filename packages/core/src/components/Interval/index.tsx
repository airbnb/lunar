import React from 'react';

// If there's no idle frame within 2 seconds, force calling
// the tick anyway, to prevent a poor user experience.
const FORCE_TICK_CALL = 2000;

export type Props = {
  /** Number of milliseconds for each interval. */
  every: number;
  /** Content to re-render. */
  children: (now: number) => NonNullable<React.ReactNode>;
};

export type State = {
  now: number;
};

/** Continuously render content at an interval. */
export default class Interval extends React.PureComponent<Props, State> {
  state = {
    now: Date.now(),
  };

  ric: number = 0;

  timer: number = 0;

  componentDidMount() {
    this.timer = window.setTimeout(this.tick, this.props.every);
  }

  componentWillUnmount() {
    // istanbul ignore next
    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    // istanbul ignore next
    if (this.ric) {
      window.cancelIdleCallback(this.ric);
    }
  }

  tick = () => {
    this.timer = 0;
    this.ric = window.requestIdleCallback(
      () => {
        this.ric = 0;
        this.setState(
          {
            now: Date.now(),
          },
          () => {
            this.timer = window.setTimeout(this.tick, this.props.every);
          },
        );
      },
      {
        timeout: FORCE_TICK_CALL,
      },
    );
  };

  render() {
    return this.props.children(this.state.now);
  }
}
