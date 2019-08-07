import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type AdaptiveGridProps = {
  /** Content to render as a grid. */
  children?: React.ReactNode;
  /** List of width/item pairs, describes how many items to display for windows of at least that width. */
  breakpoints?: { [key: string]: number };
  /** Items per row for screens smaller than the smallest breakpoint. */
  defaultItemsPerRow?: number;
  /** Removes padding between items. */
  noGutter?: boolean;
};

type Props = AdaptiveGridProps & WithStylesProps;

class AdaptiveGrid extends React.PureComponent<Props> {
  static defaultProps = {
    breakpoints: {},
    defaultItemsPerRow: 1,
    noGutter: false,
  };

  render() {
    const { breakpoints, children, cx, defaultItemsPerRow, noGutter, styles } = this.props;

    const childElements =
      children &&
      React.Children.map(children, (child: React.ReactNode, idx: number) =>
        child ? (
          // These items are generic and don't have a guaranteed id or any unique property
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx}>{child}</div>
        ) : null,
      );

    const breakpointStyles: { [key: string]: { [key: string]: string } } = {};
    const breakpointKeys = Object.keys(breakpoints!);
    const smallestBreakpoint = breakpointKeys.reduce(
      (min, key) => Math.min(min, parseInt(key, 10)),
      10000,
    );

    breakpointKeys.forEach(breakpoint => {
      breakpointStyles[`@media (min-width: ${breakpoint}px)`] = {
        gridTemplateColumns: `repeat(${breakpoints![breakpoint]}, 1fr)`,
      };
    });

    breakpointStyles[
      breakpointKeys.length > 0
        ? `@media (max-width: ${smallestBreakpoint}px)`
        : '@media (min-width: 0px)'
    ] = {
      gridTemplateColumns: `repeat(${defaultItemsPerRow}, 1fr)`,
    };

    return (
      <div
        className={cx(styles.container, noGutter && styles.container_noGutter, breakpointStyles)}
      >
        {childElements}
      </div>
    );
  }
}
export default withStyles(({ unit }) => ({
  container: {
    display: 'grid',
    gridGap: 2 * unit,
  },
  container_noGutter: {
    gridGap: 0,
  },
}))(AdaptiveGrid);
