import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import Text from '../Text';
import { styleSheet } from './styles';

const sizingProp = mutuallyExclusiveTrueProps('micro', 'small', 'large');
const stateProp = mutuallyExclusiveTrueProps('disabled', 'muted', 'inverted');

export type Props = ButtonOrLinkProps & {
  /** Display element as block. */
  block?: boolean;
  /** Display element as inline. */
  baseline?: boolean;
  /** Invert text colors. */
  inverted?: boolean;
  /** Increase font size to large. */
  large?: boolean;
  /** Decrease font size to micro. */
  micro?: boolean;
  /** Mark the link as muted. */
  muted?: boolean;
  /** Decrease font size to small. */
  small?: boolean;
  /** Bold font. */
  bold?: boolean;
};

/** A standard link for... linking to things. */
export class Link extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    disabled: stateProp,
    inverted: stateProp,
    large: sizingProp,
    muted: stateProp,
    small: sizingProp,
  };

  static defaultProps = {
    baseline: false,
    block: false,
    bold: false,
    disabled: false,
    inverted: false,
    large: false,
    micro: false,
    muted: false,
    small: false,
  };

  render() {
    const {
      cx,
      block,
      baseline,
      children,
      disabled,
      inverted,
      large,
      micro,
      muted,
      small,
      bold,
      styles,
      ...restProps
    } = this.props;

    return (
      <Text
        inline={!block}
        baseline={baseline}
        micro={micro}
        small={small}
        large={large}
        bold={bold}
      >
        <ButtonOrLink
          {...restProps}
          disabled={disabled}
          className={cx(
            styles.link,
            inverted && styles.link_inverted,
            muted && styles.link_muted,
            disabled && styles.link_disabled,
            block && styles.link_block,
            baseline && styles.link_baseline,
          )}
        >
          {children}
        </ButtonOrLink>
      </Text>
    );
  }
}

export default withStyles(styleSheet, {
  extendable: true,
})(Link);
