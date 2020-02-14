import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetCol } from './styles';

export type ColProps = {
  /** Content to display in a column. */
  children: NonNullable<React.ReactNode>;
  /** Offset in column widths to push to the right. */
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  /** Number of columns this column should span. */
  span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A column within a grid. */
export default function Col({ children, offset = 0, span, styleSheet }: ColProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetCol);

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
