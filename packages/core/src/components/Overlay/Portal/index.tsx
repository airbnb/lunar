import React from 'react';
import throttle from 'lodash/throttle';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import FocusTrap from '../../FocusTrap';
import BasePortal from '../../Portal';
import { ESCAPE } from '../../../keys';
import { Z_INDEX_PORTAL } from '../../../constants';
import toRGBA from '../../../utils/toRGBA';

export type Props = {
  children?: React.ReactNode;
  /** True removes the background. */
  noBackground: boolean;
  /** Callback for when the overlay should be closed. */
  onClose: () => void;
  /** Callback for when the window is resized. */
  onResize: () => void;
  /** X position of content. */
  x?: number;
  /** Y position of content. */
  y?: number;
};

export type State = {
  height: number;
};

export class Portal extends React.Component<Props & WithStylesProps, State> {
  state = {
    height: 0,
  };

  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.handleResizeThrottled);

    if (!this.props.noBackground) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleResizeThrottled);

    if (!this.props.noBackground) {
      document.body.style.overflow = '';
    }
  }

  private handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === this.ref.current) {
      this.props.onClose();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ESCAPE) {
      this.props.onClose();
    }
  };

  private handleResize = () => {
    this.props.onResize();
  };

  private handleResizeThrottled = throttle(
    /* istanbul ignore next */ () => this.handleResize(),
    100,
  );

  private handleScroll = () => {
    const { current } = this.ref;

    if (current && !this.props.noBackground) {
      this.setState(state => ({
        height: Math.max(current.scrollHeight, state.height),
      }));
    }
  };

  private handleScrollThrottled = throttle(
    /* istanbul ignore next */ () => this.handleScroll(),
    100,
  );

  render() {
    const { cx, children, styles, x, y, noBackground } = this.props;
    const { height } = this.state;

    return (
      <BasePortal>
        <FocusTrap>
          <div
            ref={this.ref}
            className={cx(styles.container, noBackground ? styles.noBg : styles.opaque)}
            role="presentation"
            onClick={this.handleClick}
            onScroll={this.handleScrollThrottled}
          >
            <div
              className={cx(styles.content, { paddingTop: y, marginLeft: x, minHeight: height })}
            >
              {children}
            </div>
          </div>
        </FocusTrap>
      </BasePortal>
    );
  }
}

export default withStyles(({ color }) => ({
  container: {
    position: 'fixed',
    zIndex: Z_INDEX_PORTAL,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    userSelect: 'none',
  },

  noBg: {
    pointerEvents: 'none',
    overflow: 'hidden',
  },

  opaque: {
    backgroundColor: toRGBA(color.core.neutral[6], 30),
  },

  content: {
    width: 0,
    overflow: 'visible',
  },
}))(Portal);
