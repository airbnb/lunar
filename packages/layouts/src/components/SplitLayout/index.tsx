import React from 'react';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import Layout, { Props as LayoutProps, AsideProps } from '../Layout';

export type Props = Required<AsideProps> & Pick<LayoutProps, 'fluid'>;

/** A symmetrical two-column layout. */
export class SplitLayout extends React.Component<Props & WithStylesProps> {
  render() {
    const { after, before, cx, fluid, styles } = this.props;

    return (
      <Layout noBackground noPadding fluid={fluid}>
        <div className={cx(styles.wrapper)}>
          <div className={cx(styles.column)}>{before}</div>
          <div className={cx(styles.column)}>{after}</div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(() => ({
  wrapper: {
    display: 'flex',
    height: '100%',
  },

  column: {
    width: '50%',
  },
}))(SplitLayout);
