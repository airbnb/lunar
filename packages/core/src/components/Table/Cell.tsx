import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheetCell as styleSheet } from './styles';

export type Props = {
  /** Display in the center horizontally. */
  centerAlign?: boolean;
  /** Content to render. */
  children?: React.ReactNode;
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
export default function TableCell({
  centerAlign,
  children,
  header,
  startAlign,
  endAlign,
  truncate,
  wrap,
  ...props
}: Props) {
  const [styles, cx] = useStyles(styleSheet);
  const Tag = header ? 'th' : 'td';

  return (
    <Tag
      {...props}
      className={cx(
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
