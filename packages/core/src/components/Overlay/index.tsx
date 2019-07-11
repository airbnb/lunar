import React from 'react';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import { scrollingParents, ArrayOfScrollables } from '../../utils/isScrollable';
import Portal from './Portal';

export type Props = {
  /** Content to display within the overlay. */
  children?: React.ReactNode;
  /** True to be visible. */
  open?: boolean;
  /** True for non-modal appearance. */
  noBackground?: boolean;
  /** Callback for when the overlay should be closed.  */
  onClose: () => void;
};

export type State = {
  x: number;
  y: number;
};

/** An overlay that masks the entire viewport and displays a chunk of content over it. */
export default class Overlay extends React.PureComponent<Props, State> {
  static defaultProps = {
    noBackground: false,
    open: false,
  };

  state = {
    x: 0,
    y: 0,
  };

  ref = React.createRef<HTMLDivElement>();

  scrollers: ArrayOfScrollables = [];

  componentDidUpdate() {
    const { current } = this.ref;

    /* istanbul ignore next: refs are hard */
    if (current) {
      const { x, y } = current.getBoundingClientRect() as DOMRect;

      if (x !== this.state.x) {
        this.setState({ x });
      }

      if (y !== this.state.y) {
        this.setState({ y });
      }
    }

    this.removeScrollListeners();

    if (this.props.open && this.props.noBackground) {
      this.addScrollListeners();
    }
  }

  componentWillUnmount() {
    this.removeScrollListeners();
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
    const { onClose, open, children, noBackground } = this.props as Required<Props>;
    const { x, y } = this.state;

    return (
      <div ref={this.ref}>
        {open && (
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
