import React from 'react';
import IconCaretDown from '@airbnb/lunar-icons/lib/interface/IconCaretDown';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import FormInput, { SelectProps } from './FormInput';

export type Props = SelectProps & {
  /** List of `option`s to render. */
  children: NonNullable<React.ReactNode>;
  /** An empty `option` to render at the top of the list. */
  placeholder?: string;
  /** Callback fired when the value changes. */
  onChange: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
};

class BaseSelect extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    placeholder: '',
  };

  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(event.currentTarget.value, event);
  };

  render() {
    const { cx, children, placeholder, styles, ...restProps } = this.props;

    return (
      <div className={cx(styles.select)}>
        <FormInput {...restProps} tagName="select" onChange={this.handleChange}>
          {placeholder && (
            <option disabled value="">
              {placeholder}
            </option>
          )}

          {children}
        </FormInput>

        <span
          className={cx(
            styles.arrow,
            restProps.disabled && styles.arrow_disabled,
            restProps.invalid && styles.arrow_invalid,
            restProps.compact && styles.arrow_compact,
          )}
        >
          <IconCaretDown decorative size="2em" />
        </span>
      </div>
    );
  }
}

export default withStyles(({ pattern, unit }) => ({
  select: {
    position: 'relative',
    display: 'block',
    width: '100%',
  },

  arrow: {
    position: 'absolute',
    right: unit,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    zIndex: 1,
  },

  arrow_disabled: {
    ...pattern.disabled,
  },

  arrow_invalid: {
    ...pattern.invalid,
  },

  arrow_compact: {
    right: unit * 0.75,
  },
}))(BaseSelect);
