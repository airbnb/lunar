import { useContext, useEffect } from 'react';
import { BreadcrumbProps } from '@airbnb/lunar/lib/components/Breadcrumbs/Breadcrumb';
import AppContext from '../AppContext';

export type TrackBreadcrumbProps = BreadcrumbProps;

export default function TrackBreadcrumb({ label, ...props }: TrackBreadcrumbProps) {
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
