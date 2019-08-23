import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Spacing from '../Spacing';
import Text from '../Text';

function Term({
  after,
  endAlign,
  children,
  cx,
  styles,
}: {
  endAlign?: boolean;
  after?: NonNullable<React.ReactNode>;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return (
    <dt className={cx(styles.container, endAlign && styles.endAlign)}>
      <Text small muted>
        {children}
      </Text>

      {after && (
        <Text small muted>
          {after}
        </Text>
      )}
    </dt>
  );
}

export default withStyles(() => ({
  container: {
    display: 'flex',
  },
  endAlign: {
    justifyContent: 'space-between',
  },
}))(Term);
