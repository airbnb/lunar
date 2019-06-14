import React from 'react';
import childrenWithComponentName from '../../prop-types/childrenWithComponentName';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Item from './Item';

export { Item };

export type Props = {
  /** List items. */
  children: NonNullable<React.ReactNode>;
  /** Flex align the items. */
  flexAlign?: boolean;
  /** Renders an `<ol></ol>`. */
  ordered?: boolean;
};

class List extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    children: childrenWithComponentName('ListItem?|li?').isRequired,
  };

  render() {
    const { children, cx, flexAlign, ordered, styles } = this.props;
    const Tag = ordered ? 'ol' : 'ul';

    return <Tag className={cx(styles.list, flexAlign && styles.list_flexAlign)}>{children}</Tag>;
  }
}

export default withStyles(() => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  list_flexAlign: {
    display: 'flex',
  },
}))(List);
