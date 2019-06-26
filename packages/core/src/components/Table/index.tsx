import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import withBoundary from '../../composers/withBoundary';
import Cell from './Cell';
import Row from './Row';

export type Props = {
  /** Apply a wrapping border. */
  bordered?: boolean;
  /** Table head, body, foot, and rows. */
  children: NonNullable<React.ReactNode>;
  /** Reduce padding within cells. */
  compact?: boolean;
  /** Disable automatic cell scaling. */
  fixed?: boolean;
  /** Apply a horizontal border between rows. */
  horizontal?: boolean;
  /** Mark as loading and disable interaction. */
  loading?: boolean;
  /** Applies verticalAlign: middle to child cells. */
  middleAlign?: boolean;
  /** Alternate row background color. */
  striped?: boolean;
  /** A unique name for tracking purposes. */
  trackingName?: string;
  /** Render with a transparent background. */
  transparent?: boolean;
  /** Apply a vertical border between rows. */
  vertical?: boolean;
};

/** A responsive table for displaying tabular data. */
export class Table extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    bordered: false,
    compact: false,
    fixed: false,
    horizontal: false,
    loading: false,
    middleAlign: false,
    striped: false,
    transparent: false,
    vertical: false,
  };

  render() {
    const {
      cx,
      bordered,
      children,
      compact,
      fixed,
      horizontal,
      loading,
      middleAlign,
      striped,
      styles,
      transparent,
      vertical,
    } = this.props;

    return (
      <div className={cx(styles.responsive_wrapper)}>
        <table
          className={cx(
            styles.table,
            middleAlign && styles.content_middle_align,
            fixed && styles.table_fixed,
            bordered && styles.table_bordered,
            horizontal && styles.table_horizontal,
            vertical && styles.table_vertical,
            compact && styles.table_compact,
            striped && styles.table_striped,
            loading && styles.table_loading,
            transparent && styles.table_transparent,
          )}
        >
          {children}
        </table>
      </div>
    );
  }
}

export { Cell, Row };

export default withBoundary('Table')(
  withStyles(({ color, ui, unit }) => {
    function createCell(styles: any) {
      return {
        '@selectors': {
          ':only-child td': styles,
          ':only-child th': styles,
        },
      };
    }

    return {
      table: {
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: color.accent.bg,
        border: '1px solid transparent',
        borderCollapse: 'collapse',
        borderSpacing: 0,

        '@selectors': {
          ':only-child td': {
            padding: unit * 1.5,
            verticalAlign: 'top',
          },

          ':only-child th': {
            padding: unit * 1.5,
            verticalAlign: 'bottom',
            whiteSpace: 'nowrap',
          },
        },
      },

      table_bordered: {
        border: ui.border,
      },

      table_compact: {
        ...createCell({
          padding: unit,
        }),
      },

      table_horizontal: {
        '@selectors': {
          ':only-child > tbody > tr > td': {
            borderTop: ui.border,
          },
        },
      },

      table_fixed: {
        display: 'table',
        tableLayout: 'fixed',
      },

      table_loading: {
        pointerEvents: 'none',
        opacity: 0.5,
      },

      table_striped: {
        '@selectors': {
          ':only-child > tbody > tr': {
            backgroundColor: color.accent.bg,

            '@selectors': {
              ':nth-child(odd)': {
                backgroundColor: color.accent.bgHover,
              },
            },
          },
        },
      },

      table_transparent: {
        backgroundColor: 'transparent',
      },

      table_vertical: {
        ...createCell({
          borderLeft: ui.border,
          borderRight: ui.border,
        }),
      },

      responsive_wrapper: {
        maxWidth: '100%',
        overflowX: 'auto',
      },
      content_middle_align: {
        '@selectors': {
          ':only-child td': {
            verticalAlign: 'middle',
          },
        },
      },
    };
  })(Table),
);
