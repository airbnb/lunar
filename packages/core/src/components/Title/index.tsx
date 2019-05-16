import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';

const stateProp = mutuallyExclusiveTrueProps('muted', 'inverted', 'primary');
const alignProp = mutuallyExclusiveTrueProps('centerAlign', 'endAlign');

export type Props = {
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
};

/** Display a string of text as a heading and or section title. */
export class Title extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    centerAlign: alignProp,
    endAlign: alignProp,
    inverted: stateProp,
    muted: stateProp,
    primary: stateProp,
  };

  static defaultProps = {
    centerAlign: false,
    children: null,
    endAlign: false,
    inline: false,
    inverted: false,
    muted: false,
    primary: false,
  };

  render() {
    const {
      centerAlign,
      children,
      endAlign,
      inline,
      inverted,
      level,
      muted,
      primary,
      styles,
    } = this.props;
    const Tag: 'h1' | 'h2' | 'h3' = `h${level}` as any;

    return (
      <Tag
        {...css(
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
}

export default withStyles(({ color, font }) => ({
  title: {
    ...font.textReset,
    color: color.accent.text,
  },

  title_inline: {
    display: 'inline',
  },

  title_level1: {
    ...font.title1,
  },

  title_level2: {
    ...font.title2,
  },

  title_level3: {
    ...font.title3,
  },

  title_inverted: {
    color: color.base,
  },

  title_muted: {
    color: color.muted,
  },

  title_primary: {
    color: color.core.primary[3],
  },

  title_center: {
    textAlign: 'center',
  },

  title_right: {
    textAlign: 'right',
  },
}))(Title);
