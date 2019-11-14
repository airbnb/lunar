import React from 'react';

import Row from '../Row';
import Spacing from '../Spacing';
import Text from '../Text';

export default function Term({
  label,
  after = '',
  endAlign,
  small = true,
  children,
}: {
  label: string;
  after?: React.ReactNode;
  endAlign?: boolean;
  small?: boolean;
  keyTextRegular?: boolean;
  children: NonNullable<React.ReactNode>;
}) {
  return (
    <>
      <dt>
        <Row after={endAlign && after}>
          <Text inline small={small}>
            {label}
          </Text>
          {!endAlign && after && (
            <Spacing inline left={1}>
              {after!}
            </Spacing>
          )}
        </Row>
      </dt>
      <dd>
        <Text>{children}</Text>
      </dd>
    </>
  );
}
