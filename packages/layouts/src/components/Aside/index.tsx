import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ ui, unit }) => ({
  aside: {
    flexGrow: 0,
    flexShrink: 0,
    padding: unit * 2,
  },

  aside_after: {
    borderLeft: ui.border,
  },

  aside_before: {
    borderRight: ui.border,
  },

  aside_noPadding: {
    padding: 0,
  },

  aside_scrollable: {
    overflowY: 'auto',
    maxHeight: '100%',
  },
});

export type Props = {
  /** Column is rendered after content. Applies a left border. */
  after?: boolean;
  /** Column is rendered before content. Applies a right border. */
  before?: boolean;
  /** Content within the column. */
  children: NonNullable<React.ReactNode>;
  /** Remove padding from column. */
  noPadding?: boolean;
  /** Convert column to a scrollable container. */
  scrollable?: boolean;
  /** Width of the aside column. */
  width?: number | string;
};

/** An aside column within a layout. */
export default function Aside({ after, before, children, noPadding, scrollable, width }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <aside
      className={cx(
        styles.aside,
        after && styles.aside_after,
        before && styles.aside_before,
        noPadding && styles.aside_noPadding,
        scrollable && styles.aside_scrollable,
        { width },
      )}
    >
      {children}
    </aside>
  );
}
