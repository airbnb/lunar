import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

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
export class Row extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    after: null,
    baseline: false,
    before: null,
    compact: false,
    flat: false,
    inline: false,
    middleAlign: false,
    topline: false,
    truncated: false,
  };

  render() {
    const {
      after,
      baseline,
      before,
      children,
      compact,
      cx,
      inline,
      maxHeight,
      middleAlign,
      minHeight,
      spacious,
      styles,
      topline,
      truncated,
    } = this.props;

    return (
      <div
        className={cx(
          styles.row,
          { maxHeight, minHeight },
          compact && styles.row_compact,
          spacious && styles.row_spacious,
          middleAlign && styles.row_middleAlign,
          baseline && styles.row_baseline,
          topline && styles.row_topline,
        )}
      >
        {before && (
          <div
            className={cx(
              styles.before,
              inline && styles.inline,
              (inline || compact) && styles.before_compact,
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
            )}
          >
            {after}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(({ ui, unit }) => ({
  row: {
    display: 'flex',
  },

  row_compact: {
    paddingBottom: unit * 1.5,
    paddingTop: unit * 1.5,
  },

  row_spacious: {
    paddingBottom: unit * 3,
    paddingTop: unit * 3,
  },

  row_middleAlign: {
    alignItems: 'center',
  },

  row_baseline: {
    borderBottom: ui.border,
  },

  row_topline: {
    borderTop: ui.border,
  },

  after: {
    paddingLeft: unit * 2,
    flexShrink: 0,
  },

  after_compact: {
    paddingLeft: unit,
  },

  before: {
    paddingRight: unit * 2,
    flexShrink: 0,
  },

  before_compact: {
    paddingRight: unit,
  },

  primary: {
    flex: 1,
    maxWidth: '100%',
  },

  primary_truncated: {
    overflow: 'hidden',
  },

  inline: {
    display: 'inline-flex',
    alignSelf: 'initial',
  },
}))(Row);
