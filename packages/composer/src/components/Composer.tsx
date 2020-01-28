import React, { useCallback, useState, useReducer } from 'react';
import useStyles from '@airbnb/lunar/lib/hooks/useStyles';
import FormErrorMessage from '@airbnb/lunar/lib/components/FormErrorMessage';
import ComposerContext from '../contexts/ComposerContext';
import Footer from './Footer';
import Input, { InputProps } from './Input';
import {
  onChangeHideMenusWhenEmpty,
  onChangeResetError,
  onChangeSyncValue,
  onChangeResetShadowIfMismatch,
} from '../helpers/handlers';
import { isShortcutCommand } from '../helpers/shortcuts';
import HotkeyManager from './HotkeyManager';
import { MENU_SHORTCUTS, MODE_MESSAGE } from '../constants';
import { ChangeHandler, SubmitHandler, WritingMode, Context, DataSet, DataValue } from '../types';
import { composerStyleSheet } from '../styles';

export type ComposerProps = {
  /** Button to display after the input field. */
  afterButton?: React.ReactNode;
  /** Button to display before the input field. */
  beforeButton?: React.ReactNode;
  /** Features to enable for the composer. */
  children?: React.ReactNode;
  /** Default value in specific input fields. */
  defaultValues?: Partial<DataSet>;
  /** Whether the input field is disabled or not. */
  disabled?: boolean;
  /** Placeholder for the email writing mode. */
  emailPlaceholder?: string;
  /** Placeholder for the message writing mode. */
  messagePlaceholder?: string;
  /** Gain a reference to the underlying `textarea`. */
  propagateRef?: InputProps['propagateRef'];
  /** Callback fired when the input value changes. */
  onChange?: ChangeHandler;
  /** Callback fired when the input is submitted. */
  onSubmit?: SubmitHandler;
  /** Placeholder for the private note writing mode. */
  privateNotePlaceholder?: string;
  /** Default writing mode. */
  writingMode?: WritingMode;
};

function reducer(
  state: DataSet,
  {
    name,
    value,
  }: {
    name: string;
    value: DataValue | ((prevValue: DataValue) => DataValue);
  },
) {
  return {
    ...state,
    [name]: typeof value === 'function' ? value(state[name] ?? '') : value,
  };
}

export default function Composer({
  afterButton,
  beforeButton,
  children,
  defaultValues = {},
  disabled = false,
  onChange,
  onSubmit,
  emailPlaceholder,
  messagePlaceholder,
  privateNotePlaceholder,
  propagateRef,
  writingMode,
}: ComposerProps) {
  const [styles, cx] = useStyles(composerStyleSheet);
  const [menu, setMenu] = useState(isShortcutCommand(defaultValues.value) ? MENU_SHORTCUTS : '');
  const [mode, setMode] = useState<WritingMode>(writingMode ?? MODE_MESSAGE);
  const [error, setError] = useState('');
  const [data, setData] = useReducer(reducer, {
    shadowValue: '',
    value: '',
    ...defaultValues,
  });

  // Not using state on purpose
  const flags = {
    afterButton: Boolean(afterButton),
    beforeButton: Boolean(beforeButton),
  };
  const invalid = error !== '';

  // Handlers
  const [changeHandlers, handleChange] = useReducer(
    (state: Set<ChangeHandler>, handler: ChangeHandler) => {
      state.add(handler);
      return state;
    },
    new Set<ChangeHandler>([
      onChangeSyncValue,
      onChangeResetError,
      onChangeResetShadowIfMismatch,
      onChangeHideMenusWhenEmpty,
    ]),
  );

  const [submitHandlers, handleSubmit] = useReducer(
    (state: Set<SubmitHandler>, handler: SubmitHandler) => {
      state.add(handler);
      return state;
    },
    new Set<SubmitHandler>(),
  );

  const handleSetData = useCallback<Context['setData']>(
    (name, value) => {
      setData({ name, value });
    },
    [setData],
  );

  const handleSetMenu = useCallback<Context['setMenu']>(
    nextMenu => {
      setMenu(nextMenu);

      // Always focus the input when a menu is opened.
      // We need to focus so that hotkeys can be triggered.
      setTimeout(() => {
        const composer = document.getElementById('composer');

        if (composer && document.activeElement !== composer) {
          composer.focus();
        }
      }, 0);
    },
    [setMenu],
  );

  return (
    <ComposerContext.Provider
      value={{
        changeHandlers,
        data,
        flags,
        menu,
        mode,
        onChange: handleChange,
        onSubmit: handleSubmit,
        setData: handleSetData,
        setError,
        setMenu: handleSetMenu,
        setMode,
        submitHandlers,
      }}
    >
      <HotkeyManager>
        <div className={cx(styles.composer)}>
          <div className={cx(styles.field)}>
            {beforeButton && <div className={cx(styles.affix)}>{beforeButton}</div>}

            <div className={cx(styles.input)}>
              <Input
                disabled={disabled}
                invalid={invalid}
                emailPlaceholder={emailPlaceholder}
                messagePlaceholder={messagePlaceholder}
                privateNotePlaceholder={privateNotePlaceholder}
                propagateRef={propagateRef}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            </div>

            {afterButton && <div className={cx(styles.affix)}>{afterButton}</div>}
          </div>

          <div
            className={cx(
              styles.footer,
              flags.beforeButton && styles.footer_before,
              flags.afterButton && styles.footer_after,
            )}
          >
            {invalid ? <FormErrorMessage id="composer" error={error} /> : <Footer />}
            {children}
          </div>
        </div>
      </HotkeyManager>
    </ComposerContext.Provider>
  );
}
