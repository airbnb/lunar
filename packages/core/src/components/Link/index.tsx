import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import Text from '../Text';

const sizingProp = mutuallyExclusiveTrueProps('small', 'large');
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
      muted,
      small,
      bold,
      styles,
      ...restProps
    } = this.props;

    return (
      <Text inline={!block} baseline={baseline} small={small} large={large} bold={bold}>
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

export default withStyles(
  ({ color, pattern, transition }) => ({
    link: {
      ...pattern.resetButton,
      ...transition.box,
      color: color.core.primary[3],
      textAlign: 'left',
      verticalAlign: 'baseline',

      ':active': {
        outline: 'none',
      },

      ':hover': {
        color: color.core.primary[4],
        textDecoration: 'underline',
      },
    },

    link_block: {
      display: 'block',
      width: '100%',
    },

    link_baseline: {
      display: 'inline',
    },

    link_inverted: {
      color: color.accent.bg,

      ':hover': {
        color: color.accent.bgHover,
      },
    },

    link_muted: {
      color: color.core.neutral[3],

      ':hover': {
        color: color.core.neutral[4],
      },
    },

    link_disabled: {
      ...pattern.disabled,

      ':hover': {
        textDecoration: 'none',
      },
    },
  }),
  {
    extendable: true,
  },
)(Link);
