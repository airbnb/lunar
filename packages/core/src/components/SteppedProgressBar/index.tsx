import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Step from './Step';

export type Props = {
  /** List of `Step`s to track progress. */
  children: NonNullable<React.ReactNode>;
};

/** A progress bar separated into individual steps. */
export class SteppedProgressBar extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    children: childrenOfType(Step).isRequired,
  };

  render() {
    const { cx, children, styles } = this.props;
    const steps = React.Children.count(children);

    return (
      <div className={cx(styles.bar)}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as React.ReactElement<any>, {
            first: index === 0,
            last: index === steps - 1,
          }),
        )}
      </div>
    );
  }
}

export { Step };

export default withStyles(() => ({
  bar: {
    display: 'flex',
  },
}))(SteppedProgressBar);
