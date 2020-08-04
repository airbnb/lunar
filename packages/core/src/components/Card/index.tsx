import React from 'react';
import Content from './Content';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetCard } from './styles';

export { Content };

export type CardProps = {
  /** List of `Content`s blocks to contain content. */
  children: NonNullable<React.ReactNode>;
  /** Hide shadow. */
  noShadow?: boolean;
  /** Set overflow to be visible. */
  overflow?: boolean;
  /** Whether the card is selected or not. */
  selected?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/**
 * An abstract layout to use as a base for cards.
 */
export default function Card({ children, noShadow, overflow, selected, styleSheet }: CardProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetCard);

  return (
    <div
      className={cx(
        styles.card,
        overflow && styles.card_overflow,
        noShadow && styles.card_noShadow,
        selected && styles.card_selected,
      )}
    >
      {children}
    </div>
  );
}
