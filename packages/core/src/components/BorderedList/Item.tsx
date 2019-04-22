import React from 'react';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Item content. */
  children: NonNullable<React.ReactNode>;
  /** Render with reduced vertical padding. */
  compact?: boolean;
  /** Render with vertical padding. */
  spacious?: boolean;
};

class BorderedListItem extends React.Component<Props & WithStylesProps> {
  render() {
    const { children, compact, spacious, styles } = this.props;

    return (
      <li {...css(styles.item, compact && styles.item_compact, spacious && styles.item_spacious)}>
        {children}
      </li>
    );
  }
}

export default withStyles(({ ui, unit }) => ({
  item: {
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
}))(BorderedListItem);
