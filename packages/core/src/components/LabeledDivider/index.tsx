import React from 'react';
import Text from '../Text';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** A label for the divider. Typically a string or i18n T node. */
  label: NonNullable<React.ReactNode>;
};

/** A horizontal divider with a label. */
export class LabeledDivider extends React.Component<Props & WithStylesProps> {
  render() {
    const { cx, styles, label } = this.props;

    return (
      <div className={cx(styles.rule)}>
        <Text small bold inline>
          {label}
        </Text>
      </div>
    );
  }
}

export default withStyles(({ ui }) => ({
  rule: {
    borderBottom: ui.border,
  },
}))(LabeledDivider);
