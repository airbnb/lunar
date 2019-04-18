/* eslint-disable react/jsx-handler-names */

import React from 'react';
import uuid from 'uuid/v4';
import Core from '@airbnb/lunar';
import { Props as ToastProps } from '@airbnb/lunar/lib/components/Toast';
import withBoundary from '@airbnb/lunar/lib/composers/withBoundary';
import componentName from '@airbnb/lunar/lib/prop-types/componentName';
import Layout from './components/Layout';
import Toasts from './components/Toasts';
import AppContext from './components/AppContext';
import { ToastType, Toast } from './types';

export type Props = {
  /** Application to render. */
  children: NonNullable<React.ReactNode>;
  /** Name of the entire application or project. */
  name: string;
};

export type State = {
  data: { [id: string]: object };
  toasts: Toast[];
};

export { AppContext };

export class AppShell extends React.Component<Props, State> {
  static propTypes = {
    name: componentName.isRequired,
  };

  static defaultProps = {
    name: Core.settings.name,
  };

  state = {
    data: {},
    toasts: [],
  };

  addPageData = (data: object, customID: string = '') => {
    const id = customID || uuid();

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [id]: data,
      },
    }));

    return id;
  };

  addToast = (message: string | Error, type: ToastType, props: Partial<ToastProps> = {}) => {
    const id = uuid();

    this.setState(prevState => ({
      toasts: [
        ...prevState.toasts,
        {
          id,
          message,
          props: {
            ...props,
            [type]: true,
          },
        },
      ],
    }));

    return id;
  };

  addRefreshToast = (message: string) => this.addToast(message, 'refresh', { duration: 0 });

  addInfoToast = (message: string, props?: Partial<ToastProps>) =>
    this.addToast(message, 'info', props);

  addSuccessToast = (message: string, props?: Partial<ToastProps>) =>
    this.addToast(message, 'success', props);

  addFailureToast = (message: string | Error, props?: Partial<ToastProps>) =>
    this.addToast(message, 'danger', props);

  removePageData = (id: string) => {
    this.setState(prevState => {
      const data = { ...prevState.data };

      delete data[id];

      return { data };
    });
  };

  removeToast = (id: string) => {
    this.setState(prevState => ({
      toasts: prevState.toasts.filter(toast => toast.id !== id),
    }));
  };

  render() {
    const { children } = this.props;
    const context = {
      addPageData: this.addPageData,
      addInfoToast: this.addInfoToast,
      addFailureToast: this.addFailureToast,
      addSuccessToast: this.addSuccessToast,
      addRefreshToast: this.addRefreshToast,
      data: this.state.data,
      name: this.props.name,
      removePageData: this.removePageData,
      removeToast: this.removeToast,
      toasts: this.state.toasts,
    };

    return (
      <AppContext.Provider value={context}>
        <Layout>{children}</Layout>

        <Toasts toasts={context.toasts} onRemove={this.removeToast} />
      </AppContext.Provider>
    );
  }
}

export default withBoundary('App')(AppShell);
