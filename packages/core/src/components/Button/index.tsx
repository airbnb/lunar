import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import Loader from '../Loader';

const sizingProp = mutuallyExclusiveTrueProps('small', 'large');

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export type Props = ButtonOrLinkProps & {
  /** Render as a block with full width. */
  block?: boolean;
  /** Render as borderless. */
  borderless?: boolean;
  /** @ignore Hidden prop used in forms. */
  invalid?: boolean;
  /** Invert text colors. */
  inverted?: boolean;
  /** Increase font size to large. */
  large?: boolean;
  /** Decrease font size to small. */
  small?: boolean;
};

/** A standard button and or link for common UI interactions. */
export class Button extends React.Component<Props & WithStylesProps> {
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

export default withStyles(
  ({ color, font, pattern, ui, unit, transition }) => ({
    button: {
      ...pattern.resetButton,
      ...transition.box,
      fontWeight: font.weights.bold,
      position: 'relative',
      color: color.base,
      backgroundColor: color.core.primary[3],
      border: `2px solid ${color.core.primary[3]}`,
      borderRadius: ui.borderRadius,
      textAlign: 'center',

      '@selectors': {
        // Removes weird bonus padding from button in Firefox
        '::-moz-focus-inner': {
          border: 0,
          padding: 0,
          margin: 0,
        },

        // Only show hover states on non-disabled
        ':not([disabled]):hover': {
          backgroundColor: color.core.primary[4],
          borderColor: color.core.primary[4],
        },
      },
    },

    button_block: {
      display: 'block',
      width: '100%',
      whiteSpace: 'normal',
      overflow: 'hidden',
    },

    button_borderless: {
      borderColor: 'transparent',

      '@selectors': {
        ':not([disabled]):hover': {
          borderColor: color.accent.bgHover,
        },
      },
    },

    button_disabled: {
      ...pattern.disabled,
    },

    button_invalid: {},

    button_inverted: {
      color: color.core.primary[3],
      backgroundColor: color.accent.bg,

      '@selectors': {
        ':not([disabled]):hover': {
          color: color.core.primary[4],
          backgroundColor: color.accent.bgHover,
        },
      },
    },

    button_loading: {
      cursor: 'default',
    },

    button_small: {
      ...pattern.smallButton,
      minWidth: GOLDEN_RATIO * 4 * unit,
    },

    button_regular: {
      ...pattern.regularButton,
      minWidth: GOLDEN_RATIO * 6 * unit,
    },

    button_large: {
      ...pattern.largeButton,
      minWidth: GOLDEN_RATIO * 8 * unit,
    },
  }),
  {
    extendable: true,
  },
)(Button);
