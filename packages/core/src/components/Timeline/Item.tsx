import React from 'react';
import IconRecord from '@airbnb/lunar-icons/src/interface/IconRecord';
import useStyles from '../../hooks/useStyles';
import { styleSheetItem } from './styles';
import Row from '../Row';
import Text from '../Text';
import useTheme from '../../hooks/useTheme';
import DateTime from '../DateTime';
import { DateTimeType } from '../../types';

export type ItemProps = {
  /** Datetime occurence of the item. */
  at: DateTimeType;

  /** Whether an item is the oldest (chronologically) in the collection of items. */
  oldest?: boolean;

  /** Content to render for an item. */
  children: NonNullable<React.ReactNode>;
};

/** Represents a single item in a collection of chronologically items. */
export default function Item({ at, oldest = false, children }: ItemProps) {
  const theme = useTheme();
  const [styles, cx] = useStyles(styleSheetItem);

  return (
    <>
      <Row middleAlign before={<IconRecord size={8} color={theme.color.core.neutral[3]} />}>
        <Text small muted>
          <DateTime medium at={at} />
          {' ('}
          <DateTime relative at={at} />
          {')'}
        </Text>
      </Row>
      <div className={cx(oldest ? styles.wrapper_oldest : styles.wrapper)}>{children}</div>
    </>
  );
}
