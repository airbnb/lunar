import React from 'react';
import useStyles from '../../hooks/useStyles';
import ProgressBar from '../ProgressBar';
import Tooltip from '../Tooltip';
import { styleSheetStep as styleSheet } from './styles';

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
export default function Step({ complete, first, last, label }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  const bar = (
    <ProgressBar
      leading={first || (!first && !last)}
      trailing={last || (!first && !last)}
      percent={complete ? 100 : 0}
    />
  );

  return (
    <div className={cx(styles.step)}>{label ? <Tooltip content={label}>{bar}</Tooltip> : bar}</div>
  );
}
