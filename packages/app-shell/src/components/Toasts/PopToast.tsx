import { useContext, useEffect } from 'react';
import { ToastProps } from '@airbnb/lunar/lib/components/Toast';
import AppContext from '../AppContext';

export type PopToastProps = Omit<ToastProps, 'id' | 'onRemove'>;

export default function PopToast({ message, ...props }: PopToastProps) {
  const { addFailureToast, addRefreshToast, addSuccessToast, addInfoToast } = useContext(
    AppContext,
  );

  useEffect(() => {
    if (props.danger || message instanceof Error) {
      addFailureToast(message, props);
    } else if (props.refresh) {
      addRefreshToast(message, props);
    } else if (props.success) {
      addSuccessToast(message, props);
    } else {
      addInfoToast(message, props);
    }

    // We only care when the message changes, not all the props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addFailureToast, addRefreshToast, addSuccessToast, addInfoToast, message]);

  return null;
}
