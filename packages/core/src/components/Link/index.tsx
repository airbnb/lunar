import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import ButtonOrLink, { ButtonOrLinkProps } from '../private/ButtonOrLink';
import Text, { TextProps } from '../Text';
import { linkStyleSheet } from './styles';

const sizingProp = mutuallyExclusiveTrueProps('micro', 'small', 'large');
const stateProp = mutuallyExclusiveTrueProps('disabled', 'muted', 'inverted');

export type LinkProps = ButtonOrLinkProps & {
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
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
  /** Pass text props to the underlying text. */
  textProps?: Omit<TextProps, 'children' | 'styleSheet'>;
};

/** A standard link for... linking to things. */
function Link({
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
  styleSheet,
  textProps = {},
  ...restProps
}: LinkProps) {
  const [styles, cx] = useStyles(styleSheet ?? linkStyleSheet);

  return (
    <Text {...{ baseline, micro, small, large, bold, inline: !block, ...textProps }}>
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

Link.propTypes = {
  disabled: stateProp,
  inverted: stateProp,
  large: sizingProp,
  muted: stateProp,
  small: sizingProp,
};

export default Link;
