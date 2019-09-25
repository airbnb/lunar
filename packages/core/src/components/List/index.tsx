import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Item, { Props as ItemProps } from './Item';

export { Item };

export type Props = {
  /** List items. */
  children: NonNullable<React.ReactNode>;
  /** Apply gutters between `li`s. */
  gutter?: boolean;
  /** Horizontal list. */
  horizontal?: boolean;
  /** Renders an `<ol></ol>`. */
  ordered?: boolean;
  /** Wrap horizontal list. */
  wrap?: boolean;
};

class List extends React.Component<Props & WithStylesProps> {
  render() {
    const { children, cx, gutter, horizontal, ordered, styles, wrap } = this.props;
    const Tag = ordered ? 'ol' : 'ul';

    return (
      <Tag
        className={cx(
          styles.list,
          !horizontal && gutter && styles.list_gutter,
          horizontal && styles.list_horizontal,
          horizontal && gutter && styles.list_gutter_horizontal,
          horizontal && wrap && styles.list_horizontal_wrap,
        )}
      >
        {React.Children.map(children, child => {
          if (!child) {
            return null;
          }

          if (horizontal) {
            return React.cloneElement(child as React.ReactElement<ItemProps>, { horizontal });
          }

          return child;
        })}
      </Tag>
    );
  }
}

export default withStyles(({ unit }) => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  list_gutter: {
    '@selectors': {
      '> li': {
        marginBottom: unit / 2,
      },

      '> li:last-child': {
        marginBottom: 0,
      },
    },
  },

  list_gutter_horizontal: {
    '@selectors': {
      '> li': {
        marginBottom: 0,
        marginRight: unit,
      },

      '> li:last-child': {
        marginRight: 0,
      },
    },
  },

  list_horizontal: {
    display: 'flex',
  },

  list_horizontal_wrap: {
    flexWrap: 'wrap',
  },
}))(List);
