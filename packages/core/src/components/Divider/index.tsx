import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Spacing, { SpacingRange } from '../Spacing';

export type Props = {
  /** Spacing on the bottom. */
  bottom?: SpacingRange;
  /** Spacing on the top. */
  top?: SpacingRange;
};

/** A horizontal divider. */
export class Divider extends React.Component<Props & WithStylesProps> {
  static defaultProps: Props = {
    bottom: 2,
    top: 2,
  };

  render() {
    const { cx, styles, bottom, top } = this.props;

    return (
      <Spacing bottom={bottom} top={top}>
        <div className={cx(styles.divider)} />
      </Spacing>
    );
  }
}

export default withStyles(({ ui }) => ({
  divider: {
    borderBottom: ui.border,
  },
}))(Divider);
