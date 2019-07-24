import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Spacing, { SpacingRange } from '../Spacing';

export type Props = {
  /** Spacing on the bottom. */
  bottom?: SpacingRange;
  /** Render the divider with a short width. */
  short?: boolean;
  /** Spacing on the top. */
  top?: SpacingRange;
};

/** A horizontal divider. */
export class Divider extends React.Component<Props & WithStylesProps> {
  static defaultProps: Props = {
    bottom: 2,
    short: false,
    top: 2,
  };

  render() {
    const { cx, styles, bottom, short, top } = this.props;

    return (
      <Spacing bottom={bottom} top={top}>
        <div className={cx(styles.divider, short && styles.divider_short)} />
      </Spacing>
    );
  }
}

export default withStyles(({ ui, unit }) => ({
  divider: {
    borderBottom: ui.border,
  },
  divider_short: {
    width: 4 * unit,
  },
}))(Divider);
