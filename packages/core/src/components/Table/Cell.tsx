import React from 'react';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Display in the center horizontally. */
  centerAlign?: boolean;
  /** Span multiple columns. */
  colSpan?: number;
  /** Display horizontally at the end. */
  endAlign?: boolean;
  /** Render as a table header. */
  header?: boolean;
  /** Display horizontally at the start. */
  startAlign?: boolean;
  /** Truncate text and display all on hover. */
  truncate?: boolean;
  /** Wrap text and white space. */
  wrap?: boolean;
};

/** An individual table cell. */
export class TableCell extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    centerAlign: false,
    endAlign: false,
    header: false,
    startAlign: false,
    truncate: false,
    wrap: false,
  };

  render() {
    const {
      centerAlign,
      children,
      header,
      startAlign,
      endAlign,
      styles,
      truncate,
      wrap,
      ...props
    } = this.props;
    const Tag = header ? 'th' : 'td';

    return (
      <Tag
        {...props}
        {...css(
          truncate && styles.cell_truncate,
          startAlign && styles.cell_left,
          centerAlign && styles.cell_center,
          endAlign && styles.cell_right,
          wrap && styles.cell_wrap,
        )}
      >
        {children}
      </Tag>
    );
  }
}

export default withStyles(() => ({
  cell_truncate: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    ':hover': {
      maxWidth: 'none',
      overflow: 'inherit',
      whiteSpace: 'inherit',
      wordWrap: 'break-word',
    },
  },

  cell_left: {
    textAlign: 'left',
  },

  cell_center: {
    textAlign: 'center',
  },

  cell_right: {
    textAlign: 'right',
  },

  cell_wrap: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
}))(TableCell);
