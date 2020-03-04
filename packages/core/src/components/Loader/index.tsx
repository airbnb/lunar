import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import { styleSheetLoader } from './styles';

export type LoaderProps = {
  /** Display inline instead of absolutely positioned. */
  inline?: boolean;
  /** Invert colors. */
  inverted?: boolean;
  /** Increase the dot size. */
  large?: boolean;
  /** Position statically instead of absolutely. */
  static?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A small 3-dot loading indicator. */
export default function Loader({
  inline,
  inverted,
  large,
  static: isStatic,
  styleSheet,
}: LoaderProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetLoader);

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
