import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import IconChevronDown from '@airbnb/lunar-icons/lib/interface/IconChevronDown';
import IconChevronUp from '@airbnb/lunar-icons/lib/interface/IconChevronUp';
import iconComponent from '../../prop-types/iconComponent';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Button from '../Button';
import IconButton from '../IconButton';
import Dropdown, { Props as DropdownProps } from '../Dropdown';
import Menu, { Item, Separator, Props as MenuProps } from '../Menu';

export type Props = {
  /** Accessibility label for menu. */
  accessibilityLabel: string;
  /** Menu items to be shown on the expanded view. */
  children: NonNullable<React.ReactNode>;
  /** If true, will close the menu on click of an item. */
  closeOnClick?: boolean;
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
};

export type State = {
  opened: Boolean;
};

/** A controller for multiple tabs. */
export class MenuToggle extends React.Component<Props & WithStylesProps, State> {
  static propTypes = {
    children: childrenOfType(Item, Separator, 'li').isRequired,
    toggleIcon: iconComponent,
  };

  static defaultProps = {
    closeOnClick: false,
    ignoreClickOutside: false,
    inverted: false,
    large: false,
    small: false,
    zIndex: 1,
  };

  ref = React.createRef<HTMLDivElement>();

  state = {
    opened: false,
  };

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

    if (current && current.contains(event.target as any)) {
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
      dropdownProps = { right: 0 },
      inverted,
      large,
      menuProps,
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

    return (
      <div className={cx(styles.container)} ref={this.ref}>
        {toggleIcon ? (
          <IconButton aria-label={accessibilityLabel} onClick={this.handleToggleMenu}>
            {toggleIcon}
          </IconButton>
        ) : (
          <Button
            afterIcon={
              opened ? (
                <IconChevronUp decorative size={iconSize} />
              ) : (
                <IconChevronDown decorative size={iconSize} />
              )
            }
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
          <Dropdown {...dropdownProps} onClickOutside={this.handleClickOutside} visible={opened}>
            <div className={cx(styles.menu)}>
              <Menu
                minWidth={250}
                maxHeight={300}
                accessibilityLabel={accessibilityLabel}
                {...menuProps}
              >
                {closeOnClick
                  ? React.Children.map(children as any, (child: React.ReactElement<any>) => {
                      if (!child || !child.props) {
                        return null;
                      }

                      return React.cloneElement(child, {
                        onClick: () => this.handleItemClick(child.props.onClick),
                      });
                    })
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

export default withStyles(({ unit, transition }) => ({
  container: {
    display: 'inline-block',
    position: 'relative',
  },

  dropdown: {
    ...transition.fade,
    visibility: 'visible',
    position: 'relative',
  },

  dropdown_hidden: {
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
}))(MenuToggle);
