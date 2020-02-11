import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink, { ButtonOrLinkProps } from '../private/ButtonOrLink';
import Loader from '../Loader';
import { styleSheet } from './styles';

const sizingProp = mutuallyExclusiveTrueProps('small', 'large');

export type ButtonProps = ButtonOrLinkProps & {
  /** Render as a block with full width. */
  block?: boolean;
  /** Render as borderless. */
  borderless?: boolean;
  /** @ignore Hidden prop used in forms. */
  invalid?: boolean;
  /** Invert text colors. */
  inverted?: boolean;
  /** Increase font size and padding to large. */
  large?: boolean;
  /** Decrease font size and padding to small. */
  small?: boolean;
};

/** A standard button and or link for common UI interactions. */
export class Button extends React.Component<ButtonProps & WithStylesProps> {
  static propTypes = {
    large: sizingProp,
    small: sizingProp,
  };

  static defaultProps = {
    block: false,
    borderless: false,
    disabled: false,
    invalid: false,
    inverted: false,
    large: false,
    loading: false,
    small: false,
  };

  render() {
    const {
      cx,
      block,
      borderless,
      children,
      disabled,
      invalid,
      inverted,
      large,
      loading,
      small,
      styles,
      ...restProps
    } = this.props;

    return (
      <ButtonOrLink
        {...restProps}
        aria-busy={loading}
        disabled={disabled}
        loading={loading}
        className={cx(
          styles.button,
          large && styles.button_large,
          small && styles.button_small,
          !large && !small && styles.button_regular,
          block && styles.button_block,
          (disabled || loading) && styles.button_disabled,
          (borderless || inverted) && styles.button_inverted,
          invalid && styles.button_invalid,
          borderless && styles.button_borderless,
          loading && styles.button_loading,
        )}
      >
        {loading ? <Loader inline inverted={!inverted} /> : children}
      </ButtonOrLink>
    );
  }
}

export default withStyles(styleSheet, {
  extendable: true,
})(Button);
