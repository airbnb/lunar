import React from 'react';
import { StyleBlock } from 'aesthetic';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';

const INCREMENT = 25;

export type Props = {
  /** How much to scroll when hovering above gradient. Defaults to 15% of the container width. */
  autoScrollIncrement?: number;
  /** Children to be positioned in a vertically centered fashion. */
  children?: React.ReactNode;
  /** Whether to hide the scrollbar. Doesn't prevent scroll. */
  hideScrollbar?: boolean;
  /** Whether to show arrows on the edges. */
  showArrows?: boolean;
};

export type State = {
  showStartGradient: boolean;
  showEndGradient: boolean;
};

/** A horizontal scroller with gradients on each side. */
export class GradientScroller extends React.Component<Props & WithStylesProps, State> {
  static defaultProps = {
    children: null,
    hideScrollbar: false,
    showArrows: false,
  };

  contentsRef: HTMLDivElement | null = null;

  observer: ResizeObserver;

  scrollInterval: number = 0;

  scrollerRef: HTMLDivElement | null = null;

  state = {
    showStartGradient: false,
    showEndGradient: true,
  };

  constructor(props: Props & WithStylesProps) {
    super(props);

    // Register resize observer before mounting
    this.observer = new window.ResizeObserver(this.handleObserver);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  calculate() {
    const scroller = this.scrollerRef;
    const contents = this.contentsRef;

    if (!scroller || !contents) {
      return;
    }

    const scrollerWidth = scroller.clientWidth;
    const maxChildWidth = this.calculateMaxChildWidth(contents);

    this.setState({
      showStartGradient: scroller.scrollLeft > 0,
      showEndGradient: maxChildWidth > scrollerWidth,
    });
  }

  calculateAutoScrollIncrement(): number {
    let increment = this.props.autoScrollIncrement;

    // 15% of the width
    if (!increment && this.scrollerRef) {
      increment = this.scrollerRef.offsetWidth * 0.15;
    }

    if (!increment) {
      increment = INCREMENT;
    }

    return increment;
  }

  calculateMaxChildWidth(contents: Element) {
    return Array.from(contents.children).reduce(
      (width, child) => Math.max(child.clientWidth, width),
      contents.clientWidth,
    );
  }

  doScroll(amount: number, interval: boolean = true) {
    const callback = () => {
      if (this.scrollerRef) {
        this.scrollerRef.scrollLeft += amount;
        this.handleScrollThrottled();
      }
    };

    this.handleScrollStop();

    if (interval) {
      this.scrollInterval = window.setInterval(callback, 100);
    } else {
      callback();
    }
  }

  private handleContentsRef = (ref: HTMLDivElement) => {
    if (ref) {
      this.observer.observe(ref);
    } else if (this.contentsRef) {
      this.observer.unobserve(this.contentsRef);
    }

    this.contentsRef = ref;
  };

  private handleScrollerRef = (ref: HTMLDivElement) => {
    if (ref) {
      this.observer.observe(ref);
    } else if (this.scrollerRef) {
      this.observer.unobserve(this.scrollerRef);
    }

    this.scrollerRef = ref;
  };

  private handleObserver = (entries: ResizeObserverEntry[]) => {
    let calculate = false;

    entries.forEach(({ contentRect, target }) => {
      const width = target.dataset.prevWidth;
      const nextWidth = String(contentRect.width);

      // Dataset stores as strings
      if (!width || nextWidth !== width) {
        calculate = true;

        // eslint-disable-next-line no-param-reassign
        target.dataset.prevWidth = nextWidth;
      }
    });

    if (calculate) {
      this.handleResizeDebounced();
    }
  };

  private handleResize = () => {
    this.calculate();
  };

  private handleResizeDebounced = debounce(this.handleResize, 150);

  private handleScroll = () => {
    const target = this.scrollerRef;
    const { showStartGradient, showEndGradient } = this.state;

    if (!target) {
      return;
    }

    if (target.scrollLeft > 0 && !showStartGradient) {
      this.setState({
        showStartGradient: true,
      });
    } else if (target.scrollLeft === 0 && showStartGradient) {
      this.setState({
        showStartGradient: false,
      });
    }

    // Get the largest width child to calculate against
    const scrolledWidth = target.scrollLeft + target.clientWidth;
    const maxChildWidth = this.calculateMaxChildWidth(target.children[0]);

    if (scrolledWidth < maxChildWidth && !showEndGradient) {
      this.setState({
        showEndGradient: true,
      });
    } else if (scrolledWidth >= maxChildWidth && showEndGradient) {
      this.setState({
        showEndGradient: false,
      });
    }
  };

  private handleScrollThrottled = throttle(this.handleScroll, 100);

  private handleScrollLeft = (event: React.MouseEvent) => {
    this.doScroll(-this.calculateAutoScrollIncrement(), event.type !== 'click');
  };

  private handleScrollRight = (event: React.MouseEvent) => {
    this.doScroll(this.calculateAutoScrollIncrement(), event.type !== 'click');
  };

  private handleScrollStop = () => {
    if (this.scrollInterval) {
      window.clearInterval(this.scrollInterval);
    }
  };

  render() {
    const { children, styles, hideScrollbar, showArrows } = this.props;
    const { showStartGradient, showEndGradient } = this.state;

    return (
      <div {...css(styles.container)}>
        <div {...css(styles.leftGradient, showStartGradient && styles.gradient_reveal)}>
          {showArrows ? (
            <button
              {...css(styles.leftArrow, hideScrollbar && styles.arrow_hideScrollbar)}
              type="button"
              onClick={this.handleScrollLeft}
            >
              <IconChevronLeft decorative size="2em" />
            </button>
          ) : (
            <span
              {...css(styles.scrollTrigger)}
              onMouseEnter={this.handleScrollLeft}
              onMouseLeave={this.handleScrollStop}
            />
          )}
        </div>

        <div {...css(styles.rightGradient, showEndGradient && styles.gradient_reveal)}>
          {showArrows ? (
            <button
              {...css(styles.rightArrow, hideScrollbar && styles.arrow_hideScrollbar)}
              type="button"
              onClick={this.handleScrollRight}
            >
              <IconChevronRight decorative size="2em" />
            </button>
          ) : (
            <span
              {...css(styles.scrollTrigger)}
              onMouseEnter={this.handleScrollRight}
              onMouseLeave={this.handleScrollStop}
            />
          )}
        </div>

        <div
          {...css(styles.scroller, hideScrollbar && styles.scroller_hideScrollbar)}
          ref={this.handleScrollerRef}
          onScroll={this.handleScrollThrottled}
        >
          <div {...css(styles.contents)} ref={this.handleContentsRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(({ color, unit, ui, pattern, transition }) => {
  const scrollbarHeight = unit * 1.5;

  const gradient: StyleBlock = {
    ...transition.fade,
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    content: "''",
    opacity: 0,
    pointerEvents: 'none',
  };

  const arrow: StyleBlock = {
    ...pattern.resetButton,
    position: 'absolute',
    top: '45%',
    marginTop: -scrollbarHeight / 2,
    transform: 'translateY(-50%)',
    backgroundColor: color.accent.bg,
    borderRadius: '50%',
    boxShadow: ui.boxShadow,
    padding: unit,
    outline: 'none',

    ':hover': {
      backgroundColor: color.accent.bgHover,
    },
  };

  return {
    container: {
      width: '100%',
      position: 'relative',
      margin: -unit / 2,
    },

    leftGradient: {
      ...gradient,
      width: unit * 5,
      left: 0,
      background: `linear-gradient(to right, ${color.accent.bg} 40%, transparent 100%)`,
    },

    leftArrow: {
      ...arrow,
      left: -unit,
    },

    rightGradient: {
      ...gradient,
      width: unit * 5,
      right: 0,
      background: `linear-gradient(to left, ${color.accent.bg} 40%, transparent 100%)`,
    },

    rightArrow: {
      ...arrow,
      right: -unit,
    },

    arrow_hideScrollbar: {
      top: '45%',
      marginTop: 0,
    },

    gradient_reveal: {
      opacity: 1,
      pointerEvents: 'auto',
    },

    scroller: {
      overflowX: 'auto',
      overflowY: 'hidden',
      display: 'flex',
      alignItems: 'center',
      alignContent: 'stretch',
      paddingBottom: scrollbarHeight,
      '-webkit-overflow-scrolling': 'touch',
    },

    scroller_hideScrollbar: {
      paddingBottom: 0,

      '::-webkit-scrollbar': {
        display: 'none',
      },
    },

    scrollTrigger: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    contents: {
      flexBasis: '100%',
      padding: unit / 2,
    },
  };
})(GradientScroller);
