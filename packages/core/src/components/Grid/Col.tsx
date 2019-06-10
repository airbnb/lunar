import React from 'react';
import { StyleBlock } from 'aesthetic';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Content to display in a column. */
  children: NonNullable<React.ReactNode>;
  /** Offset in column widths to push to the right. */
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  /** Number of columns this column should span. */
  span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

/** A column within a grid. */
export class Col extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    offset: 0 as Props['offset'],
  };

  render() {
    const { cx, children, offset, span, styles } = this.props;

    return (
      <div
        data-span={span}
        data-offset={offset}
        className={cx(styles.col, styles[`span${span}`], styles[`offset${offset}`])}
      >
        {children}
      </div>
    );
  }
}

export default withStyles(({ unit }) => {
  const spans: { [key: string]: StyleBlock } = {};
  const offsets: { [key: string]: StyleBlock } = {};

  Array.from({ length: 12 }, (v, k) => {
    const span = k + 1;
    const offset = k;
    const width = 100 / (12 / span);

    spans[`span${span}`] = {
      flexBasis: `${width}%`,
      maxWidth: `${width}%`,
    };

    offsets[`offset${offset}`] = {
      marginLeft: offset > 0 ? `${100 / (12 / offset)}%` : 0,
    };

    return span;
  });

  return {
    col: {
      flex: '0 0 auto',
      paddingLeft: unit,
      paddingRight: unit,
    },

    ...spans,
    ...offsets,
  };
})(Col);
