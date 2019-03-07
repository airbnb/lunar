import React from 'react';
import PropTypes from 'prop-types';
import { mutuallyExclusiveProps, requiredBy } from 'airbnb-prop-types';
import iconComponent from '../../prop-types/iconComponent';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import ProfilePhoto from '../ProfilePhoto';
import ButtonOrLink, { ButtonOrLinkTypes } from '../private/ButtonOrLink';

export type Props = {
  /** Primary chip contents. */
  children: NonNullable<React.ReactNode>;
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
    const { children, disabled, icon, onClick, onIconClick, profileImageSrc, styles } = this.props;

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
        {...css(
          styles.chip,
          onClick && styles.chip_button,
          !profileImageSrc && styles.chip_noBefore,
          !icon && styles.chip_noAfter,
          disabled && styles.chip_disabled,
        )}
        {...props}
      >
        {profileImageSrc && (
          <div {...css(styles.chipItem, styles.sideContent)}>
            <div {...css(styles.sideContentInner)}>
              <ProfilePhoto imageSrc={profileImageSrc} title="" size={4} />
            </div>
          </div>
        )}

        <div {...css(styles.chipItem, styles.content)}>{children}</div>

        {icon && (
          <div {...css(styles.chipItem, styles.sideContent)}>
            <div {...css(styles.sideContentInner, styles.iconWrapper)}>
              {onIconClick ? (
                <ButtonOrLink
                  {...css(styles.iconButton, disabled && styles.iconButton_disabled)}
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
