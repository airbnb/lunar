import React from 'react';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink from '../private/ButtonOrLink';
import TrackingBoundary from '../TrackingBoundary';

export type Props = {
  /** Hide bottom border of Tab when unselected. */
  borderless?: boolean;
  /** Content to render if the tab is selected. */
  children?: React.ReactNode;
  /** Disable the tab button. */
  disabled?: boolean;
  /** Render an anchor link with a URL instead of a button. */
  href?: string;
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
  /** Whether the tab is selected or not. */
  selected?: boolean;
  /** Stretch tabs to fill the full width. */
  stretched?: boolean;
};

/** A single tab button. Usually rendered amongst a collection of tabs. */
export class Tab extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    borderless: false,
    children: null,
    disabled: false,
    href: '',
    selected: false,
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
      borderless,
      disabled,
      href,
      keyName,
      label,
      selected,
      stretched,
      styles,
    } = this.props;
    const trackingName = upperFirst(camelCase(keyName || 'Tab'));

    return (
      <span
        className={cx(
          styles.tab,
          disabled && styles.tab_disabled,
          borderless && styles.tab_borderless,
          selected && styles.tab_selected,
          stretched && styles.tab_stretched,
        )}
      >
        <TrackingBoundary name={trackingName}>
          <ButtonOrLink
            aria-selected={selected}
            disabled={disabled}
            href={href}
            role="tab"
            onClick={disabled ? undefined : this.handleClick}
            className={cx(styles.tabButton)}
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

  tab_borderless: {
    borderColor: color.clear,
  },

  tab_selected: {
    borderColor: color.accent.borderFocus,

    ':hover': {
      borderColor: color.accent.borderFocus,
    },
  },

  tab_stretched: {
    flex: 1,
  },

  tab_disabled: {
    ...pattern.disabled,
    borderColor: color.accent.border,

    ':hover': {
      borderColor: color.accent.border,
    },
  },

  tabButton: {
    ...font.textReset,
    ...transition.box,
    background: color.accent.bg,
    display: 'inline-block',
    paddingTop: unit,
    paddingBottom: unit,
    border: 0,
    cursor: 'pointer',
    textAlign: 'left',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: '100%',
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
  },
}))(Tab);
