import React from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import StatusText from '../StatusText';
import { styleSheetFormError } from './styles';

export type FormErrorMessageProps = {
  /** ID of the input field associated with the error. */
  id: string;
  /** The error message. */
  error?: string;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Display a simple error message for use within forms. */
export default function FormErrorMessage({ id, error, styleSheet }: FormErrorMessageProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetFormError);

  if (!error) {
    return null;
  }

  return (
    <div id={`${id}-error`} role="alert" aria-live="polite" className={cx(styles.error)}>
      <StatusText danger>{error}</StatusText>
    </div>
  );
}
