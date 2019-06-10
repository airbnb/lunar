import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import StatusText from '../StatusText';

export type Props = {
  /** ID of the input field associated with the error. */
  id: string;
  /** The error message. */
  error?: string;
};

/** Display a simple error message for use within forms. */
export class FormErrorMessage extends React.Component<Props & WithStylesProps> {
  render() {
    const { cx, id, error, styles } = this.props;

    if (!error) {
      return null;
    }

    return (
      <div id={`${id}-error`} role="alert" aria-live="polite" className={cx(styles.error)}>
        <StatusText danger>{error}</StatusText>
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  error: {
    marginTop: unit,
  },
}))(FormErrorMessage);
