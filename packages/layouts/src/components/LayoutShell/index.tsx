import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

export const styleSheetShell: StyleSheet = ({ color }) => ({
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

export type LayoutShellProps = {
  /** The page content. */
  children: NonNullable<React.ReactNode>;
  /** Navigation side bar to display before the content. */
  sideBar?: React.ReactNode;
  /** Navigation top bar to display above the content. */
  // topBar?: React.ReactNode;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Layout shell that wraps an entire application, providing optional side and top nav bars. */
export default function LayoutShell({ children, sideBar, styleSheet }: LayoutShellProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetShell);

  return (
    <div className={cx(styles.shell)}>
      {sideBar && <aside className={cx(styles.sideBar)}>{sideBar}</aside>}

      <div className={cx(styles.mainContent)}>{children}</div>
    </div>
  );
}
