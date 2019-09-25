import React from 'react';
import { Context } from '../types';

const noop = () => '';

export const defaultContext: Context = {
  addBreadcrumb: noop,
  addPageData: noop,
  addInfoToast: noop,
  addFailureToast: noop,
  addSuccessToast: noop,
  addRefreshToast: noop,
  breadcrumbs: [],
  data: {},
  name: '',
  removeBreadcrumb() {},
  removePageData() {},
  removeToast() {},
  toasts: [],
};

export default React.createContext<Context>(defaultContext);
