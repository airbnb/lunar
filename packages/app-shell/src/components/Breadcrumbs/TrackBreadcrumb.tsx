import { useContext, useEffect, useRef } from 'react';
import { Props } from '@airbnb/lunar/lib/components/Breadcrumbs/Breadcrumb';
import AppContext from '../AppContext';

export default function TrackBreadcrumb({ label, ...props }: Props) {
  const context = useContext(AppContext);
  const ref = useRef<boolean>();
  ref.current = true;

  useEffect(() => {
    if (!context) {
      return undefined;
    }

    const id = context.addBreadcrumb(label, props);

    return () => {
      context.removeBreadcrumb(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return null;
}
