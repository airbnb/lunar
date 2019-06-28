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
  /** @ignore */
  horizontal?: boolean;
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
    horizontal: false,
    spacious: false,
  };

  render() {
    const { bordered, children, compact, cx, horizontal, spacious, styles } = this.props;

    return (
      <li
        className={cx(
          !horizontal && bordered && styles.item_bordered,
          horizontal && bordered && styles.item_bordered_horizontal,
          !horizontal && compact && styles.item_compact,
          horizontal && compact && styles.item_compact_horizontal,
          !horizontal && spacious && styles.item_spacious,
          horizontal && spacious && styles.item_spacious_horizontal,
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

  item_bordered_horizontal: {
    borderLeft: ui.border,

    ':last-child': {
      borderRight: ui.border,
    },
  },

  item_compact: {
    paddingBottom: unit * 1.5,
    paddingTop: unit * 1.5,
  },

  item_compact_horizontal: {
    paddingLeft: unit * 1.5,
    paddingRight: unit * 1.5,
  },

  item_spacious: {
    paddingBottom: unit * 3,
    paddingTop: unit * 3,
  },

  item_spacious_horizontal: {
    paddingLeft: unit * 3,
    paddingRight: unit * 3,
  },
}))(ListItem);
