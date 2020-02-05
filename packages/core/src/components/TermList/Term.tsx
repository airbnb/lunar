import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';

import Row from '../Row';
import Spacing from '../Spacing';
import Text, { Props as TextProps } from '../Text';

export const styleSheet: StyleSheet = () => ({
  dd: {
    marginInlineStart: 0,
  },
});

export type Props = TextProps & {
  /** Detail links to go after Term label. */
  after?: React.ReactNode;
  /** Term content describing the value displayed. */
  children: NonNullable<React.ReactNode>;
  /** If enabled, detail links at aligned to the right end. */
  endAlign?: boolean;
  /** Term label describing the value displayed. */
  label: string | React.ReactNode;
  /** If enabled, term label is uppercased. */
  uppercased?: boolean;
};

export default function Term({
  label,
  after,
  endAlign,
  uppercased,
  children,
  ...textProps
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.term)}>
      <dt className={cx(styles.dt)}>
        <Row after={endAlign && after}>
          <Text inline small uppercased={uppercased} {...textProps}>
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
