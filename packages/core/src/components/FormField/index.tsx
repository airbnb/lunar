import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import T from '../Translate';
import Text from '../Text';
import StatusText from '../StatusText';
import FormErrorMessage from '../FormErrorMessage';
import partitionFieldProps from './partitionFieldProps';
import Prefix from './Prefix';
import Suffix from './Suffix';

export type Props = {
  /** Decrease label font size and spacing. */
  compact?: boolean;
  /** @ignore Decrease bottom margin of the field. (Internal use only) */
  compactSpacing?: boolean;
  /** Mark the field as disabled. */
  disabled?: boolean;
  /** Error message to display under the input when invalid. */
  errorMessage?: string;
  /** @ignore Passed from final form. */
  field?: any;
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
  /** Remove bottom margin from field. */
  noSpacing?: boolean;
  /** Mark the field as optional. */
  optional?: boolean;
  /** Content to display before the input field. */
  prefix?: React.ReactNode;
  /** Content to display after the input field. */
  suffix?: React.ReactNode;
};

export type PrivateProps = Props &
  WithStylesProps & {
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
export class FormField extends React.Component<PrivateProps> {
  static defaultProps = {
    compact: false,
    compactSpacing: false,
    disabled: false,
    errorMessage: '',
    hideLabel: false,
    hideOptionalLabel: false,
    inline: false,
    invalid: false,
    labelDescription: null,
    noSpacing: false,
    optional: false,
    prefix: null,
    renderBeforeLabel: false,
    renderFullWidth: false,
    renderLargeLabel: false,
    stretchLabel: false,
    suffix: null,
    topAlign: false,
  };

  render() {
    const {
      cx,
      children,
      compact,
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
      noSpacing,
      optional,
      renderBeforeLabel,
      renderFullWidth,
      renderLargeLabel,
      stretchLabel,
      styles,
      prefix,
      suffix,
      topAlign,
    } = this.props;

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
          (compact || compactSpacing) && !noSpacing && styles.field_compactSpacing,
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
            <StatusText danger={invalid} muted={disabled} small={compact} bold={!renderLargeLabel}>
              {label}

              {optional && !hideOptionalLabel && (
                <span className={cx(styles.optional)}>
                  <Text inline small muted>
                    <T
                      k="lunar.form.optional"
                      phrase="(optional)"
                      context="A form field is marked as optional"
                    />
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
}

export default withStyles(({ unit }) => ({
  field: {
    marginBottom: unit * 3,

    '@selectors': {
      ':last-child, :only-child': {
        marginBottom: 0,
      },
    },
  },

  field_compactSpacing: {
    marginBottom: unit * 2,
  },

  field_noSpacing: {
    margin: 0,
  },

  content_inline: {
    display: 'flex',
    alignItems: 'center',
  },

  content_topAlign: {
    alignItems: 'flext-start',
  },

  label: {
    margin: 0,
    marginBottom: unit,
    display: 'block',
    flexGrow: 0,
  },

  label_stretch: {
    flexBasis: '100%',
  },

  label_hidden: {
    display: 'none',
  },

  label_noSpacing: {
    margin: 0,
  },

  optional: {
    marginLeft: unit,
    display: 'inline-block',
  },

  input: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
  },

  input_fullWidth: {
    width: '100%',
  },

  input_beforeInline: {
    marginRight: unit,
  },

  input_afterInline: {
    marginLeft: unit,
  },

  input_hideLabel: {
    margin: 0,
  },

  affix: {
    flexGrow: 0,
  },

  anchor: {
    flexGrow: 1,
  },
}))(FormField);
