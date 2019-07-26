import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

const styleSheet: StyleSheet = ({ color }) => ({
  shell: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    background: color.accent.bg,
    justifyContent: 'flex-start',
  },

  sideBar: {
    flexGrow: 0,
    flexShrink: 0,
    width: 'auto',
  },

  mainContent: {
    flexGrow: 1,
  },
});

export type Props = {
  /** The page content. */
  children: NonNullable<React.ReactNode>;
  /** Navigation side bar to display before the content. */
  sideBar?: React.ReactNode;
  /** Navigation top bar to display above the content. */
  // topBar?: React.ReactNode;
};

/** Layout shell that wraps an entire application, providing optional side and top nav bars. */
export default function LayoutShell({ children, sideBar }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.shell)}>
      {sideBar && <aside className={cx(styles.sideBar)}>{sideBar}</aside>}

      <div className={cx(styles.mainContent)}>{children}</div>
    </div>
  );
}
