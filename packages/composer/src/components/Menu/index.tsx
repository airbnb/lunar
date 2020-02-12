import React, { useContext, useCallback } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import useTheme from '@airbnb/lunar/lib/hooks/useTheme';
import Dropdown, { Props as DropdownProps } from '@airbnb/lunar/lib/components/Dropdown';
import ComposerContext from '../../contexts/ComposerContext';
import ToggleButton from './ToggleButton';
import { isElementWithID } from '../../helpers/platform';
import { menuStyleSheet } from '../../styles';

export type MenuProps = {
  /** Remove border around menu container. */
  borderless?: boolean;
  /** Content to render. */
  children: NonNullable<React.ReactNode>;
  /** Display in the center at 100% width. */
  centerAlign?: boolean;
  /** Display on the right with a custom width. */
  endAlign?: boolean;
  /** Unique name of the menu that determines active state. */
  name: string;
  /** Display on the left with a custom width. */
  startAlign?: boolean;
  /** Optional title to display above the content. */
  title?: React.ReactNode;
  /** Callback fired when clicking outside the menu. */
  onClickOutside?: DropdownProps['onClickOutside'];
  /** Custom width for side menus. */
  width?: number | string;
};

export { ToggleButton };

export default function Menu({
  borderless,
  children,
  centerAlign,
  endAlign,
  name,
  startAlign,
  title,
  onClickOutside,
  width,
}: MenuProps) {
  const [styles, cx] = useStyles(menuStyleSheet);
  const { flags, id, menu, setMenu } = useContext(ComposerContext);
  const { unit } = useTheme();

  // Handlers
  const handleClickOutside = useCallback(
    // istanbul ignore next
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Never close when clicking the textarea or the toggle button
      if (
        target &&
        (isElementWithID(target, 'textarea', id) ||
          isElementWithID(target, 'button', `toggle-button-${name}`))
      ) {
        return;
      }

      if (onClickOutside) {
        onClickOutside(event);
      }

      // Always close active menu
      setMenu('');
    },
    [onClickOutside, name, setMenu, id],
  );

  // Only display if menu is active
  if (menu !== name) {
    return null;
  }

  let left = startAlign ? unit / 2 : 'auto';
  let right = endAlign ? unit / 2 : 'auto';

  // Spacing for side affixes
  if (centerAlign) {
    left = flags.beforeButton ? unit * 4 : 0;
    right = flags.afterButton ? unit * 4 : 0;
  }

  return (
    <Dropdown
      visible
      bottom={`calc(100% + ${unit}px)`}
      left={left}
      right={right}
      zIndex={1}
      onClickOutside={handleClickOutside}
    >
      <div
        className={cx(
          styles.menu,
          borderless && styles.menu_borderless,
          centerAlign && styles.menu_centerAlign,
          (startAlign || endAlign) && styles.menu_sideAlign,
          !centerAlign && { width },
        )}
      >
        {title && <div className={cx(styles.title)}>{title}</div>}

        {children}
      </div>
    </Dropdown>
  );
}
