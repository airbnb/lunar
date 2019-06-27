import React from 'react';
import { elementType } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import SideBar from '../SideBar';

const styleSheet: StyleSheet = ({ color }) => ({
  shell: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    background: color.accent.bg,
    justifyContent: 'space-between',
  },

  sideBar: {
    flexGrow: 0,
    flexShrink: 0,
    width: 'auto',
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
function LayoutShell({ children, sideBar }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.shell)}>
      {sideBar && <aside className={cx(styles.sideBar)}>{sideBar}</aside>}

      <div>{children}</div>
    </div>
  );
}

LayoutShell.propTypes = {
  sideBar: elementType(SideBar),
};

export default LayoutShell;
