import React from 'react';
import IconCaretUp from '@airbnb/lunar-icons/lib/interface/IconCaretUp';
import IconCaretDown from '@airbnb/lunar-icons/lib/interface/IconCaretDown';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Whether or not to display the bottom caret. */
  down?: boolean;
  /** If enabled, the caret is more pronounced. */
  enableDown?: boolean;
  /** If enabled, the caret is more pronounced. */
  enableUp?: boolean;
  /** Whether or not to display the top caret. */
  up?: boolean;
};

/** Carets to indicate sorting on a table. */
export class SortCarets extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    down: false,
    enableDown: false,
    enableUp: false,
    up: false,
  };

  renderCaretUp() {
    const { cx, up, enableUp, styles } = this.props;

    return (
      up && (
        <span className={cx(styles.caret, enableUp ? styles.caret_active : styles.caret_inactive)}>
          <IconCaretUp decorative size="2em" />
        </span>
      )
    );
  }

  renderCaretDown() {
    const { cx, down, enableDown, styles } = this.props;

    return (
      down && (
        <span
          className={cx(styles.caret, enableDown ? styles.caret_active : styles.caret_inactive)}
        >
          <IconCaretDown decorative size="2em" />
        </span>
      )
    );
  }

  render() {
    const { cx, styles } = this.props;

    return (
      <span className={cx(styles.caret_container)}>
        {this.renderCaretUp()}
        {this.renderCaretDown()}
      </span>
    );
  }
}

export default withStyles(({ color }) => ({
  caret_container: {
    display: 'inline-block',
  },

  caret: {
    display: 'block',
    position: 'relative',
    width: '1em',
    height: '1em',
    overflow: 'hidden',

    '@selectors': {
      '> svg': {
        margin: '-.5em',
      },
    },
  },

  caret_inactive: {
    color: color.core.neutral[3],
  },

  caret_active: {
    color: color.core.neutral[4],
  },
}))(SortCarets);
