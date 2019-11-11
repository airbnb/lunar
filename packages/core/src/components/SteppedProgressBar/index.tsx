import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import Step from './Step';
import { styleSheet } from './styles';

export type Props = {
  /** List of `Step`s to track progress. */
  children: NonNullable<React.ReactNode>;
};

/** A progress bar separated into individual steps. */
function SteppedProgressBar({ children }: Props) {
  const [styles, cx] = useStyles(styleSheet);

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
