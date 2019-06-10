import React from 'react';
import iconComponent from '../../prop-types/iconComponent';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import Tooltip from '../Tooltip';

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
export class IconButton extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    children: iconComponent.isRequired,
  };

  static defaultProps = {
    active: false,
    disabled: false,
    inverted: false,
    tooltip: null,
  };

  render() {
    const { cx, children, active, disabled, inverted, tooltip, styles, ...restProps } = this.props;
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
}

export default withStyles(({ color, pattern, ui, unit, transition }) => ({
  button: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],
    padding: unit / 2,
    borderRadius: ui.borderRadius,

    '@selectors': {
      ':not([disabled]):hover': {
        color: color.core.primary[3],
        backgroundColor: color.accent.bgHover,
      },
    },
  },

  button_active: {
    color: color.core.primary[3],
  },

  button_inverted: {
    color: color.base,
  },

  button_disabled: {
    ...pattern.disabled,
  },
}))(IconButton);
