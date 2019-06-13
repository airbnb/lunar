/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import T from '@airbnb/lunar/lib/components/Translate';
import Button from '@airbnb/lunar/lib/components/Button';
import Dropdown, { Props as DropdownProps } from '@airbnb/lunar/lib/components/Dropdown';
import Menu, { Props as MenuProps } from '@airbnb/lunar/lib/components/Menu';
import ExpandableIcon from '@airbnb/lunar/lib/components/ExpandableIcon';
import Link from '@airbnb/lunar/lib/components/Link';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import Row from './private/Row';

export type Props = {
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
};

export type State = {
  opened: Boolean;
};

/** A button that opens a dropdown that shows filter options for a table or similar component. */
export class FilterMenu extends React.Component<Props & WithStylesProps, State> {
  static propTypes = {
    children: childrenOfType(Row, 'li'),
  };

  static defaultProps = {
    children: null,
    ignoreClickOutside: false,
    large: false,
    onApply() {},
    onClear() {},
    onHide() {},
    onShow() {},
    small: false,
    zIndex: 1,
  };

  ref = React.createRef<HTMLDivElement>();

  state = {
    opened: false,
  };

  private handleToggleFilters = () => {
    if (this.state.opened) {
      this.handleHideFilters();
    } else {
      this.handleShowFilters();
    }
  };

  private handleShowFilters = () => {
    this.setState({
      opened: true,
    });

    this.props.onShow!();
  };

  private handleHideFilters = () => {
    this.setState({
      opened: false,
    });

    this.props.onHide!();
  };

  private handleApply = () => {
    this.props.onApply!();
    this.handleHideFilters();
  };

  private handleClear = () => {
    this.props.onClear!();
    if (!this.props.keepOpenOnClear) {
      this.handleHideFilters();
    }
  };

  private handleClickOutside = (event: MouseEvent) => {
    if (this.props.ignoreClickOutside) {
      return;
    }

    // Let the button handle itself
    const { current } = this.ref;

    if (current && current.contains(event.target as any)) {
      return;
    }

    this.handleHideFilters();
  };

  render() {
    const {
      cx,
      accessibilityLabel,
      activeCount,
      children,
      dropdownProps = { right: 0 },
      large,
      menuProps,
      small,
      styles,
      zIndex,
    } = this.props;
    const { opened } = this.state;
    const activeCountLabel =
      activeCount && activeCount > 0 ? (
        <T
          phrase="%{smartCount} Filter||||%{smartCount} Filters"
          smartCount={activeCount}
          context="Number of filters applied within a form"
        />
      ) : null;
    const toggleLabel = opened ? (
      <T phrase="Close filters" context="Filter menu toggle button label" />
    ) : (
      <T phrase="Open filters" context="Filter menu toggle button label" />
    );

    return (
      <div className={cx(styles.container)} ref={this.ref}>
        <Button
          inverted
          large={large}
          small={small}
          onClick={this.handleToggleFilters}
          afterIcon={<ExpandableIcon expanded={opened} size="1.25em" />}
        >
          {activeCountLabel || toggleLabel}
        </Button>

        <div
          className={cx(styles.form, !opened && styles.form_hidden, { zIndex })}
          aria-expanded={opened}
        >
          <Dropdown {...dropdownProps} onClickOutside={this.handleClickOutside} visible={opened}>
            <div className={cx(styles.menu)}>
              <Menu
                minWidth={250}
                maxHeight={300}
                accessibilityLabel={accessibilityLabel}
                {...menuProps}
              >
                {children}

                <Row>
                  <section className={cx(styles.controls)}>
                    <Link type="submit" onClick={this.handleApply}>
                      <T phrase="Apply" context="Apply filters button label" />
                    </Link>

                    <Link muted type="reset" onClick={this.handleClear}>
                      <T phrase="Reset" context="Button label to reset a form" />
                    </Link>
                  </section>
                </Row>
              </Menu>
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export { Row };

export default withStyles(({ unit, transition }) => ({
  container: {
    display: 'inline-block',
    position: 'relative',
  },

  form: {
    ...transition.fade,
    visibility: 'visible',
    position: 'relative',
  },

  form_hidden: {
    opacity: 0,
    visibility: 'hidden',
    userSelect: 'none',
  },

  menu: {
    marginTop: unit,
  },

  controls: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))(FilterMenu);
