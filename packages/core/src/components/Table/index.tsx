import React from 'react';
import useStyles from '../../hooks/useStyles';
import withBoundary from '../../composers/withBoundary';
import Cell from './Cell';
import Row from './Row';
import { styleSheet } from './styles';

export type TableProps = {
  /** Apply a wrapping border (combined with horizontal or vertical). */
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
  /** Disable responsive wrapper. */
  noWrap?: boolean;
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
function Table({
  bordered,
  children,
  compact,
  fixed,
  horizontal,
  loading,
  middleAlign,
  noWrap,
  striped,
  transparent,
  vertical,
}: TableProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(!noWrap && styles.responsive_wrapper)}>
      <table
        className={cx(
          styles.table,
          middleAlign && styles.content_middle_align,
          fixed && styles.table_fixed,
          bordered && horizontal && styles.table_bordered_horizontal,
          horizontal && styles.table_horizontal,
          bordered && vertical && styles.table_bordered_vertical,
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

export { Cell, Row };

export default withBoundary('Table')(Table);
