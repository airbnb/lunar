import React from 'react';
import { Props as BaseProps } from '@airbnb/lunar/lib/components/Toast';
import { Omit } from 'utility-types';
import AppContext from '../AppContext';

export type Props = Omit<BaseProps, 'id' | 'onRemove'>;

export default class PopToast extends React.Component<Props> {
  static contextType = AppContext;

  componentDidMount() {
    const { context, props } = this;

    if (!context) {
      return;
    }

    if (props.danger || props.message instanceof Error) {
      context.addFailureToast(props.message, props);
    } else if (props.refresh) {
      context.addRefreshToast(props.message, props);
    } else if (props.success) {
      context.addSuccessToast(props.message, props);
    } else {
      context.addInfoToast(props.message, props);
    }
  }

  render() {
    return null;
  }
}
