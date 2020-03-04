import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Step from './Step';
import { styleSheetBar } from './styles';

export type SteppedProgressBarProps = {
  /** List of `Step`s to track progress. */
  children: NonNullable<React.ReactNode>;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A progress bar separated into individual steps. */
function SteppedProgressBar({ children, styleSheet }: SteppedProgressBarProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetBar);
  const steps = React.Children.count(children);

  return (
    <div className={cx(styles.bar)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          first: index === 0,
          last: index === steps - 1,
        }),
      )}
    </div>
  );
}

SteppedProgressBar.propTypes = {
  children: childrenOfType(Step).isRequired,
};

export { Step };

export default SteppedProgressBar;
