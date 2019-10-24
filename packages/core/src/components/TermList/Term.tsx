import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Row from '../Row';
import Spacing from '../Spacing';
import Text from '../Text';

function Term({
  label,
  after = '',
  endAlign,
  small = true,
  children,
  cx,
  styles,
}: {
  label: string;
  after?: React.ReactNode;
  endAlign?: boolean;
  small?: boolean;
  keyTextRegular?: boolean;
  children: NonNullable<React.ReactNode>;
} & WithStylesProps) {
  return (
    <>
      <dt>
        <Row after={endAlign && after}>
          <Text inline small={small}>
            {label}
          </Text>
          {!endAlign && (
            <Spacing inline left={1}>
              {after!}
            </Spacing>
          )}
        </Row>
      </dt>
      <dd className={cx(styles.value)}>
        <Text>{children}</Text>
      </dd>
    </>
  );
}

export default withStyles(() => ({
  value: {
    // reset styles
    marginInlineStart: 0,
  },
}))(Term);
