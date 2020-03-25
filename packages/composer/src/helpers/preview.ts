import { MENU_PREVIEW } from '../constants';
import { WritableContext, DataSet } from '../types';

// eslint-disable-next-line import/prefer-default-export
export function onSubmitShowPreview(result: DataSet, context: WritableContext) {
  // Preview has been confirmed so pass through submit handlers
  // and reset the current preview state.
  if (result.previewConfirmed) {
    context.setMenu('');
    context.setData('previewConfirmed', false);

    return false;
  }

  context.setMenu((menu) => (menu === MENU_PREVIEW ? '' : MENU_PREVIEW));

  // Abort so subsequent submit handlers are not called
  return true;
}
