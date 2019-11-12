import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export type Props = {
  /** Display inline instead of absolutely positioned. */
  inline?: boolean;
  /** Invert colors. */
  inverted?: boolean;
  /** Increase the dot size. */
  large?: boolean;
  /** Position statically instead of absolutely. */
  static?: boolean;
};

/** A small 3-dot loading indicator. */
export default function Loader({ inline, inverted, large, static: isStatic }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div
      className={cx(
        styles.loader,
        inline && styles.loader_inline,
        !isStatic && !inline && styles.loader_absolute,
      )}
    >
      {[1, 2, 3].map(no => (
        <span
          key={no}
          className={cx(
            styles.dot,
            styles[`dot_${no}`],
            large && styles.dot_large,
            inverted && styles.dot_inverted,
          )}
        />
      ))}
    </div>
  );
}
