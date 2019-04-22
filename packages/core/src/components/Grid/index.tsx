import React from 'react';
import { childrenOfType, mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import Col from './Col';

const horizontalAlignProp = mutuallyExclusiveTrueProps('centered', 'leftAlign', 'rightAlign');
const verticalAlignProp = mutuallyExclusiveTrueProps('bottomAlign', 'middleAlign', 'topAlign');

export type Props = {
  /** Vertically align the columns at the bottom. */
  bottomAlign?: boolean;
  /** Horizontally align the columns to the center. */
  centered?: boolean;
  /** Columns to render. */
  children: NonNullable<React.ReactNode>;
  /** Horizontally align the columns to the left (flex-start). */
  leftAlign?: boolean;
  /** Vertically align the columns in the middle. */
  middleAlign?: boolean;
  /** Reverse the order of columns. */
  reversed?: boolean;
  /** Horizontally align the columns to the left (flex-end). */
  rightAlign?: boolean;
  /** Vertically align the columns at the top. */
  topAlign?: boolean;
};

/** A grid to contain columns. */
export class Grid extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    bottomAlign: verticalAlignProp,
    centered: horizontalAlignProp,
    children: childrenOfType(Col).isRequired,
    leftAlign: horizontalAlignProp,
    middleAlign: verticalAlignProp,
    rightAlign: horizontalAlignProp,
    topAlign: verticalAlignProp,
  };

  static defaultProps = {
    bottomAlign: false,
    centered: false,
    leftAlign: false,
    middleAlign: false,
    reversed: false,
    rightAlign: false,
    topAlign: false,
  };

  render() {
    const {
      bottomAlign,
      centered,
      children,
      leftAlign,
      middleAlign,
      reversed,
      rightAlign,
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
          leftAlign && styles.grid_left,
          rightAlign && styles.grid_right,
          centered && styles.grid_centered,
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

  grid_centered: {
    justifyContent: 'center',
  },

  grid_left: {
    justifyContent: 'flex-start',
  },

  grid_right: {
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
