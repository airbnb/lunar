import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import inputStyleSheet from '../../themes/inputStyleSheet';

export type IgnoreAttributes =
  | 'children'
  | 'dangerouslySetInnerHTML'
  | 'onChange'
  | 'value'
  // RDFa attributes
  | 'about'
  | 'datatype'
  | 'inlist'
  | 'prefix'
  | 'property'
  | 'resource'
  | 'typeof'
  | 'vocab'
  // Non-standard attributes
  | 'color'
  | 'css'
  | 'inputMode'
  | 'is'
  | 'radioGroup'
  | 'results'
  | 'security';

export type FormInputProps<T extends string = string, R = unknown> = {
  /** Mark the field as important. */
  important?: boolean;
  /** Mark the field as invalid. */
  invalid?: boolean;
  /** Increase font size and padding to large. */
  large?: boolean;
  /** Add "notranslate" className to prevent Google Chrome translation. */
  noTranslate?: boolean;
  /** Mark the field as optional. */
  optional?: boolean;
  /** Reference to access the underlying input DOM element. */
  propagateRef?: React.Ref<R>;
  /** Decrease font size and padding to small. */
  small?: boolean;
  /** Current value. */
  value?: T;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export type InputProps<T extends string = string> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  IgnoreAttributes
> &
  FormInputProps<T, HTMLInputElement>;

export type SelectProps<T extends string = string> = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  IgnoreAttributes
> &
  FormInputProps<T, HTMLSelectElement>;

export type TextAreaProps<T extends string = string> = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  IgnoreAttributes
> &
  FormInputProps<T, HTMLTextAreaElement>;

export type PrivateProps<T extends string> = FormInputProps<T> & {
  // Support everything for convenience
  [key: string]: unknown;
  /** @ignore */
  children?: React.ReactNode;
  /** @ignore */
  hasPrefix?: boolean;
  /** @ignore */
  hasSuffix?: boolean;
  /** @ignore */
  tagName: 'input' | 'select' | 'textarea';
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

function FormInput<T extends string = string>({
  children,
  disabled,
  hasPrefix,
  hasSuffix,
  hidden,
  id,
  important,
  invalid,
  large,
  noTranslate,
  optional,
  propagateRef,
  small,
  tagName: Tag,
  styleSheet,
  ...restProps
}: PrivateProps<T>) {
  const [styles, cx] = useStyles(styleSheet ?? inputStyleSheet);
  const isSelect = Tag === 'select';

  const props: { [key: string]: unknown } = {
    ...restProps,
    className: cx(
      styles.input,
      small && styles.input_small,
      large && styles.input_large,
      disabled && styles.input_disabled,
      hasPrefix && styles.input_hasPrefix,
      hasSuffix && styles.input_hasSuffix,
      hidden && styles.input_hidden,
      important && styles.input_important,
      invalid && styles.input_invalid,
      isSelect && styles.select,
      isSelect && small && styles.select_small,
      isSelect && large && styles.select_large,
    ),
    disabled,
    id,
    required: !optional,
  };

  // Only populate when invalid, otherwise it will break some CSS selectors
  if (invalid) {
    props['aria-invalid'] = true;
    props['aria-describedby'] = `${id}-error`;
  }

  // Cannot use chidren for input/textarea as they are void elements
  if (isSelect) {
    props.children = children;
  }

  // Add magical className to prevent Google Chrome translation
  if (noTranslate) {
    props.className += ' notranslate';
  }

  // @ts-ignore [ts] JSX element type 'Component' does not have any construct or call signatures. [2604]
  return <Tag {...props} ref={propagateRef} data-gramm="false" data-enable-grammarly="false" />;
}

const sizingProp = mutuallyExclusiveTrueProps('small', 'large');

FormInput.propTypes = {
  large: sizingProp,
  small: sizingProp,
};

// Proofreader crashes in non-latin languages unless this component is memoized
export default React.memo(FormInput);
