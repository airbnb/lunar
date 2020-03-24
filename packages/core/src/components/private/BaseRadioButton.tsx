import React from 'react';
import IconRecord from '@airbnb/lunar-icons/lib/interface/IconRecord';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemove';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import FormInput, { InputProps } from './FormInput';
import inputStyleSheet from '../../themes/inputStyleSheet';

export const styleSheetRadioButton: StyleSheet = (theme) => {
  const styles = inputStyleSheet(theme);

  return {
    ...styles,

    radio: {
      padding: 0,
      margin: '2px 0px',
      width: 18,
      height: 18,
      display: 'block',
      position: 'relative',
      lineHeight: 0,
      // Add focus styling to the radio icons
      '@selectors': {
        '> input:focus + span': {
          boxShadow: `0 0 3px 3px ${theme.color.core.primary[2]}`,
        },
      },
    },

    radio_hideLabel: {
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
      borderRadius: '50%',
      position: 'relative',
      // Bullet
      textAlign: 'center',
      fontSize: 8,
      lineHeight: '16px',
      letterSpacing: 0,
    },

    bullet: {
      position: 'absolute',
      top: 1.5,
      left: 1.5,
    },

    indeterminate: {
      position: 'absolute',
      top: 1,
      left: 0.5,
    },

    children: {
      marginLeft: theme.unit,
      width: '100%',
    },
  };
};

export type BaseRadioButtonProps<T extends string = string> = InputProps<T> & {
  /** Render the field as a large clickable button. */
  button?: boolean;
  /** Content to display when in button mode. Defaults to the current label bolded followed by the label description. */
  children?: React.ReactNode;
  /** Hide the native radio button label. */
  hideLabel?: boolean;
  /** Callback fired when the value changes. */
  onChange: (checked: boolean, value: T, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Mark the checkbox as greyed out with a dash to indicate an indeterminate state. */
  indeterminate?: boolean;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function BaseRadioButton<T extends string = string>({
  button,
  checked,
  children,
  small,
  disabled,
  hideLabel,
  id,
  invalid,
  indeterminate,
  onChange,
  styleSheet,
  ...restProps
}: BaseRadioButtonProps<T>) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetRadioButton);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.checked, event.currentTarget.value as T, event);
  };

  const radioButton = (
    <label htmlFor={id} className={cx(styles.radio, hideLabel && styles.radio_hideLabel)}>
      <FormInput
        {...restProps}
        hidden
        optional
        checked={checked}
        disabled={disabled}
        id={id}
        invalid={invalid}
        tagName="input"
        type="radio"
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
          <span className={cx(styles.bullet)}>
            <IconRecord decorative size="1.35em" />
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
    return radioButton;
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
        small && styles.button_small,
      )}
    >
      {radioButton}

      <div className={cx(styles.children)}>{children}</div>
    </label>
  );
}
