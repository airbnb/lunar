/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import T from '@airbnb/lunar/lib/components/Translate';
import MenuToggle from '@airbnb/lunar/lib/components/MenuToggle';
import { DropdownProps } from '@airbnb/lunar/lib/components/Dropdown';
import { MenuProps } from '@airbnb/lunar/lib/components/Menu';
import Link from '@airbnb/lunar/lib/components/Link';
import SecondaryLink from '@airbnb/lunar/lib/components/SecondaryLink';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import Row from './private/Row';
import { styleSheetFilterMenu } from './styles';

export type FilterMenuProps = {
  /** Accessibility label. */
  accessibilityLabel: string;
  /** Number of currently active filters. */
  activeCount?: number;
  /** Form components to be shown on the expanded view. */
  children?: React.ReactNode;
  /** Props to pass to the `Dropdown` component. */
  dropdownProps?: Partial<DropdownProps>;
  /** If true, will not close the menu when an outside element is clicked. */
  ignoreClickOutside?: boolean;
  /** If true, will not close the menu when the menu is reset and cleared. */
  keepOpenOnClear?: boolean;
  /** Increase font size to large. */
  large?: boolean;
  /** Props to pass to the `Menu` component. */
  menuProps?: Partial<MenuProps>;
  /** Callback fired when the apply button is clicked. */
  onApply?: () => void;
  /** Callback fired when the menu is reset and cleared. */
  onClear?: () => void;
  /** Callback fired when the menu popover is closed. */
  onHide?: () => void;
  /** Callback fired when the menu popover is opened. */
  onShow?: () => void;
  /** Decrease font size to small. */
  small?: boolean;
  /** Z-index of the menu. */
  zIndex?: number;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A button that opens a dropdown that shows filter options for a table or similar component. */
export default function FilterMenu({
  accessibilityLabel,
  activeCount,
  children,
  dropdownProps = { right: 0 },
  ignoreClickOutside,
  keepOpenOnClear,
  large,
  menuProps,
  small,
  zIndex = 1,
  onApply,
  onClear,
  onHide,
  onShow,
  styleSheet,
}: FilterMenuProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetFilterMenu);
  const [opened, setOpened] = useState(false);

  const handleShowFilters = () => {
    setOpened(true);

    if (onShow) {
      onShow();
    }
  };

  const handleHideFilters = () => {
    setOpened(false);

    if (onHide) {
      onHide();
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply();
    }

    handleHideFilters();
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }

    if (!keepOpenOnClear) {
      handleHideFilters();
    }
  };

  const activeCountLabel =
    activeCount && activeCount > 0 ? (
      <T
        k="lunar.form.filter.filterCount"
        phrase="%{smartCount} Filter||||%{smartCount} Filters"
        smartCount={activeCount}
      />
    ) : null;

  const toggleLabel = opened ? (
    <T k="lunar.form.filter.close" phrase="Close filters" />
  ) : (
    <T k="lunar.form.filter.open" phrase="Open filters" />
  );

  return (
    <MenuToggle
      inverted
      ignoreClickOutside={ignoreClickOutside}
      accessibilityLabel={accessibilityLabel}
      dropdownProps={dropdownProps}
      large={large}
      menuProps={menuProps}
      showDropdown={opened}
      small={small}
      toggleLabel={activeCountLabel || toggleLabel}
      zIndex={zIndex}
      onHide={handleHideFilters}
      onShow={handleShowFilters}
    >
      {children}

      <Row>
        <section className={cx(styles.controls)}>
          <Link type="submit" onClick={handleApply}>
            <T k="lunar.common.apply" phrase="Apply" />
          </Link>

          <SecondaryLink type="reset" onClick={handleClear}>
            <T k="lunar.common.reset" phrase="Reset" />
          </SecondaryLink>
        </section>
      </Row>
    </MenuToggle>
  );
}

export { Row };
