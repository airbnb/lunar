import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Spacing, { SpacingRange } from '../Spacing';
import { styleSheetDivider } from './styles';

export type DividerProps = {
  /** Spacing on the bottom. */
  bottom?: SpacingRange;
  /** Render the divider with a short width. */
  short?: boolean;
  /** Spacing on the top. */
  top?: SpacingRange;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A horizontal divider. */
export default function Divider({ bottom = 2, short, top = 2, styleSheet }: DividerProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetDivider);

  return (
    <Spacing bottom={bottom} top={top}>
      <div className={cx(styles.divider, short && styles.divider_short)} />
    </Spacing>
  );
}
