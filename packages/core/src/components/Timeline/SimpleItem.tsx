import React from 'react';
import IconRecord from '@airbnb/lunar-icons/src/interface/IconRecord';
import useStyles from '../../hooks/useStyles';
import { styleSheetSimpleItem } from './styles';
import Row from '../Row';
import useTheme from '../../hooks/useTheme';

export type SimpleItemProps = {
  /** Whether an item is the oldest (chronologically) in the collection of items. */
  oldest?: boolean;

  /** Content to render for the title of the item. */
  children: NonNullable<React.ReactNode>;
};

/** Represents a visually deemphasized single item in a collection of chronologically items. */
export default function SimpleItem({ oldest = false, children }: SimpleItemProps) {
  const theme = useTheme();
  const [styles, cx] = useStyles(styleSheetSimpleItem);

  return (
    <>
      <Row
        middleAlign
        before={
          <div className={cx(styles.iconWrapper)}>
            <IconRecord size={4} color={theme.color.core.neutral[3]} />
          </div>
        }
      >
        {children}
      </Row>
      {!oldest && <div className={cx(styles.wrapper)} />}
    </>
  );
}
