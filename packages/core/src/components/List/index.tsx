import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Item from './Item';
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
  /** Render items in reverse order visually. */
  reversed?: boolean;
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
  reversed,
  wrap,
  styleSheet,
}: ListProps) {
  const Tag = ordered ? 'ol' : 'ul';
  const [styles, cx] = useStyles(styleSheet ?? styleSheetList);

  return (
    <Tag
      className={cx(
        styles.list,
        reversed && styles.list_reversed,
        !horizontal && gutter && styles.list_gutter,
        !horizontal && gutter && reversed && styles.list_gutter_reversed,
        horizontal && styles.list_horizontal,
        horizontal && reversed && styles.list_reversed_horizontal,
        horizontal && gutter && styles.list_gutter_horizontal,
        horizontal && gutter && reversed && styles.list_gutter_horizontal_reversed,
        horizontal && wrap && styles.list_wrap,
        middleAlign && styles.list_middleAlign,
      )}
    >
      {React.Children.map(children as React.ReactElement[], (child: React.ReactElement) => {
        if (!child) {
          return null;
        }

        if (horizontal && (child.props.compact || child.props.spacious || child.props.spacious)) {
          if (child.type === Item) {
            return React.cloneElement(child, { horizontal });
          }

          return <Item horizontal>{child.props.children}</Item>;
        }

        return child;
      })}
    </Tag>
  );
}
