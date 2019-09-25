import { Omit } from 'utility-types';
import { Props as FormFieldProps } from '.';

export type MaybeChildren = { children?: unknown };

export type ExplicitProps = {
  value: string;
  compact: boolean;
  disabled: boolean;
  hasPrefix: boolean;
  hasSuffix: boolean;
  invalid: boolean;
  optional: boolean;
};

export default function partitionFieldProps<Props extends MaybeChildren = {}>(
  props: FormFieldProps & Props,
): {
  // Need any for consumers to work correctly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  field: object;
  fieldProps: FormFieldProps;
  inputProps: Omit<Props, 'children'> & ExplicitProps;
} {
  const {
    children,
    compact = false,
    compactSpacing = false,
    disabled = false,
    errorMessage = '',
    field = {},
    hideLabel = false,
    hideOptionalLabel = false,
    inline = false,
    invalid = false,
    label,
    labelDescription = '',
    noSpacing = false,
    optional = false,
    prefix = null,
    suffix = null,
    ...inputProps
  } = props;

  return {
    children,
    field,
    fieldProps: {
      compact,
      compactSpacing,
      disabled,
      errorMessage,
      hideLabel,
      hideOptionalLabel,
      inline,
      invalid,
      label,
      labelDescription,
      noSpacing,
      optional,
      prefix,
      suffix,
    },
    // @ts-ignore Hard to type
    inputProps: {
      value: '',
      ...inputProps,
      compact,
      disabled,
      hasPrefix: !!prefix,
      hasSuffix: !!suffix,
      invalid,
      optional,
    },
  };
}
