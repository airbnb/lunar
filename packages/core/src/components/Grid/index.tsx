import React from 'react';
import { childrenOfType, mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import Col from './Col';

const horizontalAlignProp = mutuallyExclusiveTrueProps('centerAlign', 'startAlign', 'endAlign');
const verticalAlignProp = mutuallyExclusiveTrueProps('bottomAlign', 'middleAlign', 'topAlign');

export type Props = {
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
};

/** A grid to contain columns. */
export class Grid extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    bottomAlign: verticalAlignProp,
    centerAlign: horizontalAlignProp,
    children: childrenOfType(Col).isRequired,
    endAlign: horizontalAlignProp,
    middleAlign: verticalAlignProp,
    startAlign: horizontalAlignProp,
    topAlign: verticalAlignProp,
  };

  static defaultProps = {
    bottomAlign: false,
    centerAlign: false,
    endAlign: false,
    middleAlign: false,
    reversed: false,
    startAlign: false,
    topAlign: false,
  };

  render() {
    const {
      bottomAlign,
      centerAlign,
      children,
      endAlign,
      middleAlign,
      reversed,
      startAlign,
      styles,
      topAlign,
    } = this.props;

    return (
      <section
        {...css(
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
}

export { Col };

export default withStyles(({ unit }) => ({
  grid: {
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginLeft: -unit,
    marginRight: -unit,
  },

  grid_reversed: {
    flexDirection: 'row-reverse',
  },

  grid_center: {
    justifyContent: 'center',
  },

  grid_start: {
    justifyContent: 'flex-start',
  },

  grid_end: {
    justifyContent: 'flex-end',
  },

  grid_top: {
    alignItems: 'flex-start',
  },

  grid_middle: {
    alignItems: 'center',
  },

  grid_bottom: {
    alignItems: 'flex-end',
  },
}))(Grid);
