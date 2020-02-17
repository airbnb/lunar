import React, { useState } from 'react';
import IconCaretLeft from '@airbnb/lunar-icons/lib/interface/IconCaretLeft';
import IconCaretRight from '@airbnb/lunar-icons/lib/interface/IconCaretRight';
import iconComponent from '../../prop-types/iconComponent';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import ButtonOrLink from '../private/ButtonOrLink';
import Text from '../Text';
import DirectionalIcon from '../DirectionalIcon';
import { styleSheetItem } from './styles';

export type MenuItemProps = {
  /** Content within the menu item. */
  children: NonNullable<React.ReactNode>;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the item as highlighted. */
  highlighted?: boolean;
  /** Render an anchor link with a URL instead of a button. */
  href?: string;
  /** An icon to display before the item. */
  icon?: React.ReactNode;
  /** Pass an HTML element attribute id. */
  id?: string;
  /** Click handler. */
  onClick?: () => void;
  /** Opens links in a new window. */
  openInNewWindow?: boolean;
  /** Accessibility role. */
  role?: string;
  /** Increase padding. */
  spacious?: boolean;
  /** A sub-menu to display on hover. */
  submenu?: React.ReactNode;
  /** Tab index for the current menu. */
  tabIndex?: number;
  /** Tip to display after the item. */
  tip?: React.ReactNode;
  /** A tracking name to identify this component. */
  trackingName?: string;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** An interactive item within a menu. */
function MenuItem({
  children,
  disabled,
  highlighted,
  href = '',
  icon,
  id,
  onClick,
  openInNewWindow,
  role = 'menuitem',
  spacious,
  submenu,
  tabIndex = -1,
  tip,
  trackingName,
  styleSheet,
}: MenuItemProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetItem);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleMouseEnter = () => {
    if (submenu) {
      setShowSubmenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (submenu) {
      setShowSubmenu(false);
    }
  };

  const after = submenu ? (
    <DirectionalIcon
      decorative
      direction="right"
      left={IconCaretLeft}
      right={IconCaretRight}
      size="1.5em"
    />
  ) : (
    tip
  );

  return (
    <li role="none" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ButtonOrLink
        className={cx(
          styles.item,
          (showSubmenu || highlighted) && styles.item_highlighted,
          disabled && styles.item_disabled,
          spacious && styles.item_spacious,
        )}
        afterIcon={
          after ? (
            <Text muted small>
              {after}
            </Text>
          ) : null
        }
        aria-expanded={showSubmenu}
        aria-haspopup={!!submenu}
        beforeIcon={icon}
        disabled={disabled}
        href={href}
        id={id}
        openInNewWindow={openInNewWindow}
        role={role}
        tabIndex={tabIndex}
        trackingName={trackingName}
        onClick={onClick}
      >
        {children}
      </ButtonOrLink>

      {showSubmenu && <div className={cx(styles.submenu)}>{submenu}</div>}
    </li>
  );
}

MenuItem.propTypes = {
  icon: iconComponent,
};

export default MenuItem;
