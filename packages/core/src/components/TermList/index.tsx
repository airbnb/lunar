import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Term from './Term';
import { termListStyleSheet } from './styles';

export { Term };

export type TermListProps = {
  /** Terms to be rendered inside the list. */
  children: NonNullable<React.ReactNode>;
  /** If enabled, terms are laid out horizontally. */
  horizontal?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function TermList({ horizontal, children, styleSheet }: TermListProps) {
  const [styles, cx] = useStyles(styleSheet ?? termListStyleSheet);

  return (
    <dl
      className={cx(
        styles.termList,
        !horizontal && styles.termList_vertical,
        horizontal && styles.termList_horizontal,
      )}
    >
      {children}
    </dl>
  );
}
