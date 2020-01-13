import React, { useContext } from 'react';
import T from '@airbnb/lunar/lib/components/Translate';
import Interweave from '@airbnb/lunar/lib/components/Interweave';
import Menu from '../Menu';
import ComposerContext from '../../contexts/ComposerContext';
import { onSubmitShowPreview } from '../../helpers/preview';
import { MENU_PREVIEW } from '../../constants';
import Proofreader, { ProofreaderProps } from './Proofreader';
import Window from './Window';

export type PreviewProps = {} & Omit<Partial<ProofreaderProps>, 'value'>;

export default function Preview({ onProofread, ...props }: PreviewProps) {
  const context = useContext(ComposerContext);

  // Handlers
  const handleConfirmPreview = () => {
    context.setData('previewConfirmed', true);

    // Force a submission after context propagates
    setTimeout(() => {
      const button = document.getElementById('composer-submit-button');

      if (button) {
        button.click();
      }
    }, 0);
  };

  // Enable feature
  context.flags.preview = true;
  context.onSubmit(onSubmitShowPreview);

  return (
    <Menu centerAlign name={MENU_PREVIEW} title={<T k="composer.preview.title" phrase="Preview" />}>
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
  );
}
