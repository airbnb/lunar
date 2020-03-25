import React from 'react';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import FormInput, { InputProps } from './FormInput';
import inputStyleSheet from '../../themes/inputStyleSheet';

export const styleSheetSwitch: StyleSheet = (theme) => {
  const { color, ui, unit } = theme;
  const styles = inputStyleSheet(theme);
  const width = unit * 5;
  const height = unit * 3;

  return {
    ...styles,

    switch: {
      padding: 0,
      margin: 0,
      width,
      height,
      display: 'inline-block',
      position: 'relative',
      overflow: 'hidden',
      lineHeight: 0,
    },

    toggle: {
      position: 'relative',
      display: 'inline-block',
      background: color.accent.bg,
      borderRadius: '50%',
      textAlign: 'center',
      fontSize: 10,
      lineHeight: '22px',
      verticalAlign: 'top',
      left: 0,
      transition: `left ${ui.transitionTime}, transform ${ui.transitionTime}`,
      // Subtract border
      width: height - 4,
      height: height - 4,
    },

    toggle_checked: {
      left: '100%',
      transform: 'translateX(-100%)',
    },

    input: {
      ...styles.input,
      width,
      height,
      padding: 0,
      display: 'inline-block',
      cursor: 'pointer',
      backgroundColor: styles.input.borderColor,
      borderRadius: height,
      position: 'relative',
    },

    input_checked: {
      ...styles.input_checked,
      color: styles.input_checked.borderColor,
    },

    input_invalid: {
      ...styles.input_invalid,
      backgroundColor: styles.input_invalid.borderColor,
    },

    input_disabled: {
      ...styles.input_disabled,
      backgroundColor: styles.input_disabled.borderColor,
    },

    checkmark: {
      position: 'absolute',
      top: 2.5,
      left: 2.5,
    },
  };
};

export type BaseSwitchProps<T extends string = string> = InputProps<T> & {
  /** Whether the switch is checked. */
  checked?: boolean;
  /** Unique identifier. */
  id: string;
  /** Callback fired when the value changes. */
  onChange: (checked: boolean, value: T, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function BaseSwitch<T extends string = string>({
  checked,
  disabled,
  id,
  invalid,
  onChange,
  styleSheet,
  ...restProps
}: BaseSwitchProps<T>) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetSwitch);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked, event.currentTarget.value as T, event);
  };

  return (
    <label htmlFor={id} className={cx(styles.switch)}>
      <FormInput
        {...restProps}
        hidden
        optional
        checked={checked}
        disabled={disabled}
        id={id}
        invalid={invalid}
        tagName="input"
        type="checkbox"
        onChange={handleChange}
      />

      <span
        className={cx(
          styles.input,
          checked && styles.input_checked,
          invalid && styles.input_invalid,
          disabled && styles.input_disabled,
        )}
      >
        <span className={cx(styles.toggle, checked && styles.toggle_checked)}>
          {checked && (
            <span className={cx(styles.checkmark)}>
              <IconCheck decorative size="1.5em" />
            </span>
          )}
        </span>
      </span>
    </label>
  );
}
