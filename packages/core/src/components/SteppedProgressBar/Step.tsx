import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ProgressBar from '../ProgressBar';
import Tooltip from '../Tooltip';

export type Props = {
  /** Mark the step as complete. */
  complete?: boolean;
  /** @ignore Mark as the first step. */
  first?: boolean;
  /** A label to display within a tooltip. */
  label?: React.ReactNode;
  /** @ignore Mark as the last step. */
  last?: boolean;
};

/** An individual step within a stepped progress bar. */
export class Step extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    complete: false,
    first: false,
    label: null,
    last: false,
  };

  render() {
    const { cx, complete, first, last, label, styles } = this.props;
    const bar = (
      <ProgressBar
        leading={first || (!first && !last)}
        trailing={last || (!first && !last)}
        percent={complete ? 100 : 0}
      />
    );

    return (
      <div className={cx(styles.step)}>
        {label ? <Tooltip content={label}>{bar}</Tooltip> : bar}
      </div>
    );
  }
}

export default withStyles(() => ({
  step: {
    flexGrow: 1,
    marginRight: 2,

    ':last-child': {
      marginRight: 0,
    },

    '@selectors': {
      // Fix tooltips mixed with flexbox
      '> *': {
        display: 'block',
        width: '100%',
      },
    },
  },
}))(Step);
