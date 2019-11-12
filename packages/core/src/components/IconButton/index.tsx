import React from 'react';
import iconComponent from '../../prop-types/iconComponent';
import useStyles from '../../hooks/useStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import Tooltip from '../Tooltip';
import { styleSheet } from './styles';

export type Props = ButtonOrLinkProps & {
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
};

/** A button with an icon as content, and an optional tooltip. */
function IconButton({ children, active, disabled, inverted, tooltip, ...restProps }: Props) {
  const [styles, cx] = useStyles(styleSheet);

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
