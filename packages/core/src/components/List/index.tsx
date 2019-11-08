import React from 'react';
import useStyles from '../../hooks/useStyles';
import Item, { Props as ItemProps } from './Item';
import { styleSheet } from './styles';

export { Item };

export type Props = {
  /** List items. */
  children: NonNullable<React.ReactNode>;
  /** Apply gutters between `li`s. */
  gutter?: boolean;
  /** Horizontal list. */
  horizontal?: boolean;
  /** Renders an `<ol></ol>`. */
  ordered?: boolean;
  /** Wrap horizontal list. */
  wrap?: boolean;
};

export default function List({ children, gutter, horizontal, ordered, wrap }: Props) {
  const Tag = ordered ? 'ol' : 'ul';
  const [styles, cx] = useStyles(styleSheet);

  return (
    <Tag
      className={cx(
        styles.list,
        !horizontal && gutter && styles.list_gutter,
        horizontal && styles.list_horizontal,
        horizontal && gutter && styles.list_gutter_horizontal,
        horizontal && wrap && styles.list_horizontal_wrap,
      )}
    >
      {React.Children.map(children, child => {
        if (!child) {
          return null;
        }

        if (horizontal) {
          return React.cloneElement(child as React.ReactElement<ItemProps>, { horizontal });
        }

        return child;
      })}
    </Tag>
  );
}
