import React from 'react';
import childrenWithComponentName from '../../prop-types/childrenWithComponentName';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Item, { Props as ItemProps } from './Item';

export { Item };

export type Props = {
  /** List items. */
  children: NonNullable<React.ReactNode>;
  /** Horizontal list. */
  horizontal?: boolean;
  /** Renders an `<ol></ol>`. */
  ordered?: boolean;
  /** Wrap horizontal list. */
  wrap?: boolean;
};

class List extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    children: childrenWithComponentName('ListItem|li').isRequired,
  };

  render() {
    const { children, cx, horizontal, ordered, styles, wrap } = this.props;
    const Tag = ordered ? 'ol' : 'ul';

    return (
      <Tag
        className={cx(
          styles.list,
          horizontal && styles.list_horizontal,
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

export default withStyles(() => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  list_horizontal: {
    display: 'flex',
  },

  list_horizontal_wrap: {
    flexWrap: 'wrap',
  },
}))(List);
