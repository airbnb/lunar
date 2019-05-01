import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';

const sizingProp = mutuallyExclusiveTrueProps('micro', 'small', 'large');
const emphasisProp = mutuallyExclusiveTrueProps('bold', 'light');
const stateProp = mutuallyExclusiveTrueProps('disabled', 'muted', 'inverted');
const alignProp = mutuallyExclusiveTrueProps('centerAlign', 'endAlign', 'startAlign');

export type Props = {
  /** Render the text inline instead of block. */
  baseline?: boolean;
  /** Apply bold emphasis. */
  bold?: boolean;
  /** Align the text to the center. */
  centerAlign?: boolean;
  /** The text to render. */
  children?: React.ReactNode;
  /** Mark the text as disabled. */
  disabled?: boolean;
  /** Align the text to the end. */
  endAlign?: boolean;
  /** Render the text inline-block instead of block. */
  inline?: boolean;
  /** Invert text colors. */
  inverted?: boolean;
  /** Increase font size to large. */
  large?: boolean;
  /** Apply light emphasis. */
  light?: boolean;
  /** Decrease font size to small. */
  micro?: boolean;
  /** Mark the text as muted. */
  muted?: boolean;
  /** Preserve whitespace at the beginning and end of children. */
  preserveWhitespace?: boolean;
  /** Decrease font size to small. */
  small?: boolean;
  /** Align the text to the start. */
  startAlign?: boolean;
  /** Truncate the text with an ellipsis. */
  truncated?: boolean;
  /** Uppercase all text. */
  uppercased?: boolean;
};

/** Display a string of text with pre-defined sizing, emphasis, and state styling. */
export class Text extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    bold: emphasisProp,
    centerAlign: alignProp,
    disabled: stateProp,
    endAlign: alignProp,
    inverted: stateProp,
    large: sizingProp,
    light: emphasisProp,
    micro: sizingProp,
    muted: stateProp,
    small: sizingProp,
    startAlign: alignProp,
  };

  static defaultProps = {
    baseline: false,
    bold: false,
    centerAlign: false,
    children: null,
    disabled: false,
    endAlign: false,
    inline: false,
    inverted: false,
    large: false,
    light: false,
    micro: false,
    muted: false,
    preserveWhitespace: false,
    small: false,
    startAlign: false,
    truncated: false,
    uppercased: false,
  };

  render() {
    const {
      baseline,
      bold,
      centerAlign,
      children,
      disabled,
      endAlign,
      inline,
      inverted,
      large,
      light,
      micro,
      muted,
      preserveWhitespace,
      small,
      startAlign,
      styles,
      truncated,
      uppercased,
    } = this.props;
    let Tag: 'div' | 'span' | 'small' | 'h4' = 'div';

    if (inline) {
      Tag = 'span';
    } else if (micro) {
      Tag = 'small';
    } else if (large) {
      Tag = 'h4';
    }

    return (
      <Tag
        {...css(
          styles.text,
          bold && styles.text_bold,
          disabled && styles.text_disabled,
          inline && styles.text_inline,
          baseline && styles.text_baseline,
          inverted && styles.text_inverted,
          large && styles.text_large,
          light && styles.text_light,
          micro && styles.text_micro,
          muted && styles.text_muted,
          preserveWhitespace && styles.text_preserveWhitespace,
          small && styles.text_small,
          truncated && styles.text_truncated,
          uppercased && styles.text_uppercased,
          centerAlign && styles.text_center,
          endAlign && styles.text_end,
          startAlign && styles.text_start,
        )}
      >
        {children}
      </Tag>
    );
  }
}

export default withStyles(({ color, font, pattern }) => ({
  text: {
    ...font.textReset,
    ...font.textRegular,
    color: color.accent.text,
  },

  text_baseline: {
    display: 'inline',
  },

  text_inline: {
    display: 'inline-block',
  },

  text_preserveWhitespace: {
    whiteSpace: 'pre-wrap',
  },

  text_micro: {
    ...font.textMicro,
  },

  text_small: {
    ...font.textSmall,
  },

  text_large: {
    ...font.textLarge,
  },

  text_disabled: {
    ...pattern.disabled,
  },

  text_inverted: {
    color: color.base,
  },

  text_muted: {
    color: color.muted,
  },

  text_bold: {
    fontWeight: font.weights.semibold,
  },

  text_light: {
    fontWeight: font.weights.light,
  },

  text_truncated: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    '@selectors': {
      '> div': {
        display: 'inline',
      },
    },
  },

  text_uppercased: {
    textTransform: 'uppercase',
  },

  text_center: {
    textAlign: 'center',
  },

  text_end: {
    textAlign: 'right',
  },

  text_start: {
    textAlign: 'left',
  },
}))(Text);
