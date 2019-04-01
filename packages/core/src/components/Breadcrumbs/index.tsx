import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
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
    const { accessibilityLabel, children, styles } = this.props;

    return (
      <nav aria-label={accessibilityLabel}>
        <ol {...css(styles.ol)}>
          {React.Children.map(children, child => {
            if (!child) {
              return null;
            }

            return <li {...css(styles.li)}>{child}</li>;
          })}
        </ol>
      </nav>
    );
  }
}

export { Breadcrumb };

export default withStyles(({ unit }) => ({
  ol: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  li: {
    marginRight: unit,

    ':last-child': {
      marginRight: 0,
    },
  },
}))(Breadcrumbs);
