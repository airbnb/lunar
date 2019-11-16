import React from 'react';

import Row from '../Row';
import Spacing from '../Spacing';
import Text from '../Text';

export type Props = {
  label: string;
  after?: React.ReactNode;
  endAlign?: boolean;
  regular?: boolean;
  children: NonNullable<React.ReactNode>;
};

export default function Term({
  /** Term label describing the value displayed. */
  label,
  /** Detail links to go after Term label. */
  after,
  /** If enabled, detail links at aligned to the right end. */
  endAlign,
  /** If enabled, term label is regular size instead of small. */
  regular,
  children,
}: Props) {
  return (
    <>
      <dt>
        <Row after={endAlign && after}>
          <Text inline small={!regular}>
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
