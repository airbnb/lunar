import React from 'react';
import PropTypes from 'prop-types';
import { mutuallyExclusiveProps, requiredBy } from 'airbnb-prop-types';
import iconComponent from '../../prop-types/iconComponent';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ProfilePhoto from '../ProfilePhoto';
import ButtonOrLink, { ButtonOrLinkTypes } from '../private/ButtonOrLink';

export type Props = {
  /** Renders with a primary background and white text */
  active?: boolean;
  /** Primary chip contents. */
  children: NonNullable<React.ReactNode>;
  /** Renders with less padding and sharper corners. */
  compact?: boolean;
  /** Disabled / gray. */
  disabled?: boolean;
  /** Icon to render to the right of the primary content. */
  icon?: React.ReactNode;
  /** Callback fired when the element is clicked. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback fired when the icon is clicked (requires an icon). */
  onIconClick?: (event: React.MouseEvent<ButtonOrLinkTypes>) => void;
  /** Profile photo to render to the left of the primary content. */
  profileImageSrc?: string;
};

/** Compact component that represents a snippet of information, such as a filter. */
export class Chip extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    icon: requiredBy('onIconClick', iconComponent),
    onClick: mutuallyExclusiveProps(PropTypes.func, 'onIconClick'),
  };

  render() {
    const {
      cx,
      active,
      children,
      compact,
      disabled,
      icon,
      onClick,
      onIconClick,
      profileImageSrc,
      styles,
    } = this.props;

    const Component = onClick ? 'button' : 'div';
    const props: React.HTMLProps<HTMLButtonElement> =
      Component === 'button'
        ? {
            disabled,
            onClick,
            type: 'button',
          }
        : {};

    return (
      // @ts-ignore [ts] JSX element type 'Component' does not have any construct or call signatures. [2604]
      <Component
        className={cx(
          styles.chip,
          onClick && styles.chip_button,
          !profileImageSrc && styles.chip_noBefore,
          !icon && styles.chip_noAfter,
          active && styles.chip_active,
          onClick && active && styles.chip_active_button,
          compact && styles.chip_compact,
          disabled && styles.chip_disabled,
        )}
        {...props}
      >
        {profileImageSrc && (
          <div className={cx(styles.chipItem, styles.sideContent)}>
            <div className={cx(styles.sideContentInner)}>
              <ProfilePhoto imageSrc={profileImageSrc} title="" size={4} />
            </div>
          </div>
        )}

        <div className={cx(styles.chipItem, styles.content)}>{children}</div>

        {icon && (
          <div className={cx(styles.chipItem, styles.sideContent)}>
            <div className={cx(styles.sideContentInner, styles.iconWrapper)}>
              {onIconClick ? (
                <ButtonOrLink
                  className={cx(styles.iconButton, disabled && styles.iconButton_disabled)}
                  disabled={disabled}
                  onClick={onIconClick}
                >
                  {icon}
                </ButtonOrLink>
              ) : (
                icon
              )}
            </div>
          </div>
        )}
      </Component>
    );
  }
}

export default withStyles(({ color, font, pattern, transition, ui, unit }) => ({
  chip: {
    ...transition.box,
    ...font.textSmall,
    backgroundColor: color.accent.bg,
    border: ui.border,
    borderRadius: unit * 4,
    display: 'inline-block',
    height: unit * 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },

  chip_noBefore: {
    paddingLeft: unit,
  },

  chip_noAfter: {
    paddingRight: unit,
  },

  chip_active: {
    background: color.core.primary[3],
    borderColor: color.core.primary[3],
    color: color.accent.bg,
  },

  chip_active_button: {
    '@selectors': {
      ':not([disabled]):hover': {
        backgroundColor: color.core.primary[4],
      },
    },
  },

  chip_compact: {
    borderRadius: 2,
    padding: `0 ${unit}`,
    height: 3 * unit,
  },

  chip_disabled: {
    backgroundColor: color.core.neutral[1],
    cursor: 'normal',
    borderColor: color.core.neutral[1],
  },

  chip_button: {
    cursor: 'pointer',
    padding: 0,

    '@selectors': {
      ':not([disabled]):active': {
        boxShadow: ui.boxShadow,
      },

      ':not([disabled]):hover': {
        backgroundColor: color.accent.bgHover,
      },
    },

    ':focus': {
      backgroundColor: color.accent.bgHover,
      outline: 'none',
    },
  },

  chipItem: {
    height: '100%',
    verticalAlign: 'middle',
  },

  content: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    marginLeft: unit,
    marginRight: unit,
  },

  iconWrapper: {
    padding: `${unit * 0.5}px ${unit * 0.5}px ${unit * 0.5}px 0`,
    color: color.core.neutral[3],
  },

  iconButton: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],

    ':hover': {
      color: color.core.primary[3],
    },

    ':focus': {
      color: color.core.primary[3],
      outline: 'none',
    },
  },

  iconButton_disabled: {
    ...pattern.disabled,

    ':hover': {
      color: color.core.neutral[6],
    },
  },

  sideContent: {
    display: 'inline-block',
  },

  sideContentInner: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
}))(Chip);
