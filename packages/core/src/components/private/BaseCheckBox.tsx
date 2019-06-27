import React from 'react';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemove';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import FormInput, { InputProps } from './FormInput';
import buildInputStyles from '../../themes/buildInputStyles';

export type Props = InputProps & {
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

class BaseCheckBox extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    checked: false,
    indeterminate: false,
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.currentTarget.checked, event.currentTarget.value, event);
  };

  renderCheckBox = () => {
    const {
      cx,
      button,
      checked,
      children,
      disabled,
      hideLabel,
      id,
      invalid,
      indeterminate,
      styles,
      ...restProps
    } = this.props;

    return (
      <label htmlFor={id} className={cx(styles.checkbox, hideLabel && styles.checkbox_hideLabel)}>
        <FormInput
          {...restProps}
          checked={checked}
          disabled={disabled}
          id={id}
          invalid={invalid}
          onChange={this.handleChange}
          tagName="input"
          type="checkbox"
          hidden
          optional
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
  };

  render() {
    const {
      cx,
      button,
      checked,
      children,
      disabled,
      id,
      invalid,
      indeterminate,
      styles,
    } = this.props;

    if (!button) {
      return this.renderCheckBox();
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
        )}
      >
        {this.renderCheckBox()}

        <div className={cx(styles.children)}>{children}</div>
      </label>
    );
  }
}

export default withStyles(theme => {
  const styles = buildInputStyles(theme);

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
})(BaseCheckBox);
