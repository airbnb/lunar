import React from 'react';
import useStyles from '../../hooks/useStyles';
import T from '../Translate';
import Text from '../Text';
import StatusText from '../StatusText';
import FormErrorMessage from '../FormErrorMessage';
import partitionFieldProps from './partitionFieldProps';
import Prefix from './Prefix';
import Suffix from './Suffix';
import { styleSheet } from './styles';

export type FormFieldProps = {
  /** @ignore Decrease bottom margin of the field. (Internal use only) */
  compactSpacing?: boolean;
  /** Mark the field as disabled. */
  disabled?: boolean;
  /** Error message to display under the input when invalid. */
  errorMessage?: string;
  /** @ignore Passed from final form. */
  field?: object;
  /** Visually hide the label. */
  hideLabel?: boolean;
  /** @ignore Hide optional label. (Internal use only) */
  hideOptionalLabel?: boolean;
  /** Render the input and label inline to each other. */
  inline?: boolean;
  /** Mark the field as invalid. */
  invalid?: boolean;
  /** Descriptive label that appears above the input. */
  label: NonNullable<React.ReactNode>;
  /** Small description to display under the label. */
  labelDescription?: React.ReactNode;
  /** Increase label font size and spacing. */
  large?: boolean;
  /** Remove bottom margin from field. */
  noSpacing?: boolean;
  /** Mark the field as optional. */
  optional?: boolean;
  /** Content to display before the input field. */
  prefix?: React.ReactNode;
  /** Decrease label font size and spacing. */
  small?: boolean;
  /** Content to display after the input field. */
  suffix?: React.ReactNode;
};

export type PrivateProps = FormFieldProps & {
  /** Input field to wrap. */
  children: NonNullable<React.ReactNode>;
  /** Unique ID of the field. */
  id: string;
  /** @ignore Render the input field before the label. */
  renderBeforeLabel?: boolean;
  /** @ignore Render the input field as 100% width. */
  renderFullWidth?: boolean;
  /** @ignore Render the labels with large text. Should only be used for nested components, like through controllers. */
  renderLargeLabel?: boolean;
  /** @ignore Stretches the label to 100%. */
  stretchLabel?: boolean;
  /** @ignore Top align content. */
  topAlign?: boolean;
};

export { partitionFieldProps, Prefix, Suffix };

/** A abstract form field wrapper that handles labels, affixes, errors, states, and more. */
export default function FormField({
  children,
  compactSpacing,
  disabled,
  errorMessage,
  hideLabel,
  hideOptionalLabel,
  id,
  inline,
  invalid,
  label,
  labelDescription,
  large,
  noSpacing,
  optional,
  renderBeforeLabel,
  renderFullWidth,
  renderLargeLabel,
  stretchLabel,
  prefix,
  small,
  suffix,
  topAlign,
}: PrivateProps) {
  const [styles, cx] = useStyles(styleSheet);

  const content = (
    <div
      className={cx(
        styles.input,
        inline && renderBeforeLabel && styles.input_beforeInline,
        inline && !renderBeforeLabel && styles.input_afterInline,
        hideLabel && styles.input_hideLabel,
        renderFullWidth && styles.input_fullWidth,
      )}
    >
      {prefix && <div className={cx(styles.affix)}>{prefix}</div>}

      <div className={cx(styles.anchor)}>{children}</div>

      {suffix && <div className={cx(styles.affix)}>{suffix}</div>}
    </div>
  );

  return (
    <section
      className={cx(
        styles.field,
        (compactSpacing || small) && !noSpacing && styles.field_compactSpacing,
        noSpacing && styles.field_noSpacing,
      )}
    >
      <div className={cx(inline && styles.content_inline, topAlign && styles.content_topAlign)}>
        {renderBeforeLabel && content}

        <label
          htmlFor={id}
          className={cx(
            styles.label,
            stretchLabel && styles.label_stretch,
            hideLabel && styles.label_hidden,
            (inline || renderBeforeLabel) && styles.label_noSpacing,
          )}
        >
          <StatusText
            danger={invalid}
            muted={disabled}
            small={small}
            large={large}
            bold={!renderLargeLabel}
          >
            {label}

            {optional && !hideOptionalLabel && (
              <span className={cx(styles.optional)}>
                <Text inline small muted>
                  <T k="lunar.form.optional" phrase="(optional)" />
                </Text>
              </span>
            )}
          </StatusText>

          {labelDescription && <Text small>{labelDescription}</Text>}
        </label>

        {!renderBeforeLabel && content}
      </div>

      {invalid && <FormErrorMessage id={id} error={errorMessage} />}
    </section>
  );
}
