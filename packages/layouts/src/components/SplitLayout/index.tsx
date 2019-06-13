import React from 'react';
import { elementType } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import Aside from '../Aside';
import Layout, { Props as LayoutProps, AsideProps } from '../Layout';

export type Props = Required<AsideProps> & Pick<LayoutProps, 'fluid'>;

/** A symmetrical two-column layout. */
export class SplitLayout extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    after: elementType(Aside).isRequired,
    before: elementType(Aside).isRequired,
  };

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
