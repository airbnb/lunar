import React from 'react';
import shallowEqual from 'shallowequal';
import finishHOC from '@airbnb/lunar/lib/utils/finishHOC';
import withBoundary from '@airbnb/lunar/lib/composers/withBoundary';
import AppContext from '../components/AppContext';
import { Context } from '../types';

export interface ConnectedComponent extends React.ComponentClass<{}> {
  registerPageData(): object;
}

export type ConnectToAppWrapperProps = {
  app: Context;
};

export type ConnectToAppProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.RefObject<any>;
};

export default function connectToApp(scope: string) /* infer */ {
  if (!scope && __DEV__) {
    throw new Error(
      'Connecting to the application shell requires a unique scope or component name.',
    );
  }

  return function connectToAppFactory<Props extends object = {}>(
    WrappedComponent: React.ComponentType<Props & ConnectToAppProps>,
  ): React.ComponentType<Props> {
    class ConnectToApp extends React.Component<Props & ConnectToAppWrapperProps> {
      id: string = '';

      instanceRef = React.createRef<ConnectedComponent>();

      lastData: object = {};

      componentDidMount() {
        this.lastData = this.getPageData();
        this.id = this.props.app.addPageData(this.lastData);
      }

      componentDidUpdate() {
        const data = this.getPageData();

        if (!shallowEqual(this.lastData, data)) {
          this.lastData = data;
          this.id = this.props.app.addPageData(data, this.id);
        }
      }

      componentWillUnmount() {
        this.props.app.removePageData(this.id);
      }

      getPageData(): object {
        const { current } = this.instanceRef;
        const data = {
          app_name: this.props.app.name,
          scope,
        };

        if (current && typeof current.registerPageData === 'function') {
          Object.assign(data, current.registerPageData());
        } else if (__DEV__) {
          throw new Error('Connected component has not defined an registerPageData() method.');
        }

        return data;
      }

      render() {
        const { app, ...props } = this.props;

        // @ts-ignore Props spreading
        return <WrappedComponent {...props} ref={this.instanceRef} />;
      }
    }

    function ConnectToAppWrapper(props: Props) {
      return (
        <AppContext.Consumer>{app => <ConnectToApp {...props} app={app} />}</AppContext.Consumer>
      );
    }

    return withBoundary(scope)(finishHOC('connectToApp', ConnectToAppWrapper, WrappedComponent));
  };
}
