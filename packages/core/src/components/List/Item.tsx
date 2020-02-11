import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import { styleSheetItem as styleSheet } from './styles';

export type ListItemProps = {
  /** Render with a top/bottom borders. Last item will have both. */
  bordered?: boolean;
  /** Item content. */
  children: NonNullable<React.ReactNode>;
  /** Render with reduced vertical padding. */
  compact?: boolean;
  /** @ignore */
  horizontal?: boolean;
  /** Render with vertical padding. */
  spacious?: boolean;
};

function ListItem({ bordered, children, compact, horizontal, spacious }: ListItemProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li
      className={cx(
        !horizontal && bordered && styles.item_bordered,
        horizontal && bordered && styles.item_bordered_horizontal,
        !horizontal && compact && styles.item_compact,
        horizontal && compact && styles.item_compact_horizontal,
        !horizontal && spacious && styles.item_spacious,
        horizontal && spacious && styles.item_spacious_horizontal,
      )}
    >
      {children}
    </li>
  );
}

const paddingPropType = mutuallyExclusiveTrueProps('compact', 'spacious');

ListItem.propTypes = {
  compact: paddingPropType,
  spacious: paddingPropType,
};

export default ListItem;
