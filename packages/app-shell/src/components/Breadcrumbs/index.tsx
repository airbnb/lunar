import React, { useContext } from 'react';
import BaseBreadcrumbs, { Breadcrumb, Props } from '@airbnb/lunar/lib/components/Breadcrumbs';
import AppContext from '../AppContext';

export default function Breadcrumbs(props: Props) {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { breadcrumbs } = context;
  const lastIndex = breadcrumbs.length - 1;

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <BaseBreadcrumbs {...props}>
      {breadcrumbs.map((crumb, index) => (
        <Breadcrumb
          {...crumb.props}
          key={crumb.id}
          label={crumb.label}
          hideIcon={index === lastIndex}
          highlighted={index === lastIndex}
        />
      ))}
    </BaseBreadcrumbs>
  );
}
