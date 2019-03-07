import React from 'react';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /**
   * TypeScript was complaining about styles not existing on this component unless
   * a property existed in this type. I have no idea why.
   * @ignore
   */
  fakeProp?: any;
};

/** A separator between menu items. */
export class MenuSeparator extends React.Component<Props & WithStylesProps> {
  render() {
    const { styles } = this.props;

    return (
      <li role="separator">
        <hr {...css(styles.separator)} />
      </li>
    );
  }
}

export default withStyles(({ color, unit }) => ({
  separator: {
    marginTop: unit,
    marginBottom: unit,
    padding: 0,
    border: 0,
    height: 1,
    background: color.accent.border,
  },
}))(MenuSeparator);
