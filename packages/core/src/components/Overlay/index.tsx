import React from 'react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import { scrollingParents, ArrayOfScrollables } from '../../utils/isScrollable';
import Portal from './Portal';

export type OverlayProps = {
  /** Content to display within the overlay. */
  children?: React.ReactNode;
  /** True to be visible. */
  open?: boolean;
  /** True for non-modal appearance. */
  noBackground?: boolean;
  /** Callback for when the overlay should be closed.  */
  onClose: () => void;
};

export type OverlayState = {
  x: number;
  y: number;
  targetRectReady: boolean;
};

/** An overlay that masks the entire viewport and displays a chunk of content over it. */
export default class Overlay extends React.PureComponent<OverlayProps, OverlayState> {
  static defaultProps = {
    noBackground: false,
    open: false,
  };

  state = {
    x: 0,
    y: 0,
    targetRectReady: false,
  };

  rafHandle: number = 0;

  ref = React.createRef<HTMLDivElement>();

  scrollers: ArrayOfScrollables = [];

  componentDidUpdate() {
    const { current } = this.ref;

    /* istanbul ignore next: refs are hard */
    if (current) {
      this.rafHandle = requestAnimationFrame(() => {
        // getBoundingClientRect casues a reflow
        const { x, y } = current.getBoundingClientRect() as DOMRect;

        if (x !== this.state.x || y !== this.state.y) {
          this.rafHandle = requestAnimationFrame(() => {
            this.setState({ x, y, targetRectReady: true });
          });
        }
      });
    }

    this.removeScrollListeners();

    if (this.props.open && this.props.noBackground) {
      this.addScrollListeners();
    }
  }

  componentWillUnmount() {
    this.removeScrollListeners();
    cancelAnimationFrame(this.rafHandle);
  }

  private addScrollListeners = debounce(() => {
    const { current } = this.ref;

    this.removeScrollListeners();

    /* istanbul ignore next: refs are hard */
    if (current) {
      this.scrollers = scrollingParents(current);
      this.scrollers.forEach((node: EventTarget) => {
        node.addEventListener('scroll', this.handleScroll);
      });
    }
  });

  private removeScrollListeners = () => {
    this.scrollers.forEach((node: EventTarget) => {
      node.removeEventListener('scroll', this.handleScroll);
    });

    this.scrollers = [];
  };

  private handleResize = () => {
    this.forceUpdate();
  };

  private handleScroll = throttle(() => this.props.onClose(), 100);

  render() {
    const { onClose, open, children, noBackground } = this.props as Required<OverlayProps>;
    const { x, y, targetRectReady } = this.state;

    return (
      <div ref={this.ref}>
        {open && targetRectReady && (
          <Portal
            x={x}
            y={y}
            noBackground={noBackground}
            onClose={onClose}
            onResize={this.handleResize}
          >
            {children}
          </Portal>
        )}
      </div>
    );
  }
}
