import React from 'react';
import iconComponent from '../../prop-types/iconComponent';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import BaseButton from '../Button';
import MutedButton from '../MutedButton';
import IconButton from '../IconButton';
import ExpandableIcon from '../ExpandableIcon';
import Dropdown, { DropdownProps } from '../Dropdown';
import Menu, { Item, Separator, MenuProps } from '../Menu';
import { styleSheetMenuToggle } from './styles';
import { MenuItemProps } from '../Menu/Item';

export type MenuToggleProps = {
  /** Accessibility label for menu. */
  accessibilityLabel: string;
  /** Menu items to be shown on the expanded view. */
  children: NonNullable<React.ReactNode>;
  /** If true, will close the menu on click of an item. */
  closeOnClick?: boolean;
  /** Mark the menu as disabled. */
  disabled?: boolean;
  /** Props to pass to the `Dropdown` component. */
  dropdownProps?: Partial<DropdownProps>;
  /** If true, will not close the menu when an outside element is clicked. */
  ignoreClickOutside?: boolean;
  /** Invert text colors. */
  inverted?: boolean;
  /** Increase font size to large. */
  large?: boolean;
  /** Props to pass to the `Menu` component. */
  menuProps?: Partial<MenuProps>;
  /** Use muted button instead of primary button. */
  muted?: boolean;
  /** Callback fired when the menu popover is closed. */
  onHide?: () => void;
  /** Callback fired when the menu popover is opened. */
  onShow?: () => void;
  /** Decrease font size to small. */
  small?: boolean;
  /** Toggle button icon. */
  toggleIcon?: React.ReactNode;
  /** Toggle button text. */
  toggleLabel: NonNullable<React.ReactNode>;
  /** Z-index of the menu. */
  zIndex?: number;
  /** @ignore @private */
  showDropdown?: boolean;
};

export type MenuToggleState = {
  opened: Boolean;
};

/** A controller for multiple tabs. */
export class MenuToggle extends React.Component<
  MenuToggleProps & WithStylesProps,
  MenuToggleState
> {
  static propTypes = {
    toggleIcon: iconComponent,
  };

  static defaultProps = {
    closeOnClick: false,
    disabled: false,
    ignoreClickOutside: false,
    inverted: false,
    large: false,
    showDropdown: false,
    small: false,
    zIndex: 1,
  };

  ref = React.createRef<HTMLDivElement>();

  state = {
    opened: Boolean(this.props.showDropdown),
  };

  componentDidUpdate(prevProp: MenuToggleProps & WithStylesProps, prevState: MenuToggleState) {
    if (this.props.showDropdown !== prevProp.showDropdown) {
      this.setState({
        opened: Boolean(this.props.showDropdown),
      });
    }
  }

  private handleItemClick = (onClick: () => void) => {
    if (onClick) {
      onClick();
    }

    this.handleHideMenu();
  };

  private handleToggleMenu = () => {
    if (this.state.opened) {
      this.handleHideMenu();
    } else {
      this.handleShowMenu();
    }
  };

  private handleShowMenu = () => {
    this.setState({
      opened: true,
    });

    if (this.props.onShow) {
      this.props.onShow();
    }
  };

  private handleHideMenu = () => {
    this.setState({
      opened: false,
    });

    if (this.props.onHide) {
      this.props.onHide();
    }
  };

  private handleClickOutside = (event: MouseEvent) => {
    if (!this.state.opened || this.props.ignoreClickOutside) {
      return;
    }

    // Let the button handle itself
    const { current } = this.ref;

    if (current?.contains(event.target as Element)) {
      return;
    }

    this.handleHideMenu();
  };

  render() {
    const { opened } = this.state;
    const {
      cx,
      accessibilityLabel,
      children,
      closeOnClick,
      disabled,
      dropdownProps = { right: 0 },
      inverted,
      large,
      menuProps,
      muted,
      small,
      styles,
      toggleIcon,
      toggleLabel,
      zIndex,
    } = this.props;
    let iconSize = '1.5em';

    if (large) {
      iconSize = '2em';
    } else if (small) {
      iconSize = '1em';
    }

    const Button = muted ? MutedButton : BaseButton;

    return (
      <div ref={this.ref} className={cx(styles.container)}>
        {toggleIcon ? (
          <IconButton
            disabled={disabled}
            aria-label={accessibilityLabel}
            onClick={this.handleToggleMenu}
          >
            {toggleIcon}
          </IconButton>
        ) : (
          <Button
            disabled={disabled}
            afterIcon={<ExpandableIcon expanded={opened} size={iconSize} />}
            inverted={inverted}
            large={large}
            small={small}
            onClick={this.handleToggleMenu}
          >
            {toggleLabel}
          </Button>
        )}

        <div
          className={cx(styles.dropdown, !opened && styles.dropdown_hidden, { zIndex })}
          aria-expanded={opened}
        >
          <Dropdown {...dropdownProps} visible={opened} onClickOutside={this.handleClickOutside}>
            <div className={cx(styles.menu)}>
              <Menu
                minWidth={250}
                maxHeight={300}
                accessibilityLabel={accessibilityLabel}
                {...menuProps}
              >
                {closeOnClick
                  ? React.Children.map(
                      children as React.ReactElement[],
                      (child: React.ReactElement) => {
                        if (!child || !child.props) {
                          return null;
                        }

                        return React.cloneElement(child, {
                          onClick: () =>
                            this.handleItemClick((child.props as MenuItemProps).onClick!),
                        });
                      },
                    )
                  : children}
              </Menu>
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export { Item, Separator };

export default withStyles(styleSheetMenuToggle)(MenuToggle);
