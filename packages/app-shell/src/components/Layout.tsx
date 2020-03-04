import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

export const styleSheet: StyleSheet = () => ({
  layout: {
    minHeight: '100vh',
  },
});

export type ShellLayoutProps = {
  children: NonNullable<React.ReactNode>;
};

function ShellLayout({ children }: ShellLayoutProps) {
  const [styles, cx] = useStyles(styleSheet);

  return <div className={cx(styles.layout)}>{children}</div>;
}

export default React.memo(ShellLayout);
