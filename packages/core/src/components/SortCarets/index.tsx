import React from 'react';
import IconCaretUp from '@airbnb/lunar-icons/lib/interface/IconCaretUp';
import IconCaretDown from '@airbnb/lunar-icons/lib/interface/IconCaretDown';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetSortCarets } from './styles';

export type SortCaretsProps = {
  /** Whether or not to display the bottom caret. */
  down?: boolean;
  /** If enabled, the caret is more pronounced. */
  enableDown?: boolean;
  /** If enabled, the caret is more pronounced. */
  enableUp?: boolean;
  /** Whether or not to display the top caret. */
  up?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Carets to indicate sorting on a table. */
export default function SortCarets({
  down,
  enableDown,
  enableUp,
  up,
  styleSheet,
}: SortCaretsProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetSortCarets);

  return (
    <span className={cx(styles.container, up && down && styles.container_full)}>
      {up && (
        <span
          className={cx(
            styles.caret,
            styles.caret_up,
            enableUp ? styles.caret_active : styles.caret_inactive,
          )}
        >
          <IconCaretUp decorative size="1.6em" />
        </span>
      )}

      {down && (
        <span
          className={cx(
            styles.caret,
            styles.caret_down,
            enableDown ? styles.caret_active : styles.caret_inactive,
          )}
        >
          <IconCaretDown decorative size="1.6em" />
        </span>
      )}
    </span>
  );
}
