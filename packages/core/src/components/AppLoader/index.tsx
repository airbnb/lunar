import React from 'react';
import useStyles from '../../hooks/useStyles';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import Title from '../Title';
import Text from '../Text';
import { ErrorType } from '../../types';
import { styleSheet } from './styles';

export type Props = {
  /** Center the loader and content. */
  centered?: boolean;
  /** Content to be rendered on a successful request. */
  children: NonNullable<React.ReactNode>;
  /** Request error. */
  error?: ErrorType | null;
  /** Title to display on error message. */
  errorTitle?: React.ReactNode;
  /** Text to display on a failed request. */
  failureText: NonNullable<React.ReactNode>;
  /** Whether a request is fetched. */
  fetched?: boolean;
  /** Text to display while a request is loading. */
  loadingText: NonNullable<React.ReactNode>;
  /** Reduce the title and subtitle size. */
  small?: boolean;
  /** Text to display below the title. */
  subtitle?: React.ReactNode;
};

/** A loading indicator, representing the state of a request, for applications and landing pages. */
export default function AppLoader({
  centered,
  children,
  error,
  errorTitle,
  failureText,
  fetched,
  loadingText,
  small,
  subtitle,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  if (fetched && !error) {
    return <main>{children}</main>;
  }

  return (
    <div className={cx(styles.appLoader, centered && styles.appLoader_centered)}>
      <Title level={small ? 3 : 1}>{error ? failureText : loadingText}</Title>

      {subtitle && (
        <div className={cx(styles.subtitle)}>
          <Text large={!small}>{subtitle}</Text>
        </div>
      )}

      <div className={cx(styles.errorOrLoader)}>
        {error ? <ErrorMessage error={error} title={errorTitle} /> : <Loader inline />}
      </div>
    </div>
  );
}
