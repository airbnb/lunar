import React from 'react';
import childrenWithComponentName from '../../prop-types/childrenWithComponentName';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import Item from './Item';

export { Item };

export type Props = {
  /** Bordered list items. */
  children: NonNullable<React.ReactNode>;
};

class BorderedList extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    children: childrenWithComponentName('BorderedListItem').isRequired,
  };

  render() {
    const { children, styles } = this.props;

    return <ul {...css(styles.list)}>{children}</ul>;
  }
}

export default withStyles(() => ({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
}))(BorderedList);
