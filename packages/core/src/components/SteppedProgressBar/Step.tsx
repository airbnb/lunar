import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import ProgressBar from '../ProgressBar';
import Tooltip from '../Tooltip';
import { styleSheetStep } from './styles';

export type StepProps = {
  /** Mark the step as complete. */
  complete?: boolean;
  /** @ignore Mark as the first step. */
  first?: boolean;
  /** A label to display within a tooltip. */
  label?: React.ReactNode;
  /** @ignore Mark as the last step. */
  last?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** An individual step within a stepped progress bar. */
export default function Step({ complete, first, last, label, styleSheet }: StepProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetStep);

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
