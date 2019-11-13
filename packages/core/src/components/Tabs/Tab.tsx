import React from 'react';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ButtonOrLink, { Props as ButtonOrLinkProps } from '../private/ButtonOrLink';
import TrackingBoundary from '../TrackingBoundary';
import { styleSheetTab as styleSheet } from './styles';

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

export default withStyles(styleSheet)(Tab);
