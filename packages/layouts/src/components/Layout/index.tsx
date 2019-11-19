import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import { styleSheet } from './styles';

export type Props = {
  /** The primary main content. */
  children: NonNullable<React.ReactNode>;
  /** Expand main content to full width of viewport. */
  fluid?: boolean;
  /** Min height of the main content. */
  minHeight?: number | string;
  /** Remove background color from main content. */
  noBackground?: boolean;
  /** Remove padding from main content. */
  noPadding?: boolean;
};

export type AsideProps = {
  /** The after aside content. */
  after?: React.ReactNode;
  /** The before aside content. */
  before?: React.ReactNode;
};

/** Abstract layout manager that all other layouts extend from. */
export default function Layout({
  after,
  before,
  children,
  fluid,
  minHeight,
  noBackground,
  noPadding,
}: Props & AsideProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.layout, { minHeight: minHeight || '100vh' })}>
      {before}

      <main
        role="main"
        className={cx(
          styles.main,
          noBackground && styles.main_noBackground,
          noPadding && styles.main_noPadding,
        )}
      >
        <div className={cx(!fluid && styles.mainContent)}>{children}</div>
      </main>

      {after}
    </div>
  );
}
