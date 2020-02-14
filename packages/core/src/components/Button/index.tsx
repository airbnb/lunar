import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import ButtonOrLink, { ButtonOrLinkProps } from '../private/ButtonOrLink';
import Loader from '../Loader';
import { buttonStyleSheet } from './styles';

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
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A standard button and or link for common UI interactions. */
function Button({
  block,
  borderless,
  children,
  disabled,
  invalid,
  inverted,
  large,
  loading,
  small,
  styleSheet,
  ...restProps
}: ButtonProps) {
  const [styles, cx] = useStyles(styleSheet ?? buttonStyleSheet);

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

Button.propTypes = {
  large: sizingProp,
  small: sizingProp,
};

export default Button;
