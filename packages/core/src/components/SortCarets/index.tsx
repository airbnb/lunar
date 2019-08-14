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
        <span
          className={cx(
            styles.caret,
            styles.caret_up,
            enableUp ? styles.caret_active : styles.caret_inactive,
          )}
        >
          <IconCaretUp decorative size="1.6em" />
        </span>
      )
    );
  }

  renderCaretDown() {
    const { cx, down, enableDown, styles } = this.props;

    return (
      down && (
        <span
          className={cx(
            styles.caret,
            styles.caret_down,
            enableDown ? styles.caret_active : styles.caret_inactive,
          )}
        >
          <IconCaretDown decorative size="1.6em" />
        </span>
      )
    );
  }

  render() {
    const { cx, styles, up, down } = this.props;

    return (
      <span className={cx(styles.container, up && down && styles.container_full)}>
        {this.renderCaretUp()}
        {this.renderCaretDown()}
      </span>
    );
  }
}

export default withStyles(({ color, unit }) => ({
  container: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginTop: -1,
    width: unit * 1.5,
    height: unit,
  },

  container_full: {
    height: unit * 2,
  },

  caret: {
    display: 'block',
    position: 'relative',
    width: unit * 1.5,
    height: unit,
    overflow: 'hidden',
  },

  caret_up: {
    '@selectors': {
      '> svg': {
        margin: '-.4em',
        marginTop: '-.5em',
      },
    },
  },

  caret_down: {
    '@selectors': {
      '> svg': {
        margin: '-.4em',
        marginTop: '-.6em',
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
