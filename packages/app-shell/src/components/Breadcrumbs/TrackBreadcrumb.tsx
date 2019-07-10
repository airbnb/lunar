import { useContext, useEffect } from 'react';
import { Props } from '@airbnb/lunar/lib/components/Breadcrumbs/Breadcrumb';
import AppContext from '../AppContext';

export default function TrackBreadcrumb({ label, ...props }: Props) {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  useEffect(() => {
    const id = context.addBreadcrumb(label, props);

    return () => {
      context.removeBreadcrumb(id);
    };
  }, [label]);

  return null;
}
