import React from 'react';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';

export type Props = {
  /** The primary main content. */
  children: NonNullable<React.ReactNode>;
  /** Expand main content to full width of viewport. */
  fluid?: boolean;
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
export class Layout extends React.Component<Props & AsideProps & WithStylesProps> {
  static defaultProps = {
    fluid: false,
    noBackground: false,
    noPadding: false,
  };

  render() {
    const { cx, after, before, children, fluid, noBackground, noPadding, styles } = this.props;

    return (
      <div className={cx(styles.layout)}>
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
}

export default withStyles(({ breakpoints, color, unit }) => ({
  layout: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
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
}))(Layout);
