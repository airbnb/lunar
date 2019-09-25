import { useContext, useEffect } from 'react';
import { Props as BaseProps } from '@airbnb/lunar/lib/components/Toast';
import { Omit } from 'utility-types';
import AppContext from '../AppContext';

export type Props = Omit<BaseProps, 'id' | 'onRemove'>;

export default function PopToast({ message, ...props }: Props) {
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
