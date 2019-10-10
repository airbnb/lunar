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
  /** Secondary tab style, implies borderless. */
  secondary?: boolean;
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
    secondary: false,
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
      secondary,
      selected,
      small,
      stretched,
      styles,
    } = this.props;
    const trackingName = upperFirst(camelCase(keyName || 'Tab'));
    const noBorder = secondary || borderless;
    const noHover = secondary || (noBorder && disabled);

    return (
      <span
        className={cx(
          styles.tab,
          secondary && styles.tab_secondary,
          disabled && styles.tab_disabled,
          noBorder && styles.tab_noBorder,
          noHover && styles.tab_noHover,
          selected && !secondary && styles.tab_selected,
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
              secondary && styles.tabButton_secondary,
              selected && styles.tabButton_selected,
              selected && secondary && styles.tabButton_secondary_selected,
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

  tab_secondary: {
    marginRight: unit,
    borderWidth: 0,
    marginBottom: 0,
  },

  tab_noBorder: {
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

  tab_noHover: {
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

  tabButton_secondary: {
    ...pattern.regularButton,
    paddingTop: unit / 2,
    paddingBottom: (unit / 8) * 5,
    fontWeight: 'normal',
    justifyContent: 'center',
    border: `${ui.borderWidth}px solid ${color.clear}`,
    backgroundColor: color.clear,
    borderRadius: ui.borderRadius,
    ':hover': {
      borderColor: color.accent.borderHover,
      backgroundColor: color.core.neutral[1],
    },
  },

  tabButton_selected: {
    color: color.accent.textActive,
  },

  tabButton_secondary_selected: {
    borderColor: color.accent.borderActive,
    backgroundColor: color.accent.bg,
    ':hover': {
      borderColor: color.core.primary[4],
      backgroundColor: color.accent.bgHover,
    },
  },

  tabButton_disabled: {
    ...pattern.disabled,
    pointerEvents: 'none',
  },

  tabButton_small: {
    ...font.textSmall,
  },
}))(Tab);
