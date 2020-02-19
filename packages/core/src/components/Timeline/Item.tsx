import React from 'react';
import IconRecord from '@airbnb/lunar-icons/src/interface/IconRecord';
import useStyles from '../../hooks/useStyles';
import { styleSheetItem } from './styles';
import Row from '../Row';
import Text from '../Text';
import useTheme from '../../hooks/useTheme';
import DateTime from '../DateTime';
import { DateTimeType } from '../../types';
import T from '../Translate';
import { Item as ListItem } from '../List';

export type ItemProps = {
  /** Datetime occurence of the item. Not used for secondary items. */
  at?: DateTimeType;

  /** Whether an item is the oldest (chronologically) in the collection of items. */
  oldest?: boolean;

  /** Whether an item should be visually deemphasized. */
  secondary?: boolean;

  /** Content to render for an item. */
  children: NonNullable<React.ReactNode>;
};

/** Represents a single item in a collection of chronologically items. */
export default function Item({ at, oldest = false, secondary = false, children }: ItemProps) {
  const theme = useTheme();
  const [styles, cx] = useStyles(styleSheetItem);

  return (
    <ListItem>
      <Row
        middleAlign
        before={
          <div className={cx(secondary && styles.iconWrapper_secondary)}>
            <IconRecord decorative size={secondary ? 4 : 8} color={theme.color.core.neutral[3]} />
          </div>
        }
      >
        {secondary ? (
          children
        ) : (
          <Text small muted>
            <T
              phrase="%{mediumDate} (%{relativeDate})"
              k="lunar.timeline.date"
              mediumDate={DateTime.format({ at, medium: true })}
              relativeDate={DateTime.relative(at!)}
            />
          </Text>
        )}
      </Row>
      <div
        className={cx(
          oldest && styles.wrapper_oldest,
          !oldest && styles.wrapper,
          !oldest && secondary && styles.wrapper_secondary,
        )}
      >
        {!secondary && children}
      </div>
    </ListItem>
  );
}
