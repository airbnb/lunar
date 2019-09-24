import React from 'react';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import TrackingBoundary from '../TrackingBoundary';

export type Props = Pick<ButtonOrLinkProps, 'afterIcon' | 'beforeIcon' | 'disabled' | 'href'> & {
  /** Hide bottom border of Tab when unselected. */
  borderless?: boolean;
  /** Content to render if the tab is selected. */
  children?: React.ReactNode;
  /**
   * Unique key name for this tab.
   * @ignore
   */
  keyName?: string;
  /** Text to render in the tab. */
  label: NonNullable<React.ReactNode>;
  /** Callback fired when the tab is clicked. */
  onClick?: (key: string) => void;
  /** Callback fired when the tab is selected. */
  onSelected?: () => void;
  /** Rounded tab style, implies borderless. */
  rounded?: boolean;
  /** Whether the tab is selected or not. */
  selected?: boolean;
  /** Decrease font size to small. */
  small?: boolean;
  /** Stretch tabs to fill the full width. */
  stretched?: boolean;
};

/** A single tab button. Usually rendered amongst a collection of tabs. */
export class Tab extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    borderless: false,
    children: null,
    rounded: false,
    selected: false,
    small: false,
    stretched: false,
  };

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.selected && this.props.selected && this.props.onSelected) {
      this.props.onSelected();
    }
  }

  private handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.keyName!);
    }
  };

  render() {
    const {
      cx,
      afterIcon,
      beforeIcon,
      borderless,
      disabled,
      href,
      keyName,
      label,
      rounded,
      selected,
      small,
      stretched,
      styles,
    } = this.props;
    const trackingName = upperFirst(camelCase(keyName || 'Tab'));
    const noborder = rounded || borderless;
    const nohover = rounded || (noborder && disabled);

    return (
      <span
        className={cx(
          styles.tab,
          rounded && styles.tab_rounded,
          disabled && styles.tab_disabled,
          noborder && styles.tab_noborder,
          nohover && styles.tab_nohover,
          selected && !rounded && styles.tab_selected,
          stretched && styles.tab_stretched,
        )}
      >
        <TrackingBoundary name={trackingName}>
          <ButtonOrLink
            flexAlign
            aria-selected={selected}
            afterIcon={afterIcon}
            beforeIcon={beforeIcon}
            disabled={disabled}
            href={href}
            role="tab"
            className={cx(
              styles.tabButton,
              rounded && styles.tabButton_rounded,
              selected && styles.tabButton_selected,
              selected && rounded && styles.tabButton_rounded_selected,
              small && styles.tabButton_small,
              disabled && styles.tabButton_disabled,
            )}
            onClick={disabled ? undefined : this.handleClick}
          >
            {label}
          </ButtonOrLink>
        </TrackingBoundary>
      </span>
    );
  }
}

export default withStyles(({ color, font, pattern, unit, ui, transition }) => ({
  tab: {
    borderBottom: ui.borderThick,
    marginRight: unit * 4,
    marginBottom: -2,

    ':hover': {
      borderColor: color.accent.borderHover,
    },

    ':last-child': {
      marginRight: 0,
    },
  },

  tab_rounded: {
    marginRight: unit
  },

  tab_noborder: {
    borderColor: color.clear,
  },

  tab_selected: {
    borderColor: color.accent.borderActive,

    ':hover': {
      borderColor: color.accent.borderActive,
    },
  },

  tab_stretched: {
    flex: 1,
  },

  tab_disabled: {
    borderColor: color.accent.border,

    ':hover': {
      borderColor: color.accent.border,
    },
  },

  tab_nohover: {
    ':hover': {
      borderColor: color.clear,
    },
  },

  tabButton: {
    ...font.textReset,
    ...font.textRegular,
    ...transition.box,
    background: color.accent.bg,
    color: color.accent.text,
    display: 'flex',
    alignItems: 'center',
    paddingTop: unit,
    paddingBottom: unit,
    border: 0,
    cursor: 'pointer',
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: '100%',
    fontWeight: font.weights.bold,
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
  },

  tabButton_rounded: {
    ...pattern.regularButton,
    justifyContent: 'center',
    border: `2px solid ${color.accent.border}`,
    borderRadius: ui.borderRadius * 2,
    ':hover': {
      backgroundColor: color.accent.bgHover
    }
  },

  tabButton_selected: {
    color: color.accent.textActive,
  },

  tabButton_rounded_selected: {
    boxShadow: ui.boxShadowMedium,
    color: color.base,
    borderColor: color.core.secondary[4],
    backgroundColor: color.core.secondary[3],
    ':hover': {
      backgroundColor: 'none'
    },
  },

  tabButton_disabled: {
    ...pattern.disabled
  },

  tabButton_small: {
    ...font.textSmall,
  },
}))(Tab);
