import React from 'react';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink from '../private/ButtonOrLink';
import DirectionalIcon from '../DirectionalIcon';

export type Props = {
  /** Mark the breadcrumb as disabled. */
  disabled?: boolean;
  /** Hide the breadcrumb icon. */
  hideIcon?: boolean;
  /** Mark the breadcrumb as highlighted. */
  highlighted?: boolean;
  /** @ignore */
  horizontal?: boolean;
  /** Pass an HTML element attribute id. */
  id?: string;
  /** Content to within the Breadcrumb. */
  label: string;
  /** Render an anchor link with a URL instead of a button. */
  href?: string;
  /** Callback fired when the breadcrumb is clicked. */
  onClick?: () => void;
  /** Mark the breadcrumb as selected. */
  selected?: boolean;
  /** A tracking name to identify this component. */
  trackingName?: string;
};

/** A single breadcrumb button. Usually rendered amongst a collection of breadcrumbs. */
class Breadcrumb extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    disabled: false,
    hideIcon: false,
    highlighted: false,
    href: '',
    selected: false,
  };

  private handleClick = () => {
    const { onClick } = this.props;

    if (onClick) {
      onClick();
    }
  };

  render() {
    const {
      cx,
      disabled,
      hideIcon,
      highlighted,
      id,
      label,
      href,
      onClick,
      selected,
      styles,
      trackingName,
    } = this.props;
    const clickable = !disabled && (!!href || !!onClick);
    const aria = selected ? { 'aria-current': 'page' } : {};

    return (
      <li className={cx(styles.li)}>
        <ButtonOrLink
          {...aria}
          className={cx(
            styles.breadcrumb,
            clickable && styles.breadcrumb_clickable,
            highlighted && styles.breadcrumb_highlighted,
            clickable && highlighted && styles.breadcrumb_highlighted_clickable,
            selected && styles.breadcrumb_selected,
            disabled && styles.breadcrumb_disabled,
          )}
          afterIcon={
            hideIcon ? null : (
              <DirectionalIcon
                decorative
                direction="right"
                left={IconChevronLeft}
                right={IconChevronRight}
                size={24}
              />
            )
          }
          disabled={disabled}
          href={href}
          trackingName={trackingName}
          id={id}
          onClick={this.handleClick}
        >
          {label}
        </ButtonOrLink>
      </li>
    );
  }
}

export default withStyles(({ color, font, pattern, transition, unit }) => ({
  breadcrumb: {
    ...pattern.resetButton,
    ...font.textRegular,
    ...transition.box,
    color: color.core.neutral[5],
    cursor: 'default',
    outline: 'none',
  },

  breadcrumb_clickable: {
    cursor: 'pointer',

    '@selectors': {
      ':not([disabled]):hover, :not([disabled]):focus': {
        color: color.core.neutral[4],
      },
    },
  },

  breadcrumb_disabled: {
    ...pattern.disabled,
  },

  breadcrumb_highlighted: {
    color: color.core.primary[3],
  },

  breadcrumb_highlighted_clickable: {
    '@selectors': {
      ':not([disabled]):hover, :not([disabled]):focus': {
        color: color.core.primary[4],
      },
    },
  },

  breadcrumb_selected: {
    fontWeight: font.weights.semibold,
  },

  li: {
    marginRight: unit,

    ':last-child': {
      marginRight: 0,
    },
  },
}))(Breadcrumb);
