import React from 'react';
import useStyles, { Theme } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet = ({ ui, unit }: Theme) => ({
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

  aside_noBorder: {
    border: 0,
  },

  aside_noPadding: {
    padding: 0,
  },
});

export type Props = {
  /** Column is rendered after content. */
  after?: boolean;
  /** Column is rendered before content. */
  before?: boolean;
  /** Content within the column. */
  children: NonNullable<React.ReactNode>;
  /** Remove border from column. */
  noBorder?: boolean;
  /** Remove padding from column. */
  noPadding?: boolean;
  /** Width of the aside column. */
  width?: number;
};

export default function Aside({ after, before, children, noBorder, noPadding, width }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <aside
      className={cx(
        styles.aside,
        after && styles.aside_after,
        before && styles.aside_before,
        noBorder && styles.aside_noBorder,
        noPadding && styles.aside_noPadding,
        { width },
      )}
    >
      {children}
    </aside>
  );
}
