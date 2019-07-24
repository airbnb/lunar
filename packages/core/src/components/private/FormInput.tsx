import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import { Omit } from 'utility-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import buildInputStyles from '../../themes/buildInputStyles';

const sizingProp = mutuallyExclusiveTrueProps('small', 'compact', 'large');

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
  | 'inputMode'
  | 'is'
  | 'radioGroup'
  | 'color'
  | 'results'
  | 'security';

export type Props<T = any> = {
  /** @deprecated decrease font size and padding to small. */
  compact?: boolean;
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
  propagateRef?: React.Ref<T>;
  /** Decrease font size and padding to small. */
  small?: boolean;
  /** Current value. */
  value?: string;
};

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, IgnoreAttributes> &
  Props<HTMLInputElement>;

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, IgnoreAttributes> &
  Props<HTMLSelectElement>;

export type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  IgnoreAttributes
> &
  Props<HTMLTextAreaElement>;

export type PrivateProps = Props &
  WithStylesProps & {
    // Support everything for convenience
    [key: string]: any;
    /** @ignore */
    children?: React.ReactNode;
    /** @ignore */
    hasPrefix?: boolean;
    /** @ignore */
    hasSuffix?: boolean;
    /** @ignore */
    tagName: 'input' | 'select' | 'textarea';
  };

class FormInput extends React.Component<PrivateProps> {
  static propTypes = {
    compact: sizingProp,
    large: sizingProp,
    small: sizingProp,
  };

  static defaultProps = {
    children: null,
    compact: false,
    disabled: false,
    hasPrefix: false,
    hasSuffix: false,
    hidden: false,
    important: false,
    invalid: false,
    large: false,
    noTranslate: false,
    optional: false,
    small: false,
    value: '',
  };

  render() {
    const {
      cx,
      children,
      compact,
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
      styles,
      tagName: Tag,
      ...restProps
    } = this.props;
    const isSelect = Tag === 'select';
    const props: any = {
      ...restProps,
      className: cx(
        styles.input,
        (compact || small) && styles.input_compact,
        disabled && styles.input_disabled,
        hasPrefix && styles.input_hasPrefix,
        hasSuffix && styles.input_hasSuffix,
        hidden && styles.input_hidden,
        important && styles.input_important,
        invalid && styles.input_invalid,
        isSelect && styles.select,
        isSelect && compact && styles.select_compact,
        large && styles.input_large,
      ),
      disabled,
      id,
      required: !optional,
    };

    if (__DEV__) {
      if (compact) {
        console.log('Input: `compact` prop is deprecated, please use `small` instead.');
      }
    }

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
}

export default withStyles(buildInputStyles)(FormInput);
