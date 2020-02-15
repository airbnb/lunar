import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import ButtonOrLink, { ButtonOrLinkTypes } from '@airbnb/lunar/lib/components/private/ButtonOrLink';
import iconComponent from '@airbnb/lunar/lib/prop-types/iconComponent';
import Text from '@airbnb/lunar/lib/components/Text';
import { styleSheetItem as styleSheet } from './styles';

export type Props = {
  /** Mark the item as active. */
  active?: boolean;
  /** Render as an anchor link with a URL. */
  href?: string;
  /** Icon to display above the label. */
  icon: NonNullable<React.ReactElement<{ size?: string }>>;
  /** Item label. */
  label?: React.ReactNode;
  /** Callback fired when the element is clicked. */
  onClick?: (event: React.MouseEvent<ButtonOrLinkTypes>) => void;
};

/** A clickable item within the sidebar navigation menu. */
function SideBarItem({ active, label, href, icon, onClick }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li role="none">
      <ButtonOrLink
        role="menuitem"
        href={href}
        className={cx(styles.item, active && styles.item_active)}
        onClick={onClick}
      >
        <span className={cx(styles.icon)}>{React.cloneElement(icon, { size: '2em' })}</span>

        {label && (
          <span className={cx(styles.label)}>
            <Text micro bold uppercased inverted>
              {label}
            </Text>
          </span>
        )}
      </ButtonOrLink>
    </li>
  );
}

SideBarItem.propTypes = {
  icon: iconComponent.isRequired,
};

export default SideBarItem;
