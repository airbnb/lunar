import React from 'react';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import FormInput, { InputProps } from './FormInput';
import buildInputStyles from '../../themes/buildInputStyles';

export type Props = InputProps & {
  /** Whether the switch is checked. */
  checked?: boolean;
  /** Unique identifier. */
  id: string;
  /** Callback fired when the value changes. */
  onChange: (checked: boolean, value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

class BaseSwitch extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    checked: false,
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.currentTarget.checked, event.currentTarget.value, event);
  };

  render() {
    const { cx, checked, disabled, id, invalid, styles, ...restProps } = this.props;

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
          onChange={this.handleChange}
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
}

export default withStyles(theme => {
  const { color, ui, unit } = theme;
  const styles = buildInputStyles(theme);
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
})(BaseSwitch);
