import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import List from '../List';
import Breadcrumb from './Breadcrumb';

export type Props = {
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Breadcrumbs. */
  children: NonNullable<React.ReactNode>;
};

/** A controller for multiple tabs. */
export class Breadcrumbs extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    children: childrenOfType(Breadcrumb).isRequired,
  };

  render() {
    const { cx, accessibilityLabel, children, styles } = this.props;

    return (
      <nav aria-label={accessibilityLabel}>
        <List horizontal ordered>
          {React.Children.map(children, child => {
            if (!child) {
              return null;
            }

            return <li className={cx(styles.li)}>{child}</li>;
          })}
        </List>
      </nav>
    );
  }
}

export { Breadcrumb };

export default withStyles(({ unit }) => ({
  li: {
    marginRight: unit,

    ':last-child': {
      marginRight: 0,
    },
  },
}))(Breadcrumbs);
