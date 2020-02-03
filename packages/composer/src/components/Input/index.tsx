import React, { useState, useCallback, useContext, useRef } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import IconPlayAlt from '@airbnb/lunar-icons/lib/interface/IconPlayAlt';
import Interweave from '@airbnb/lunar/lib/components/Interweave';
import T from '@airbnb/lunar/lib/components/Translate';
import passThroughRef from '@airbnb/lunar/lib/utils/passThroughRef';
import ComposerContext from '../../contexts/ComposerContext';
import HotkeyContext from '../../contexts/HotkeyContext';
import Hotkey from '../Hotkey';
import IconButton from '../IconButton';
import useAutoResize from '../../hooks/useAutoResize';
import {
  processHotkeys,
  showWhenValueNotEmptyCondition,
  closeMenu,
  activeWhenMenuOpen,
} from '../../helpers/hotkeys';
import { isMac } from '../../helpers/platform';
import {
  processChangeHandlers,
  processSubmitHandlers,
  onSubmitResetValue,
} from '../../helpers/handlers';
import { MODE_PRIVATE_NOTE, MODE_EMAIL } from '../../constants';
import InlineInput from './InlineInput';
import { ChangeHandler, SubmitHandler } from '../../types';
import { inputStyleSheet } from '../../styles';
import { isShortcutCommand } from '../../helpers/shortcuts';

export type InputProps = {
  disabled?: boolean;
  invalid?: boolean;
  onChange?: ChangeHandler;
  onSubmit?: SubmitHandler;
  emailPlaceholder?: string;
  messagePlaceholder?: string;
  privateNotePlaceholder?: string;
  propagateRef?: React.Ref<HTMLTextAreaElement>;
};

export default function Input({
  disabled,
  invalid,
  onChange,
  onSubmit,
  emailPlaceholder,
  messagePlaceholder,
  privateNotePlaceholder,
  propagateRef,
}: InputProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const context = useContext(ComposerContext);
  const { hotkeys } = useContext(HotkeyContext);
  const [styles, cx] = useStyles(inputStyleSheet);
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const blocked = disabled || invalid || context.data.value.trim() === '';
  let placeholder =
    messagePlaceholder ?? T.phrase('Send message…', null, { key: 'composer.labels.sendMessage' });

  if (context.mode === MODE_EMAIL) {
    placeholder =
      emailPlaceholder ?? T.phrase('Send email…', null, { key: 'composer.labels.sendEmail' });
  } else if (context.mode === MODE_PRIVATE_NOTE) {
    placeholder =
      privateNotePlaceholder ??
      T.phrase('Private to Airbnb', null, { key: 'composer.labels.privateToAirbnb' });
  }

  // Form handlers
  const handleBlur = () => {
    setFocused(false);
    context.setData('focused', false);
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      try {
        // Consumer `onChange` should always be last
        processChangeHandlers(
          [...context.changeHandlers, onChange],
          event.currentTarget.value,
          context,
        );
      } catch (error) {
        context.setError(error.message);
      }
    },
    [onChange, context],
  );

  const handleFocus = () => {
    setFocused(true);
    context.setData('focused', true);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Shortcuts should never allow multiline
      if (isShortcutCommand(context.data.value) && event.key === 'Enter') {
        event.preventDefault();
      }

      processHotkeys(hotkeys, event, context, context);
    },
    [hotkeys, context],
  );

  const handleSubmit = useCallback(() => {
    try {
      context.setMenu('');

      if (!blocked) {
        // Consumer `onSubmit` should always be last
        processSubmitHandlers(
          [...context.submitHandlers, onSubmit, onSubmitResetValue],
          context.data,
          context,
        );
      }
    } catch (error) {
      context.setError(error.message);
    }
  }, [blocked, onSubmit, context]);

  // Passive hooks
  useAutoResize(ref.current, context.data.value);

  return (
    <>
      {context.mode === MODE_EMAIL && (
        <>
          <InlineInput
            label={T.phrase('Re:', null, { key: 'composer.email.subjectLine' })}
            name="emailSubject"
            value={context.data.emailSubject}
          />

          <InlineInput
            label={T.phrase('To:', null, { key: 'composer.email.toLine' })}
            name="emailTo"
            value={context.data.emailTo}
          />
        </>
      )}

      <div
        className={cx(
          styles.container,
          context.mode === MODE_PRIVATE_NOTE && styles.container_important,
          focused && styles.container_focused,
          disabled && styles.container_disabled,
          invalid && styles.container_invalid,
        )}
      >
        <section className={cx(styles.input, styles.input_shadow)}>
          <Interweave
            disableFilters
            disableMatchers
            content={context.data.value ? context.data.shadowValue : ''}
          />
        </section>

        <textarea
          ref={element => {
            passThroughRef(ref, element);
            passThroughRef(propagateRef, element);
          }}
          className={cx(styles.input, styles.input_original)}
          disabled={disabled}
          id="composer"
          name="message"
          placeholder={placeholder}
          rows={context.mode === MODE_EMAIL ? 3 : 1}
          value={context.data.value}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />

        <span className={cx(styles.submitButton)}>
          <IconButton
            accessibilityLabel={T.phrase('Submit composer', null, {
              key: 'composer.labels.submitComposer',
            })}
            disabled={blocked}
            icon={IconPlayAlt}
            id="composer-submit-button"
            onClick={handleSubmit}
          />
        </span>

        <Hotkey
          preventDefault
          combo={isMac() ? 'cmd+enter' : 'ctrl+enter'}
          condition={showWhenValueNotEmptyCondition}
          name="submit"
          label={
            context.flags.previewConfirm
              ? T.phrase('to preview', null, { key: 'composer.hotkey.returnToPreview' })
              : T.phrase('to send', null, { key: 'composer.hotkey.returnToSend' })
          }
          order={100}
          onRun={handleSubmit}
        />

        <Hotkey
          preventDefault
          combo="esc"
          condition={activeWhenMenuOpen}
          name="closeMenu"
          label={T.phrase('to dismiss', null, { key: 'composer.hotkey.toDismiss' })}
          onRun={closeMenu}
        />
      </div>
    </>
  );
}
