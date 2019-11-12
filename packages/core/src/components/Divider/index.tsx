import React from 'react';
import useStyles from '../../hooks/useStyles';
import Spacing, { SpacingRange } from '../Spacing';
import { styleSheet } from './styles';

export type Props = {
  /** Spacing on the bottom. */
  bottom?: SpacingRange;
  /** Render the divider with a short width. */
  short?: boolean;
  /** Spacing on the top. */
  top?: SpacingRange;
};

/** A horizontal divider. */
export default function Divider({ bottom = 2, short, top = 2 }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <Spacing bottom={bottom} top={top}>
      <div className={cx(styles.divider, short && styles.divider_short)} />
    </Spacing>
  );
}
