import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetTitle } from './styles';

export type TitleProps = {
  /** Align the text in the center. */
  centerAlign?: boolean;
  /** The text to render. */
  children?: React.ReactNode;
  /** Align the text on the end. */
  endAlign?: boolean;
  /** Render the text inline instead of block. */
  inline?: boolean;
  /** Invert text colors. */
  inverted?: boolean;
  /** Heading level of the text, with 1 being the greatest. */
  level: 1 | 2 | 3;
  /** Mark the text as muted. */
  muted?: boolean;
  /** Render with primary color text. */
  primary?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Display a string of text as a heading and or section title. */
function Title({
  centerAlign,
  children,
  endAlign,
  inline,
  inverted,
  level,
  muted,
  primary,
  styleSheet,
}: TitleProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetTitle);

  const Tag: 'h1' | 'h2' | 'h3' = `h${level}` as 'h1';

  return (
    <Tag
      className={cx(
        styles.title,
        level === 1 && styles.title_level1,
        level === 2 && styles.title_level2,
        level === 3 && styles.title_level3,
        inline && styles.title_inline,
        inverted && styles.title_inverted,
        muted && styles.title_muted,
        primary && styles.title_primary,
        centerAlign && styles.title_center,
        endAlign && styles.title_right,
      )}
    >
      {children}
    </Tag>
  );
}

const stateProp = mutuallyExclusiveTrueProps('muted', 'inverted', 'primary');
const alignProp = mutuallyExclusiveTrueProps('centerAlign', 'endAlign');

Title.propTypes = {
  centerAlign: alignProp,
  endAlign: alignProp,
  inverted: stateProp,
  muted: stateProp,
  primary: stateProp,
};

export default Title;
