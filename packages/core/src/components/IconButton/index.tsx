import React from 'react';
import iconComponent from '../../prop-types/iconComponent';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import ButtonOrLink, { ButtonOrLinkProps } from '../private/ButtonOrLink';
import Tooltip from '../Tooltip';
import { styleSheetIconButton } from './styles';

export type IconButtonProps = ButtonOrLinkProps & {
  /** @ignore */
  afterIcon?: React.ReactNode;
  /** @ignore */
  beforeIcon?: React.ReactNode;
  /** Mark as active. */
  active?: boolean;
  /** Invert text colors. */
  inverted?: boolean;
  /** Wrap the button in a tooltip. */
  tooltip?: React.ReactNode;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A button with an icon as content, and an optional tooltip. */
function IconButton({
  children,
  active,
  disabled,
  inverted,
  tooltip,
  styleSheet,
  ...restProps
}: IconButtonProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetIconButton);

  const button = (
    <ButtonOrLink
      {...restProps}
      disabled={disabled}
      className={cx(
        styles.button,
        active && styles.button_active,
        inverted && styles.button_inverted,
        disabled && styles.button_disabled,
      )}
    >
      {children}
    </ButtonOrLink>
  );

  return tooltip ? (
    <Tooltip content={tooltip} disabled={disabled}>
      {button}
    </Tooltip>
  ) : (
    button
  );
}

IconButton.propTypes = {
  children: iconComponent.isRequired,
};

export default IconButton;
