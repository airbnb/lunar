import { FormFieldProps } from '.';

export type MaybeChildren = { children?: unknown };

export type ExplicitProps = {
  compact: boolean;
  disabled: boolean;
  hasPrefix: boolean;
  hasSuffix: boolean;
  invalid: boolean;
  large: boolean;
  optional: boolean;
  small: boolean;
  value: string;
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
    large = false,
    noSpacing = false,
    optional = false,
    prefix = null,
    small = false,
    suffix = null,
    ...inputProps
  } = props;

  return {
    children,
    field,
    fieldProps: {
      compactSpacing,
      disabled,
      errorMessage,
      hideLabel,
      hideOptionalLabel,
      inline,
      invalid,
      label,
      labelDescription,
      large,
      noSpacing,
      optional,
      prefix,
      small,
      suffix,
    },
    // @ts-ignore Hard to type
    inputProps: {
      value: '',
      ...inputProps,
      disabled,
      hasPrefix: !!prefix,
      hasSuffix: !!suffix,
      invalid,
      large,
      optional,
      small,
    },
  };
}
