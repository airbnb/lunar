import React, { useContext } from 'react';
import T from '@airbnb/lunar/lib/components/Translate';
import Interweave from '@airbnb/lunar/lib/components/Interweave';
import Menu from '../Menu';
import Hotkey from '../Hotkey';
import ComposerContext from '../../contexts/ComposerContext';
import { onSubmitShowPreview } from '../../helpers/preview';
import { MENU_PREVIEW } from '../../constants';
import Proofreader, { ProofreaderProps } from './Proofreader';
import Window from './Window';
import { isMac } from '../../helpers/platform';

export type PreviewProps = {
  /** Require manual confirmation before submitting. */
  requireConfirmation?: boolean;
} & Omit<Partial<ProofreaderProps>, 'onConfirm' | 'value'>;

export default function Preview({
  requireConfirmation = false,
  onProofread,
  ...props
}: PreviewProps) {
  const context = useContext(ComposerContext);

  // Handlers
  const handleConfirmPreview = () => {
    context.setData('previewConfirmed', true);

    // Force a submission after context propagates
    setTimeout(() => {
      const button = document.getElementById(`${context.id}-submit-button`);

      if (button) {
        button.click();
      }
    }, 0);
  };

  // Enable feature
  context.flags.preview = true;
  context.flags.previewConfirm = requireConfirmation;

  if (requireConfirmation) {
    context.onSubmit(onSubmitShowPreview);
  }

  return (
    <>
      <Hotkey
        preventDefault
        combo={isMac() ? 'cmd+p' : 'ctrl+p'}
        condition={({ data }) =>
          !requireConfirmation && !!data.focused && data.value !== '' && !data.value.startsWith('/')
        }
        name="showPreview"
        label={T.phrase('lunar.composer.hotkey.returnToPreview', 'to preview')}
        order={100}
        onRun={ctx => onSubmitShowPreview(ctx.data, ctx)}
      />

      <Menu
        centerAlign
        name={MENU_PREVIEW}
        title={<T k="lunar.composer.preview.title" phrase="Preview" />}
      >
        {onProofread ? (
          <Proofreader
            {...props}
            value={context.data.value}
            onConfirm={handleConfirmPreview}
            onProofread={onProofread}
          />
        ) : (
          <Window onConfirm={handleConfirmPreview}>
            <Interweave content={context.data.value} />
          </Window>
        )}
      </Menu>
    </>
  );
}
