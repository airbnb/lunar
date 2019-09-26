import React from 'react';
import uuid from 'uuid/v4';
import Core from '@airbnb/lunar';
import withBoundary from '@airbnb/lunar/lib/composers/withBoundary';
import componentName from '@airbnb/lunar/lib/prop-types/componentName';
import Layout from './components/Layout';
import Toasts from './components/Toasts';
import AppContext from './components/AppContext';
import { Breadcrumb, ToastType, Toast } from './types';

export * from './types';

export type Props = {
  /** Application to render. */
  children: NonNullable<React.ReactNode>;
  /** Name of the entire application or project. */
  name: string;
};

export type State = {
  breadcrumbs: Breadcrumb[];
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
    breadcrumbs: [],
    data: {},
    toasts: [],
  };

  addBreadcrumb = (label: string, props: Breadcrumb['props'] = {}) => {
    const id = uuid();

    this.setState(prevState => ({
      breadcrumbs: [
        ...prevState.breadcrumbs,
        {
          id,
          label,
          props,
        },
      ],
    }));

    return id;
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

  addToast = (message: string | Error, type: ToastType, props: Toast['props'] = {}) => {
    const id = props.id || uuid();

    this.setState(prevState => ({
      toasts: [
        ...prevState.toasts.filter(toast => toast.id !== id),
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

  addInfoToast = (message: string, props?: Toast['props']) => this.addToast(message, 'info', props);

  addSuccessToast = (message: string, props?: Toast['props']) =>
    this.addToast(message, 'success', props);

  addFailureToast = (message: string | Error, props?: Toast['props']) =>
    this.addToast(message, 'danger', props);

  removeBreadcrumb = (id: string) => {
    this.setState(prevState => ({
      breadcrumbs: prevState.breadcrumbs.filter(crumb => crumb.id !== id),
    }));
  };

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
      addBreadcrumb: this.addBreadcrumb,
      addPageData: this.addPageData,
      addInfoToast: this.addInfoToast,
      addFailureToast: this.addFailureToast,
      addSuccessToast: this.addSuccessToast,
      addRefreshToast: this.addRefreshToast,
      breadcrumbs: this.state.breadcrumbs,
      data: this.state.data,
      name: this.props.name,
      removeBreadcrumb: this.removeBreadcrumb,
      removePageData: this.removePageData,
      removeToast: this.removeToast,
      toasts: this.state.toasts,
    };

    return (
      <AppContext.Provider value={context}>
        <Layout>{children}</Layout>
        <Toasts />
      </AppContext.Provider>
    );
  }
}

export default withBoundary('App')(AppShell);
