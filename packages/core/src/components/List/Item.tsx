import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

const paddingPropType = mutuallyExclusiveTrueProps('compact', 'spacious');

export type Props = {
  /** Render with a top/bottom borders. Last item will have both. */
  bordered?: boolean;
  /** Item content. */
  children: NonNullable<React.ReactNode>;
  /** Render with reduced vertical padding. */
  compact?: boolean;
  /** Render with vertical padding. */
  spacious?: boolean;
};

export class ListItem extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    compact: paddingPropType,
    spacious: paddingPropType,
  };

  static defaultProps = {
    bordered: false,
    compact: false,
    spacious: false,
  };

  render() {
    const { bordered, children, compact, cx, spacious, styles } = this.props;

    return (
      <li
        className={cx(
          bordered && styles.item_bordered,
          compact && styles.item_compact,
          spacious && styles.item_spacious,
        )}
      >
        {children}
      </li>
    );
  }
}

export default withStyles(({ ui, unit }) => ({
  item_bordered: {
    borderTop: ui.border,

    ':last-child': {
      borderBottom: ui.border,
    },
  },

  item_compact: {
    paddingBottom: unit * 1.5,
    paddingTop: unit * 1.5,
  },

  item_spacious: {
    paddingBottom: unit * 3,
    paddingTop: unit * 3,
  },
}))(ListItem);
