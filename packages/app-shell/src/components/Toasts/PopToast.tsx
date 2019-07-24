import { useContext, useEffect, useRef } from 'react';
import { Props as BaseProps } from '@airbnb/lunar/lib/components/Toast';
import { Omit } from 'utility-types';
import AppContext from '../AppContext';

export type Props = Omit<BaseProps, 'id' | 'onRemove'>;

export default function PopToast({ message, ...props }: Props) {
  const context = useContext(AppContext);
  const ref = useRef<boolean>();
  ref.current = true;

  useEffect(() => {
    if (!context) {
      return undefined;
    }
    if (props.danger || message instanceof Error) {
      context.addFailureToast(message, props);
    } else if (props.refresh) {
      context.addRefreshToast(message, props);
    } else if (props.success) {
      context.addSuccessToast(message, props);
    } else {
      context.addInfoToast(message, props);
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return null;
}
