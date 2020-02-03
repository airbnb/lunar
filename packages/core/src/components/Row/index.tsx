import React from 'react';
import useStyles from '../../hooks/useStyles';
import { styleSheet } from './styles';

export type Props = {
  /** The contents following the primary contents. */
  after?: React.ReactNode;
  /** The visibility of the row's baseline. */
  baseline?: boolean;
  /** The contents preceding the primary contents. */
  before?: React.ReactNode;
  /** The primary contents to render. */
  children: NonNullable<React.ReactNode>;
  /** Render with reduced vertical padding (12px). */
  compact?: boolean;
  /** Render content as inline. */
  inline?: boolean;
  /** Max height of row. */
  maxHeight?: number | string;
  /** Align contents in the middle vertically. */
  middleAlign?: boolean;
  /** Min height of row. */
  minHeight?: number | string;
  /** Render with vertical padding (24px). */
  spacious?: boolean;
  /** The visibility of the row's topline. */
  topline?: boolean;
  /** To use with text truncation; overflow is hidden. */
  truncated?: boolean;
};

/** A presentational block element for displaying horizontal content in up to 3 columns. */
export default function Row({
  after,
  baseline,
  before,
  children,
  compact,
  inline,
  maxHeight,
  middleAlign,
  minHeight,
  spacious,
  topline,
  truncated,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div
      className={cx(
        styles.row,
        { maxHeight, minHeight },
        compact && !inline && styles.row_compact,
        spacious && styles.row_spacious,
        middleAlign && styles.row_middleAlign,
        baseline && styles.row_baseline,
        topline && styles.row_topline,
        inline && styles.row_inline,
      )}
    >
      {before && (
        <div
          className={cx(
            styles.before,
            inline && styles.inline,
            (inline || compact) && styles.before_compact,
            inline && compact && styles.before_compact_inline,
          )}
        >
          {before}
        </div>
      )}

      <div
        className={cx(
          inline ? styles.inline : styles.primary,
          truncated && styles.primary_truncated,
        )}
      >
        {children}
      </div>

      {after && (
        <div
          className={cx(
            styles.after,
            inline && styles.inline,
            (inline || compact) && styles.after_compact,
            inline && compact && styles.after_compact_inline,
          )}
        >
          {after}
        </div>
      )}
    </div>
  );
}
