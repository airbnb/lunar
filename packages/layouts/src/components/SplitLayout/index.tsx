import React from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import Layout, { LayoutProps, AsideProps } from '../Layout';
import { styleSheetSplitLayout } from './styles';

export type SplitLayoutProps = Required<AsideProps> & Pick<LayoutProps, 'fluid' | 'styleSheet'>;

/** A symmetrical two-column layout. */
export default function SplitLayout({ after, before, fluid, styleSheet }: SplitLayoutProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetSplitLayout);

  return (
    <Layout noBackground noPadding fluid={fluid}>
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.column)}>{before}</div>
        <div className={cx(styles.column)}>{after}</div>
      </div>
    </Layout>
  );
}
