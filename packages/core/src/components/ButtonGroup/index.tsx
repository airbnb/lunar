import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** List of components to group. */
  children: NonNullable<React.ReactNode>;
  /** Stack the buttons vertically. */
  stacked?: boolean;
};

/** Horizontally align `Button`s with a consistent gutter between each. */
export class ButtonGroup extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    stacked: false,
  };

  render() {
    const { cx, children, stacked, styles } = this.props;

    return (
      <div className={cx(styles.buttonGroup, stacked && styles.buttonGroup_stacked)}>
        {React.Children.map(children, child =>
          child ? (
            <div className={cx(stacked ? styles.cell_stacked : styles.cell)}>{child}</div>
          ) : null,
        )}
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },

  buttonGroup_stacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  cell: {
    marginRight: unit,

    ':last-of-type': {
      marginRight: 0,
    },

    ':empty': {
      display: 'none',
    },
  },

  cell_stacked: {
    marginBottom: unit,

    ':last-of-type': {
      marginBottom: 0,
    },
  },
}))(ButtonGroup);
