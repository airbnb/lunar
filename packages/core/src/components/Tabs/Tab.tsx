import React, { useEffect } from 'react';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import ButtonOrLink, { ButtonOrLinkProps } from '../private/ButtonOrLink';
import TrackingBoundary from '../TrackingBoundary';
import { styleSheetTab } from './styles';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export type TabProps = Pick<ButtonOrLinkProps, 'afterIcon' | 'beforeIcon' | 'disabled' | 'href'> & {
  /** Hide bottom border of Tab when unselected. */
  borderless?: boolean;
  /** Content to render if the tab is selected. */
  children?: React.ReactNode;
  /** @ignore Unique key name for this tab. */
  keyName?: string;
  /** Text to render in the tab. */
  label: NonNullable<React.ReactNode>;
  /** @ignore Callback fired when the tab is clicked. */
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
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A single tab button. Usually rendered amongst a collection of tabs. */
export default function Tab({
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
  onClick,
  onSelected,
  styleSheet,
}: TabProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetTab);
  const trackingName = upperFirst(camelCase(keyName ?? 'Tab'));
  const noBorder = secondary || borderless;
  const noHover = secondary || (noBorder && disabled);

  const handleClick = () => {
    if (onClick) {
      onClick(keyName!);
    }
  };

  useEffect(() => {
    if (selected && onSelected) {
      onSelected();
    }
  }, [selected, onSelected]);

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
          onClick={disabled ? undefined : handleClick}
        >
          {label}
        </ButtonOrLink>
      </TrackingBoundary>
    </span>
  );
}
