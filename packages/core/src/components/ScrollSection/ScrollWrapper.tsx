import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ScrollSectionContext, { Context } from './ScrollContext';
import { styleSheetScrollWrapper } from './styles';

export type ScrollWrapperProps = {
  /** The contents of the wrapper. */
  children: NonNullable<React.ReactNode>;
  /**
   * Shrink or grow the observed region of the wrapper for intersections.
   * Defaults to only top 1% of the wrapper.
   */
  intersectionMargin?: string;
  /** Threshold in which to check for intersections. */
  intersectionThreshold?: number;
  /** Callback for when the active region changes. */
  onChangeActiveScrollSection?: (id: string) => void;
  /** Callback for when a previously active region becomes hidden. */
  onHideScrollSection?: (id: string) => void;
};

/** Wrapper that measures location of `ScrollSection`s. */
export class ScrollWrapper extends React.Component<ScrollWrapperProps & WithStylesProps> {
  static defaultProps = {
    intersectionMargin: '0% 0% -99% 0%',
  };

  anchors = new Map();

  observer: IntersectionObserver | null = null;

  scrollContext?: Context;

  scrollRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.scrollRef.current) {
      this.setupObserver();
    }
  }

  componentDidUpdate(prevProps: ScrollWrapperProps) {
    if (this.props.intersectionMargin !== prevProps.intersectionMargin) {
      this.setupObserver();
    }
  }

  setupObserver() {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.scrollRef.current) {
      this.observer = new IntersectionObserver(this.handleIntersect, {
        root: this.scrollRef.current,
        rootMargin: this.props.intersectionMargin,
        threshold: this.props.intersectionThreshold,
      });

      this.anchors.forEach((anchor) => {
        this.observer!.observe(anchor);
      });
    }
  }

  addScrollAnchor = (name: string, anchor: HTMLElement) => {
    if (__DEV__ && this.anchors.has(name)) {
      throw new Error(`Duplicate anchor id added: ${name}`);
    }

    if (this.observer) {
      this.observer.observe(anchor);
    }

    this.anchors.set(name, anchor);
  };

  removeScrollAnchor = (name: string) => {
    // Since we always clear anchor before adding a new one,
    // we do not want to break when we have not added an anchor yet.
    if (!this.anchors.has(name)) {
      return;
    }

    if (this.observer) {
      this.observer.unobserve(this.anchors.get(name));
    }

    this.anchors.delete(name);
  };

  private handleIntersect = /* istanbul ignore next */ (entries: IntersectionObserverEntry[]) => {
    entries.forEach(({ target, isIntersecting }) => {
      // isIntersecting is true if it has passed the threshold in a positive direction,
      // false if it is no longer intersecting, this is preferable to using intersectionRatio
      // as on small intersection areas, the ratio can lose precision wnough to be 0,
      // rather than a very small number.
      if (isIntersecting && this.props.onChangeActiveScrollSection) {
        this.props.onChangeActiveScrollSection(target.id);
      }

      if (!isIntersecting && this.props.onHideScrollSection) {
        this.props.onHideScrollSection(target.id);
      }
    });
  };

  render() {
    const { cx, children, styles } = this.props;

    if (!this.scrollContext) {
      this.scrollContext = {
        addScrollAnchor: this.addScrollAnchor,
        removeScrollAnchor: this.removeScrollAnchor,
      };
    }

    return (
      <ScrollSectionContext.Provider value={this.scrollContext}>
        <div ref={this.scrollRef} className={cx(styles.wrapper)}>
          {children}
        </div>
      </ScrollSectionContext.Provider>
    );
  }
}

export default withStyles(styleSheetScrollWrapper)(ScrollWrapper);
