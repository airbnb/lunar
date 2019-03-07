import React from 'react';
import { childrenOfType, mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import Col from './Col';

const alignProp = mutuallyExclusiveTrueProps('bottomAlign', 'middleAlign', 'topAlign');

export type Props = {
  /** Vertically align the columns at the bottom. */
  bottomAlign?: boolean;
  /** Columns to render. */
  children: NonNullable<React.ReactNode>;
  /** Vertically align the columns in the middle. */
  middleAlign?: boolean;
  /** Reverse the order of columns. */
  reversed?: boolean;
  /** Vertically align the columns at the top. */
  topAlign?: boolean;
};

/** A grid to contain columns. */
export class Grid extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    bottomAlign: alignProp,
    children: childrenOfType(Col).isRequired,
    middleAlign: alignProp,
    topAlign: alignProp,
  };

  static defaultProps = {
    bottomAlign: false,
    middleAlign: false,
    reversed: false,
    topAlign: false,
  };

  render() {
    const { children, reversed, styles, bottomAlign, middleAlign, topAlign } = this.props;

    return (
      <section
        {...css(
          styles.grid,
          reversed && styles.grid_reversed,
          bottomAlign && styles.grid_bottom,
          middleAlign && styles.grid_middle,
          topAlign && styles.grid_top,
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
