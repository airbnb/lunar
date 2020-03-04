import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetText } from './styles';

export type TextProps = {
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
  /** Disable text and white space wrapping. */
  noWrap?: boolean;
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
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Display a string of text with pre-defined sizing, emphasis, and state styling. */
function Text({
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
  noWrap,
  preserveWhitespace,
  small,
  startAlign,
  truncated,
  uppercased,
  styleSheet,
}: TextProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetText);

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
      className={cx(
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
        micro && uppercased && styles.text_uppercased_micro,
        centerAlign && styles.text_center,
        endAlign && styles.text_end,
        startAlign && styles.text_start,
        noWrap && styles.text_noWrap,
      )}
    >
      {children}
    </Tag>
  );
}

const sizingProp = mutuallyExclusiveTrueProps('micro', 'small', 'large');
const emphasisProp = mutuallyExclusiveTrueProps('bold', 'light');
const stateProp = mutuallyExclusiveTrueProps('disabled', 'muted', 'inverted');
const alignProp = mutuallyExclusiveTrueProps('centerAlign', 'endAlign', 'startAlign');

Text.propTypes = {
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

export default Text;
