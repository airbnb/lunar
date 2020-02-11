import React from 'react';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemove';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import FormInput, { InputProps } from './FormInput';
import inputStyleSheet from '../../themes/inputStyleSheet';

const styleSheet: StyleSheet = theme => {
  const styles = inputStyleSheet(theme);

  return {
    ...styles,

    checkbox: {
      padding: 0,
      margin: 0,
      marginTop: 2,
      width: 18,
      height: 18,
      display: 'block',
      lineHeight: 0,
      // Add focus styling to the checkbox icons
      '@selectors': {
        '> input:focus + span': {
          boxShadow: `0 0 3px 3px ${theme.color.core.primary[2]}`,
        },
      },
    },

    checkbox_hideLabel: {
      display: 'block',
      marginTop: 0,
    },

    input: {
      ...styles.input,
      width: 18,
      height: 18,
      padding: 0,
      display: 'inline-block',
      cursor: 'pointer',
      position: 'relative',
      // Checkmark
      textAlign: 'center',
      fontSize: 10,
      lineHeight: '15px',
      letterSpacing: 0,
      color: theme.color.base,
    },

    checkmark: {
      position: 'absolute',
      top: -1.5,
      left: -1.5,
    },

    indeterminate: {
      position: 'absolute',
      top: -1,
      left: -1,
    },

    children: {
      marginLeft: theme.unit,
    },
  };
};

export type BaseCheckBoxProps = InputProps & {
  /** Render the field as a large clickable button. */
  button?: boolean;
  /** Content to display when in button mode. Defaults to the current label bolded followed by the label description. */
  children?: React.ReactNode;
  /** Hide the native checkbox label. */
  hideLabel?: boolean;
  /** Callback fired when the value changes. */
  onChange: (checked: boolean, value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Mark the checkbox as greyed out with a dash to indicate an indeterminate state. */
  indeterminate?: boolean;
};

export default function BaseCheckBox({
  button,
  checked,
  children,
  compact,
  disabled,
  hideLabel,
  id,
  invalid,
  indeterminate,
  onChange,
  ...restProps
}: BaseCheckBoxProps) {
  const [styles, cx] = useStyles(styleSheet);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked, event.currentTarget.value, event);
  };

  const checkbox = (
    <label htmlFor={id} className={cx(styles.checkbox, hideLabel && styles.checkbox_hideLabel)}>
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
          indeterminate && styles.input_indeterminate,
          checked && styles.input_checked,
          invalid && styles.input_invalid,
          disabled && styles.input_disabled,
        )}
      >
        {checked && (
          <span className={cx(styles.checkmark)}>
            <IconCheck decorative size="1.65em" />
          </span>
        )}

        {indeterminate && (
          <span className={cx(styles.indeterminate)}>
            <IconRemove decorative size="1.65em" />
          </span>
        )}
      </span>
    </label>
  );

  if (!button) {
    return checkbox;
  }

  return (
    <label
      htmlFor={id}
      className={cx(
        styles.button,
        indeterminate && styles.input_indeterminate,
        checked && styles.button_checked,
        invalid && styles.button_invalid,
        disabled && styles.button_disabled,
        compact && styles.button_compact,
      )}
    >
      {checkbox}

      <div className={cx(styles.children)}>{children}</div>
    </label>
  );
}
