import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Item, { ListItemProps } from './Item';
import { styleSheetList } from './styles';

export { Item };

export type ListProps = {
  /** List items. */
  children: NonNullable<React.ReactNode>;
  /** Apply gutters between `li`s. */
  gutter?: boolean;
  /** Horizontal list. */
  horizontal?: boolean;
  /** Align contents in the middle vertically, to be used with `horizontal`. */
  middleAlign?: boolean;
  /** Renders an `<ol></ol>`. */
  ordered?: boolean;
  /** Wrap horizontal list. */
  wrap?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function List({
  children,
  gutter,
  horizontal,
  middleAlign,
  ordered,
  wrap,
  styleSheet,
}: ListProps) {
  const Tag = ordered ? 'ol' : 'ul';
  const [styles, cx] = useStyles(styleSheet ?? styleSheetList);

  return (
    <Tag
      className={cx(
        styles.list,
        !horizontal && gutter && styles.list_gutter,
        horizontal && styles.list_horizontal,
        horizontal && gutter && styles.list_gutter_horizontal,
        horizontal && wrap && styles.list_horizontal_wrap,
        middleAlign && styles.list_middleAlign,
      )}
    >
      {React.Children.map(children, child => {
        if (!child) {
          return null;
        }

        if (horizontal) {
          return React.cloneElement(child as React.ReactElement<ListItemProps>, { horizontal });
        }

        return child;
      })}
    </Tag>
  );
}
