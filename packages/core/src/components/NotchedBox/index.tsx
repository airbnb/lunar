import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetNotchedBox, createPosition, NOTCH_SIZE, NOTCH_SPACING } from './styles';

export { NOTCH_SIZE, NOTCH_SPACING };

export type NotchedBoxProps = {
  /** Content to be displayed. */
  children: NonNullable<React.ReactNode>;
  /** True to use inline-block container. */
  inline?: boolean;
  /** Toggle dark mode. */
  inverted?: boolean;
  /** True to have the notch show up on the bottom the box. */
  notchBelow?: boolean;
  /** Offset of the notch (can be a CSS size eg "50%"). */
  notchOffset?: number | string;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A container with a configurable arrow pointing outward. */
export default function NotchedBox({
  inverted,
  children,
  inline,
  notchBelow,
  notchOffset,
  styleSheet,
}: NotchedBoxProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetNotchedBox);

  return (
    <div className={cx(styles.box, !inverted && styles.border, inline && styles.box_inline)}>
      <div
        className={cx(
          styles.notch,
          notchOffset ? createPosition(notchOffset) : styles.notch_position,
          notchBelow && styles.notch_below,
          inverted ? styles.inverted : styles.border,
        )}
      />

      <div className={cx(styles.content, inverted && styles.inverted)}>{children}</div>
    </div>
  );
}
