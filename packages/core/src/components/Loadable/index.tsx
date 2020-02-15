import React from 'react';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import renderElementOrFunction, { RenderableProp } from '../../utils/renderElementOrFunction';

export type Props<T extends object> = {
  /** Allow all props since they are piped to the loaded component. */
  [prop: string]: unknown;
  /** Render the component once it has been loaded. */
  children?:
    | React.ReactNode
    | ((component: React.ComponentType<T>, ownProps: T) => React.ReactElement);
  /** A function that `import()`s a component and returns a promise. */
  component: () => Promise<{ default: React.ComponentType<T> }>;
  /**
   * Delay in milliseconds before showing the loader to avoid unnecessary rendering and flashing.
   * Pass 0 to disable the delay.
   */
  delay?: number;
  /**
   * Render an element or a function that returns an element when an error occurs.
   * The function is passed the `Error` as an argument.
   * When not defined, this defaults to `ErrorMessage`.
   */
  error?: RenderableProp<Error>;
  /** @ignore The component returned from `React.lazy` (exists for performance gains). */
  lazyComponent?: React.LazyExoticComponent<React.ComponentType<T>>;
  /**
   * Render an element or a function that returns an element while loading.
   * When not defined, this defaults to `Loader`.
   */
  loading?: RenderableProp;
  /** Disable the error state. */
  noError?: boolean;
  /** Disable the loading state. */
  noLoading?: boolean;
  /** Do not wrap component with a `React.Suspense` component. */
  noSuspense?: boolean;
};

export type State = {
  error: Error | null;
  showLoading: boolean;
};

/**
 * A declarative component for async loading of other components via native `import()` and `React.lazy`.
 * @experimental Requires React.lazy
 */
export default class Loadable<T extends object = {}> extends React.Component<Props<T>, State> {
  static defaultProps = {
    delay: 150,
    error: null,
    loading: null,
    noError: false,
    noLoading: false,
    noSuspense: false,
  };

  mounted: boolean = false;

  state: State = {
    error: null,
    showLoading: this.props.delay! <= 0,
  };

  static factory<P extends object>(
    component: Props<P>['component'],
    initialProps: Omit<Props<P>, 'component'> = {},
  ) {
    // Start lazy loading the component in the module scope
    // when the factory is called, instead of when it renders.
    const lazyComponent = React.lazy(component);

    return function LoadableFactory(props: P) {
      return (
        <Loadable
          {...initialProps}
          {...props}
          component={component}
          lazyComponent={lazyComponent}
        />
      );
    };
  }

  // istanbul ignore next
  componentDidCatch(error: Error) {
    this.setState({
      error,
    });
  }

  componentDidMount() {
    this.mounted = true;

    const { delay } = this.props;

    if (delay && delay > 0) {
      window.setTimeout(() => {
        if (!this.mounted) {
          return;
        }

        this.setState({
          showLoading: true,
        });
      }, delay);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  renderComponent = () => {
    const {
      children,
      component,
      delay,
      error,
      lazyComponent,
      loading,
      noError,
      noLoading,
      noSuspense,
      ...restProps
    } = this.props;
    const Component = lazyComponent ?? React.lazy(component);

    if (typeof children === 'function') {
      // @ts-ignore Bug: https://github.com/Microsoft/TypeScript/issues/26970
      return children(Component, restProps);
    }

    // @ts-ignore Props spreading
    return <Component {...restProps}>{children}</Component>;
  };

  renderError = () => {
    const { error } = this.state;
    const { error: renderable, noError } = this.props;

    if (!error || noError) {
      return null;
    }

    return renderElementOrFunction(renderable, error) ?? <ErrorMessage error={error} />;
  };

  renderLoading(): NonNullable<React.ReactNode> | null {
    const { loading, noLoading } = this.props;

    if (!this.state.showLoading || noLoading) {
      return null;
    }

    return renderElementOrFunction(loading) ?? <Loader static />;
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }

    const children = this.renderComponent();

    if (this.props.noSuspense) {
      return children;
    }

    return <React.Suspense fallback={this.renderLoading()}>{children}</React.Suspense>;
  }
}
