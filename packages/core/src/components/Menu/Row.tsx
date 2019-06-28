import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Content to display in the row. */
  children: NonNullable<React.ReactNode>;
  /** Double the padding and spacing. */
  spacious?: boolean;
};

/** A non-interactive row within a menu. */
export class MenuRow extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    spacious: false,
  };

  render() {
    const { cx, children, spacious, styles } = this.props;

    return (
      <li role="none">
        <div className={cx(styles.item, spacious && styles.item_spacious)}>{children}</div>
      </li>
    );
  }
}

export default withStyles(({ unit }) => ({
  item: {
    display: 'block',
    width: '100%',
    padding: unit,
    border: 0,
    textAlign: 'left',
  },

  item_spacious: {
    padding: unit * 2,
  },
}))(MenuRow);
