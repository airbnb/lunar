import React from 'react';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemove';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
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
      <label htmlFor={id} {...css(styles.checkbox, hideLabel && styles.checkbox_hideLabel)}>
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
          {...css(
            styles.input,
            indeterminate && styles.input_indeterminate,
            checked && styles.input_checked,
            invalid && styles.input_invalid,
            disabled && styles.input_disabled,
          )}
        >
          {checked && (
            <span {...css(styles.checkmark)}>
              <IconCheck size="1.5em" decorative />
            </span>
          )}

          {indeterminate && (
            <span {...css(styles.indeterminate)}>
              <IconRemove size="1.5em" decorative />
            </span>
          )}
        </span>
      </label>
    );
  };

  render() {
    const { button, checked, children, disabled, id, invalid, indeterminate, styles } = this.props;

    if (!button) {
      return this.renderCheckBox();
    }

    return (
      <label
        htmlFor={id}
        {...css(
          styles.button,
          indeterminate && styles.input_indeterminate,
          checked && styles.button_checked,
          invalid && styles.button_invalid,
          disabled && styles.button_disabled,
        )}
      >
        {this.renderCheckBox()}

        <div {...css(styles.children)}>{children}</div>
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
      overflow: 'hidden',
      lineHeight: 0,
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
      // Checkmark
      textAlign: 'center',
      fontSize: 10,
      lineHeight: '15px',
      letterSpacing: 0,
      color: theme.color.base,
    },

    checkmark: {
      position: 'relative',
      top: -1,
      left: -1,
    },

    indeterminate: {
      position: 'relative',
      top: -0.5,
      left: -0.5,
    },

    children: {
      marginLeft: theme.unit,
    },
  };
})(BaseCheckBox);
