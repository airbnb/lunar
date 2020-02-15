import React from 'react';
import useStyles from '../../hooks/useStyles';
import StatusText from '../StatusText';
import { styleSheet } from './styles';

export type Props = {
  /** ID of the input field associated with the error. */
  id: string;
  /** The error message. */
  error?: string;
};

/** Display a simple error message for use within forms. */
export default function FormErrorMessage({ id, error }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  if (!error) {
    return null;
  }

  return (
    <div id={`${id}-error`} role="alert" aria-live="polite" className={cx(styles.error)}>
      <StatusText danger>{error}</StatusText>
    </div>
  );
}
