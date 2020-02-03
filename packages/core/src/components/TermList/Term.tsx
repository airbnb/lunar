import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

import Row from '../Row';
import Spacing from '../Spacing';
import Text from '../Text';

export type Props = {
  /** Term label describing the value displayed. */
  label: string;
  /** Detail links to go after Term label. */
  after?: React.ReactNode;
  /** If enabled, detail links at aligned to the right end. */
  endAlign?: boolean;
  /** If enabled, term label is regular size instead of small. */
  regular?: boolean;
  /** If enabled, term label is uppercased. */
  uppercased?: boolean;
  children: NonNullable<React.ReactNode>;
};

function Term({
  label,
  after,
  endAlign,
  regular,
  uppercased,
  children,
  styles,
  cx,
}: Props & WithStylesProps) {
  return (
    <div className={cx(styles.term)}>
      <dt className={cx(styles.dt)}>
        <Row after={endAlign && after}>
          <Text inline small={!regular} uppercased={uppercased}>
            {label}
          </Text>
          {!endAlign && after && (
            <Spacing inline left={1}>
              {after!}
            </Spacing>
          )}
        </Row>
      </dt>
      <dd className={cx(styles.dd)}>
        <Text>{children}</Text>
      </dd>
    </div>
  );
}

export default withStyles(({ unit, font }) => ({
  dd: {
    marginInlineStart: 0,
  },
}))(Term);
