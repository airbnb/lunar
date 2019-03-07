export type Context = {
  addPageData: (data: object, customID?: string) => string;
  addInfoToast: (message: string, props?: object) => string;
  addFailureToast: (message: string, props?: object) => string;
  addSuccessToast: (message: string, props?: object) => string;
  addRefreshToast: (message: string, props?: object) => string;
  data: { [key: string]: object };
  name: string;
  removePageData: (id: string) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

export type ToastType = 'info' | 'success' | 'danger' | 'refresh';

export type Toast = {
  id: string;
  message: string | Error;
  props?: object;
};
