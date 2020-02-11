import { BreadcrumbProps } from '@airbnb/lunar/lib/components/Breadcrumbs/Breadcrumb';
import { ToastProps } from '@airbnb/lunar/lib/components/Toast';

export type Breadcrumb = {
  id: string;
  label: string;
  props?: Partial<BreadcrumbProps>;
};

export type ToastType = 'info' | 'success' | 'danger' | 'refresh';

export type Toast = {
  id: string;
  message: string | Error;
  props?: Partial<ToastProps>;
};

export type Context = {
  addBreadcrumb: (label: string, props?: Breadcrumb['props']) => string;
  addPageData: (data: object, customID?: string) => string;
  addInfoToast: (message: string, props?: Toast['props']) => string;
  addFailureToast: (message: string | Error, props?: Toast['props']) => string;
  addSuccessToast: (message: string, props?: Toast['props']) => string;
  addRefreshToast: (message: string, props?: Toast['props']) => string;
  breadcrumbs: Breadcrumb[];
  data: { [key: string]: object };
  name: string;
  removeBreadcrumb: (id: string) => void;
  removePageData: (id: string) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
};
