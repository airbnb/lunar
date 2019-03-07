import { Props as FormFieldProps } from '.';

export type MaybeChildren = { children?: any };

export type ExplicitProps = {
  value: string;
  compact: boolean;
  disabled: boolean;
  hasPrefix: boolean;
  hasSuffix: boolean;
  invalid: boolean;
  optional: boolean;
};

export default function partitionFieldProps<Props extends object = {}, Children = any, Field = any>(
  props: MaybeChildren & FormFieldProps & Props,
): {
  children: Children;
  field: Field;
  fieldProps: FormFieldProps;
  inputProps: Props & ExplicitProps;
} {
  const {
    children = null,
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
    // @ts-ignore Cant get this to type correctly
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
