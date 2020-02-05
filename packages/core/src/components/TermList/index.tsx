import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
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

export type Props = {
  /** Terms to be rendered inside the list. */
  children: NonNullable<React.ReactNode>;
  /** If enabled, terms are laid out horizontally. */
  horizontal?: boolean;
};

export default function TermList({ horizontal, children }: Props) {
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
