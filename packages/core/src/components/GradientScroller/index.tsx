import React from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import DirectionalIcon from '../DirectionalIcon';
import { styleSheet } from './styles';

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
    // eslint-disable-next-line unicorn/consistent-function-scoping
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
    const { cx, children, styles, hideScrollbar, showArrows } = this.props;
    const { showStartGradient, showEndGradient } = this.state;

    return (
      <div className={cx(styles.container)}>
        <div className={cx(styles.leftGradient, showStartGradient && styles.gradient_reveal)}>
          {showArrows ? (
            <button
              className={cx(styles.leftArrow, hideScrollbar && styles.arrow_hideScrollbar)}
              type="button"
              onClick={this.handleScrollLeft}
            >
              <DirectionalIcon
                decorative
                direction="left"
                left={IconChevronLeft}
                right={IconChevronRight}
                size="2em"
              />
            </button>
          ) : (
            <span
              className={cx(styles.scrollTrigger)}
              onMouseEnter={this.handleScrollLeft}
              onMouseLeave={this.handleScrollStop}
            />
          )}
        </div>

        <div className={cx(styles.rightGradient, showEndGradient && styles.gradient_reveal)}>
          {showArrows ? (
            <button
              className={cx(styles.rightArrow, hideScrollbar && styles.arrow_hideScrollbar)}
              type="button"
              onClick={this.handleScrollRight}
            >
              <DirectionalIcon
                decorative
                direction="right"
                left={IconChevronLeft}
                right={IconChevronRight}
                size="2em"
              />
            </button>
          ) : (
            <span
              className={cx(styles.scrollTrigger)}
              onMouseEnter={this.handleScrollRight}
              onMouseLeave={this.handleScrollStop}
            />
          )}
        </div>

        <div
          ref={this.handleScrollerRef}
          className={cx(styles.scroller, hideScrollbar && styles.scroller_hideScrollbar)}
          onScroll={this.handleScrollThrottled}
        >
          <div ref={this.handleContentsRef} className={cx(styles.contents)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(GradientScroller);
