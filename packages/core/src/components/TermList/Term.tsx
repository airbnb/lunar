import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Row from '../Row';
import Spacing from '../Spacing';
import Text from '../Text';

function Term({
  label,
  after,
  endAlign,
  keyTextRegular,
  children,
  cx,
  styles,
}: {
  label: string;
  after?: NonNullable<React.ReactNode>;
  endAlign?: boolean;
  inline?: boolean;
  keyTextRegular?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return (
    <div className={cx(styles.container)}>
      <Row inline={!endAlign} after={endAlign && after}>
        <dt>
          <Text inline small={!keyTextRegular}>
            {label}
          </Text>
        </dt>
        {!endAlign && (
          <Spacing inline left={1}>
            {after || ''}
          </Spacing>
        )}
      </Row>
      <dd>
        <Text>{children}</Text>
      </dd>
    </div>
  );
}

export default withStyles(() => ({
  container: {
    '@selectors': {
      '> dd': {
        // reset styles
        marginInlineStart: 0,
      },
    },
  },
}))(Term);
