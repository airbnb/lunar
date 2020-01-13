import React, { useState, useCallback, useContext, useRef } from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import inputStyleSheet from '@airbnb/lunar/lib/themes/inputStyleSheet';
import IconPlayAlt from '@airbnb/lunar-icons/lib/interface/IconPlayAlt';
import Interweave from '@airbnb/lunar/lib/components/Interweave';
import T from '@airbnb/lunar/lib/components/Translate';
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
import { processChangeHandlers, processSubmitHandlers } from '../../helpers/handlers';
import { MODE_PRIVATE_NOTE, MODE_EMAIL } from '../../constants';
import InlineInput from './InlineInput';
import { ChangeHandler, SubmitHandler } from '../../types';

const styleSheet: StyleSheet = theme => {
  const inputStyles = inputStyleSheet(theme);
  const { color, font, transition, ui, unit } = theme;

  return {
    container: {
      ...font.textRegular,
      ...transition.box,
      border: ui.borderThick,
      borderRadius: ui.borderRadius,
      color: color.accent.text,
      position: 'relative',

      ':hover': {
        borderColor: color.accent.borderHover,
      },

      '::placeholder': {
        color: color.muted,
      },
    },

    container_focused: inputStyles.input_focused,

    container_invalid: inputStyles.input_invalid,

    container_disabled: inputStyles.input_disabled,

    container_important: inputStyles.input_important,

    input: {
      ...transition.box,
      border: 0,
      background: 'transparent',
      color: 'inherit',
      display: 'block',
      resize: 'none',
      margin: 0,
      padding: unit,
      paddingRight: unit * 4.5, // Submit button
      width: '100%',

      // Keep font consistent between original and shadow
      letterSpacing: 'initial',
      '-webkit-text-size-adjust': 'none',

      '::placeholder': {
        color: 'inherit',
      },

      '::-ms-clear': {
        display: 'none',
      },
    },

    input_shadow: {
      color: color.core.neutral[3],
      position: 'absolute',
      top: 0,
      zIndex: 0,
    },

    input_original: {
      position: 'relative',
      zIndex: 1,
    },

    submitButton: {
      position: 'absolute',
      bottom: unit / 2 - ui.borderWidth,
      right: unit / 2,
      zIndex: 2,
    },
  };
};

export type InputProps = {
  disabled?: boolean;
  invalid?: boolean;
  onChange: ChangeHandler;
  onSubmit: SubmitHandler;
  privateNotePlaceholder?: string;
};

export default function Input({
  disabled,
  invalid,
  onChange,
  onSubmit,
  privateNotePlaceholder,
}: InputProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const context = useContext(ComposerContext);
  const { hotkeys } = useContext(HotkeyContext);
  const [styles, cx] = useStyles(styleSheet);
  const [focused, setFocused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const blocked = disabled || invalid || context.data.value.trim() === '';
  let placeholder = T.phrase('Send message…', null, { key: 'composer.labels.sendMessage' });

  if (context.mode === MODE_EMAIL) {
    placeholder = T.phrase('Send email…', null, { key: 'composer.labels.sendEmail' });
  } else if (context.mode === MODE_PRIVATE_NOTE) {
    placeholder =
      privateNotePlaceholder ??
      T.phrase('Private to Airbnb', null, { key: 'composer.labels.privateToAirbnb' });
  }

  // Form handlers
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

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

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      processHotkeys(hotkeys, event, context, context);
    },
    [hotkeys, context],
  );

  const handleSubmit = useCallback(() => {
    try {
      context.setMenu('');

      if (!blocked) {
        // Consumer `onSubmit` should always be last
        processSubmitHandlers([...context.submitHandlers, onSubmit], context.data, context);
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
          ref={ref}
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
