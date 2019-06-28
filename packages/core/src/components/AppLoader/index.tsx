import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import Title from '../Title';
import Text from '../Text';
import { ErrorType } from '../../types';

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
export class AppLoader extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    centered: false,
    small: false,
    subtitle: null,
  };

  render() {
    const {
      cx,
      centered,
      children,
      error,
      errorTitle,
      failureText,
      fetched,
      loadingText,
      small,
      styles,
      subtitle,
    } = this.props;

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
}

export default withStyles(({ unit }) => ({
  appLoader: {
    padding: unit * 10,
  },

  appLoader_centered: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtitle: {
    marginTop: unit,
  },

  errorOrLoader: {
    marginTop: unit * 1.5,
    maxWidth: '65%',
  },
}))(AppLoader);
