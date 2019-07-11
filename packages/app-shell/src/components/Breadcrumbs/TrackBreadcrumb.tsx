import { useContext, useEffect, useRef } from 'react';
import { Props } from '@airbnb/lunar/lib/components/Breadcrumbs/Breadcrumb';
import AppContext from '../AppContext';

export default function TrackBreadcrumb({ label, ...props }: Props) {
  const context = useContext(AppContext);
  const ref = useRef<boolean>();
  ref.current = true;

  if (!context) {
    return null;
  }

  useEffect(() => {
    const id = context.addBreadcrumb(label, props);

    return () => {
      context.removeBreadcrumb(id);
    };
  }, [ref.current]);

  return null;
}
