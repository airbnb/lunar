import React from 'react';
import IconRecord from '@airbnb/lunar-icons/src/interface/IconRecord';
import useStyles from '../../hooks/useStyles';
import { styleSheetItem } from './styles';
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
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.barWrapper)}>
          <div className={cx(styles.iconWrapper)}>
            <IconRecord
              decorative
              size={secondary ? theme.unit * 0.5 : theme.unit}
              color={theme.color.core.neutral[3]}
            />
          </div>

          {!oldest && <div className={cx(styles.bar)} />}
        </div>

        <div
          className={cx(
            styles.content,
            secondary && styles.content_secondary,
            oldest && styles.content_oldest,
          )}
        >
          {!secondary && (
            <Text small muted>
              <T
                phrase="%{mediumDate} (%{relativeDate})"
                k="lunar.timeline.date"
                mediumDate={DateTime.format({ at, medium: true })}
                relativeDate={DateTime.relative(at!)}
              />
            </Text>
          )}

          {children}
        </div>
      </div>
    </ListItem>
  );
}
