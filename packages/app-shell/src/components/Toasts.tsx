import React from 'react';
import Toast from '@airbnb/lunar/lib/components/Toast';
import withStyles, { css, WithStylesProps } from '@airbnb/lunar/lib/composers/withStyles';
import { Z_INDEX_TOAST } from '@airbnb/lunar/lib/constants';
import { Toast as ToastItem } from '../types';

export type Props = {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
};

export class Toasts extends React.Component<Props & WithStylesProps> {
  render() {
    const { onRemove, toasts, styles } = this.props;

    return (
      <div {...css(styles.toasts)}>
        {toasts
          .map(toast => (
            <Toast
              {...toast.props}
              key={toast.id}
              id={toast.id}
              message={toast.message}
              onRemove={onRemove}
            />
          ))
          .reverse()}
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  toasts: {
    position: 'fixed',
    bottom: unit * 1.5,
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: 500,
    // Higher than modals
    zIndex: Z_INDEX_TOAST,
  },
}))(Toasts);
