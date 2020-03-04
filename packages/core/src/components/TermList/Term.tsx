import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

import Row from '../Row';
import Spacing from '../Spacing';
import Text, { TextProps } from '../Text';

export const styleSheet: StyleSheet = () => ({
  dd: {
    marginInlineStart: 0,
  },
});

export type TermProps = TextProps & {
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
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function Term({
  label,
  after,
  endAlign,
  uppercased,
  children,
  ...textProps
}: TermProps) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div>
      <dt>
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
