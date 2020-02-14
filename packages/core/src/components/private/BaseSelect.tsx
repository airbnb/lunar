import React from 'react';
import IconCaretDown from '@airbnb/lunar-icons/lib/interface/IconCaretDown';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import FormInput, { SelectProps } from './FormInput';

const styleSheet: StyleSheet = ({ pattern, unit }) => ({
  select: {
    position: 'relative',
    display: 'block',
    width: '100%',
  },

  arrow: {
    position: 'absolute',
    right: unit / 2,
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

  arrow_small: {
    right: unit * 0.25,
  },

  arrow_large: {
    right: unit,
  },
});

export type BaseSelectProps = SelectProps & {
  /** List of `option`s to render. */
  children: NonNullable<React.ReactNode>;
  /** An empty `option` to render at the top of the list. */
  placeholder?: string;
  /** Callback fired when the value changes. */
  onChange: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function BaseSelect({
  children,
  placeholder = '',
  onChange,
  ...restProps
}: BaseSelectProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheet);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value, event);
  };

  return (
    <div className={cx(styles.select)}>
      <FormInput {...restProps} tagName="select" onChange={handleChange}>
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
          restProps.small && styles.arrow_small,
          restProps.large && styles.arrow_large,
        )}
      >
        <IconCaretDown decorative size="2em" />
      </span>
    </div>
  );
}
