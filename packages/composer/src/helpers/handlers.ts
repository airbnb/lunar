import { ChangeHandler, SubmitHandler, WritableContext, DataSet } from '../types';

export function processChangeHandlers(
  handlers: (ChangeHandler | undefined)[],
  nextValue: string,
  context: WritableContext,
) {
  handlers.forEach((handler) => handler?.(nextValue, context));
}

export function processSubmitHandlers(
  handlers: (SubmitHandler | undefined)[],
  result: DataSet,
  context: WritableContext,
) {
  handlers.some((handler) => handler?.(result, context) === true);
}

/**
 * Once submit is successful, reset and clear the data state.
 */
export function onSubmitResetValue(result: unknown, { setError, setData }: WritableContext) {
  setData('value', '');
  setData('shadowValue', '');
  setError('');
}

/**
 * Sync context value with the value in the input field.
 */
export function onChangeSyncValue(nextValue: string, { setData }: WritableContext) {
  setData('value', nextValue);
}

/**
 * When the value changes, reset the current error state.
 */
export function onChangeResetError(nextValue: string, { setError }: WritableContext) {
  setError('');
}

/**
 * If a shadow value is defined and the next value does not match it, reset the shadow.
 */
export function onChangeResetShadowIfMismatch(
  nextValue: string,
  { data, setData }: WritableContext,
) {
  if (
    (data.shadowValue && !data.shadowValue.startsWith(nextValue)) ||
    (!nextValue && data.shadowValue)
  ) {
    setData('shadowValue', '');
  }
}

/**
 * When the value is cleared, hide all open menus.
 */
export function onChangeHideMenusWhenEmpty(nextValue: string, { setMenu }: WritableContext) {
  if (nextValue === '') {
    setMenu('');
  }
}
