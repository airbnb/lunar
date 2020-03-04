import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Term from './Term';

export { Term };

export const styleSheet: StyleSheet = ({ unit }) => ({
  termList: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  termList_vertical: {
    '@selectors': {
      '> div:not(:last-child)': {
        marginBottom: unit * 2,
      },
    },
  },
  termList_horizontal: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    '@selectors': {
      '> div:not(:last-child)': {
        marginRight: unit * 6,
      },
    },
  },
});

export type TermListProps = {
  /** Terms to be rendered inside the list. */
  children: NonNullable<React.ReactNode>;
  /** If enabled, terms are laid out horizontally. */
  horizontal?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function TermList({ horizontal, children }: TermListProps) {
  const [styles, cx] = useStyles(styleSheet);

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
