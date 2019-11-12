import React from 'react';
import PropTypes from 'prop-types';
import { mutuallyExclusiveProps, requiredBy } from 'airbnb-prop-types';
import iconComponent from '../../prop-types/iconComponent';
import useStyles from '../../hooks/useStyles';
import ProfilePhoto from '../ProfilePhoto';
import ButtonOrLink, { ButtonOrLinkTypes } from '../private/ButtonOrLink';
import { styleSheet } from './styles';

export type Props = {
  /** Renders with a primary background and white text. */
  active?: boolean;
  /** Icon to render to the right of the primary content. */
  afterIcon?: React.ReactNode;
  /** Icon to render to the left of the primary content. */
  beforeIcon?: React.ReactNode;
  /** Primary chip contents. */
  children: NonNullable<React.ReactNode>;
  /** Renders with less padding and sharper corners. */
  compact?: boolean;
  /** Disabled / gray. */
  disabled?: boolean;
  /** Pass an HTML element attribute id. */
  id?: string;
  /** Callback fired when the element is clicked. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback fired when the icon is clicked (requires an icon). */
  onIconClick?: (event: React.MouseEvent<ButtonOrLinkTypes>) => void;
  /** Profile photo to render to the left of the primary content. */
  profileImageSrc?: string;
  /** A tracking name to identify this component when element is clicked. */
  trackingName?: string;
};

/** Compact component that represents a snippet of information, such as a filter. */
function Chip({
  active,
  afterIcon,
  beforeIcon,
  children,
  compact,
  disabled,
  id,
  onClick,
  onIconClick,
  profileImageSrc,
  trackingName,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  const Component = onClick ? 'button' : 'div';
  const props: React.HTMLProps<HTMLButtonElement> =
    Component === 'button'
      ? {
          disabled,
          onClick,
          type: 'button',
          ...(trackingName && { 'data-tracking-name': trackingName }),
        }
      : {};

  const shouldRenderBefore = beforeIcon || profileImageSrc;

  return (
    // @ts-ignore [ts] JSX element type 'Component' does not have any construct or call signatures. [2604]
    <Component
      className={cx(
        styles.chip,
        onClick && styles.chip_button,
        !shouldRenderBefore && styles.chip_noBefore,
        !afterIcon && styles.chip_noAfter,
        active && styles.chip_active,
        onClick && active && styles.chip_active_button,
        compact && styles.chip_compact,
        disabled && styles.chip_disabled,
      )}
      {...props}
      id={id}
    >
      {shouldRenderBefore && (
        <div className={cx(styles.chipItem, styles.sideContent)}>
          <div
            className={cx(
              styles.sideContentInner,
              !!beforeIcon && styles.iconWrapper,
              !!beforeIcon && styles.iconWrapperBefore,
            )}
          >
            {profileImageSrc && <ProfilePhoto imageSrc={profileImageSrc} title="" size={4} />}
            {beforeIcon}
          </div>
        </div>
      )}
      <div className={cx(styles.chipItem, styles.content)}>{children}</div>
      {afterIcon && (
        <div className={cx(styles.chipItem, styles.sideContent)}>
          <div className={cx(styles.sideContentInner, styles.iconWrapper, styles.iconWrapperAfter)}>
            {onIconClick ? (
              <ButtonOrLink
                className={cx(styles.iconButton, disabled && styles.iconButton_disabled)}
                disabled={disabled}
                onClick={onIconClick}
              >
                {afterIcon}
              </ButtonOrLink>
            ) : (
              afterIcon
            )}
          </div>
        </div>
      )}
    </Component>
  );
}

Chip.propTypes = {
  afterIcon: requiredBy('onIconClick', iconComponent),
  beforeIcon: mutuallyExclusiveProps(PropTypes.node, 'beforeIcon', 'profileImageSrc'),
  compact: mutuallyExclusiveProps(PropTypes.any, 'profileImageSrc', 'compact'),
  profileImageSrc: mutuallyExclusiveProps(
    PropTypes.any,
    'beforeIcon',
    'profileImageSrc',
    'compact',
  ),
  onClick: mutuallyExclusiveProps(PropTypes.func, 'onIconClick'),
};

export default Chip;
