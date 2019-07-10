import React from 'react';
import { Props } from '@airbnb/lunar/lib/components/Breadcrumbs/Breadcrumb';
import AppContext from '../AppContext';
import { Context } from '../../types';

export default class TrackBreadcrumb extends React.Component<Props> {
  static contextType = AppContext;

  id?: string;

  componentDidMount() {
    const { props } = this;
    const context = this.getContext();

    if (context) {
      this.id = context.addBreadcrumb(props.label, props);
    }
  }

  componentWillUnmount() {
    const context = this.getContext();

    if (context && this.id) {
      context.removeBreadcrumb(this.id);
    }
  }

  getContext(): Context | null {
    return this.context;
  }

  render() {
    return null;
  }
}
