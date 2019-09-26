import { useContext, useEffect } from 'react';
import { Props } from '@airbnb/lunar/lib/components/Breadcrumbs/Breadcrumb';
import AppContext from '../AppContext';

export default function TrackBreadcrumb({ label, ...props }: Props) {
  const { addBreadcrumb, removeBreadcrumb } = useContext(AppContext);

  useEffect(() => {
    const id = addBreadcrumb(label, props);

    return () => {
      removeBreadcrumb(id);
    };

    // We only care when the label changes, not all the props
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBreadcrumb, removeBreadcrumb, label]);

  return null;
}
