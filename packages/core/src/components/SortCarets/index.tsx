import React from 'react';
import IconCaretUp from '@airbnb/lunar-icons/lib/interface/IconCaretUp';
import IconCaretDown from '@airbnb/lunar-icons/lib/interface/IconCaretDown';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';

export type Props = {
  /** Whether or not to display the bottom caret. */
  down?: boolean;
  /** If enabled, the caret is more pronounced. */
  enableDown: boolean;
  /** If enabled, the caret is more pronounced. */
  enableUp: boolean;
  /** Whether or not to display the top caret. */
  up?: boolean;
};

/** Carets to indicate sorting on DataTable. */
export class SortCarets extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    down: true,
    enableDown: false,
    enableUp: false,
    up: true,
  };

  renderCaretUp() {
    const { down, up, enableUp, styles } = this.props;

    return (
      up && (
        <span
          {...css(
            down && styles.caret_up,
            styles.caret,
            enableUp ? styles.caret_active : styles.caret_inactive,
          )}
        >
          <IconCaretUp size="2em" />
        </span>
      )
    );
  }

  renderCaretDown() {
    const { down, up, enableDown, styles } = this.props;

    return (
      down && (
        <span
          {...css(
            up && styles.caret_down,
            styles.caret,
            enableDown ? styles.caret_active : styles.caret_inactive,
          )}
        >
          <IconCaretDown size="2em" />
        </span>
      )
    );
  }

  render() {
    const { styles } = this.props;

    return (
      <span {...css(styles.caret_container)}>
        {this.renderCaretUp()}
        {this.renderCaretDown()}
      </span>
    );
  }
}

export default withStyles((theme: WithStylesProps['theme']) => ({
  caret_container: {
    marginRight: 0.5 * theme!.unit,
  },
  caret: {
    position: 'relative',
    right: 0.5 * theme!.unit,
  },
  caret_inactive: {
    color: theme!.color.core.neutral[3],
  },
  caret_active: {
    color: theme!.color.core.neutral[4],
  },
  caret_up: {
    bottom: -11,
  },
  caret_down: {
    bottom: 11,
  },
}))(SortCarets);
