import React from 'react';
import { elementType } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import SideBar from '../SideBar';

export type Props = {
  /** Width of the aside columns. */
  asideWidth?: number;
  /** The primary main content. */
  children: NonNullable<React.ReactNode>;
  /** Expand main content to full width of viewport. */
  fluid?: boolean;
  /** Remove background color from main content. */
  noBackground?: boolean;
  /** Remove padding from main content. */
  noPadding?: boolean;
  /** Navigation side bar to display before the content. */
  sideBar?: React.ReactNode;
  /** Navigation top bar to display above the content. */
  topBar?: React.ReactNode; // TODO
};

export type AsideProps = {
  /** The after aside content. */
  after?: React.ReactNode;
  /** The before aside content. */
  before?: React.ReactNode;
};

/** Abstract layout manager that all other layouts extend from. */
export class Layout extends React.Component<Props & AsideProps & WithStylesProps> {
  static defaultProps = {
    asideWidth: 300,
    fluid: false,
    noBackground: false,
    noPadding: false,
  };

  static propTypes = {
    sideBar: elementType(SideBar),
  };

  render() {
    const {
      cx,
      after,
      asideWidth,
      before,
      children,
      fluid,
      noBackground,
      noPadding,
      sideBar,
      styles,
    } = this.props;

    return (
      <div className={cx(styles.layout)}>
        {sideBar && <aside className={cx(styles.aside)}>{sideBar}</aside>}

        {before && (
          <aside className={cx(styles.aside, styles.aside_before, { width: asideWidth })}>
            {before}
          </aside>
        )}

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

        {after && (
          <aside className={cx(styles.aside, styles.aside_after, { width: asideWidth })}>
            {after}
          </aside>
        )}
      </div>
    );
  }
}

export default withStyles(({ breakpoints, color, unit }) => ({
  layout: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    background: color.accent.bg,
    justifyContent: 'space-between',
  },

  main: {
    flexGrow: 1,
    padding: unit * 2,
    background: color.accent.bgHover,
  },

  main_noBackground: {
    background: 'transparent',
  },

  main_noPadding: {
    padding: 0,
  },

  mainContent: {
    maxWidth: breakpoints.medium,
  },

  aside: {
    flexGrow: 0,
    flexShrink: 0,
  },

  aside_after: {
    padding: unit * 2,
    // borderLeft: ui.border,
  },

  aside_before: {
    padding: unit * 2,
    // borderRight: ui.border,
  },
}))(Layout);
