import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import Text from '../Text';
import baseStyleSheet from './styles';

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
  /** @ignore Hidden prop use for extending styles. */
  styleSheet?: StyleSheet;
};

/** A standard link for... linking to things. */
export default function Link({
  block,
  baseline,
  children,
  disabled,
  inverted,
  large,
  muted,
  small,
  bold,
  styleSheet,
  ...restProps
}: Props) {
  const [styles, cx] = useStyles(styleSheet || baseStyleSheet);

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

const sizingProp = mutuallyExclusiveTrueProps('small', 'large');
const stateProp = mutuallyExclusiveTrueProps('disabled', 'muted', 'inverted');

Link.propTypes = {
  disabled: stateProp,
  inverted: stateProp,
  large: sizingProp,
  muted: stateProp,
  small: sizingProp,
};
