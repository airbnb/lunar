import React from 'react';
import { childrenOfType, mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetGrid } from './styles';
import Col from './Col';

export type GridProps = {
  /** Vertically align the columns at the bottom. */
  bottomAlign?: boolean;
  /** Horizontally align the columns to the center. */
  centerAlign?: boolean;
  /** Columns to render. */
  children: NonNullable<React.ReactNode>;
  /** Horizontally align the columns to the end (flex-end). */
  endAlign?: boolean;
  /** Vertically align the columns in the middle. */
  middleAlign?: boolean;
  /** Reverse the order of columns. */
  reversed?: boolean;
  /** Horizontally align the columns to the start (flex-start). */
  startAlign?: boolean;
  /** Vertically align the columns at the top. */
  topAlign?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A grid to contain columns. */
function Grid({
  bottomAlign,
  centerAlign,
  children,
  endAlign,
  middleAlign,
  reversed,
  startAlign,
  topAlign,
  styleSheet,
}: GridProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetGrid);

  return (
    <section
      className={cx(
        styles.grid,
        reversed && styles.grid_reversed,
        bottomAlign && styles.grid_bottom,
        middleAlign && styles.grid_middle,
        topAlign && styles.grid_top,
        startAlign && styles.grid_start,
        endAlign && styles.grid_end,
        centerAlign && styles.grid_center,
      )}
    >
      {children}
    </section>
  );
}

export { Col };

const horizontalAlignProp = mutuallyExclusiveTrueProps('centerAlign', 'startAlign', 'endAlign');
const verticalAlignProp = mutuallyExclusiveTrueProps('bottomAlign', 'middleAlign', 'topAlign');

Grid.propTypes = {
  bottomAlign: verticalAlignProp,
  centerAlign: horizontalAlignProp,
  children: childrenOfType(Col).isRequired,
  endAlign: horizontalAlignProp,
  middleAlign: verticalAlignProp,
  startAlign: horizontalAlignProp,
  topAlign: verticalAlignProp,
};

export default Grid;
