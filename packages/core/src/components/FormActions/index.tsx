import React from 'react';
import T from '../Translate';
import NormalButton from '../Button';
import DangerButton from '../DangerButton';
import MutedButton from '../MutedButton';
import ButtonGroup from '../ButtonGroup';

export type Props = {
  /** Text to display in the cancel button. Defaults to "Cancel". */
  cancelText?: React.ReactNode;
  /** Text to display in the continue/submit button. Defaults to "Submit". */
  continueText?: React.ReactNode;
  /** Render a danger button over a regular button. */
  danger?: boolean;
  /** Whether to disable the continue button. */
  disabled?: boolean;
  /** Hide the cancel button. */
  hideCancel?: boolean;
  /** Callback fired when the cancel button is clicked. */
  onCancel?: () => void;
  /** Callback fired when the continue button is clicked. */
  onContinue?: () => void;
  /** Whether the form is being processed. Will disable buttons.  */
  processing?: boolean;
  /** Text to display in the continue/submit button while processing. Defaults to "Submitting…". */
  processingText?: React.ReactNode;
  /** Text to display in the reset button. Defaults to "Reset". */
  resetText?: React.ReactNode;
  /** Show the reset button. */
  showReset?: boolean;
  /** Show small buttons. */
  small?: boolean;
};

/** A pair of action buttons to display at the bottom of a form. */
export default class FormActions extends React.PureComponent<Props> {
  static defaultProps = {
    cancelText: null,
    continueText: null,
    danger: false,
    disabled: false,
    hideCancel: false,
    processing: false,
    processingText: null,
    resetText: null,
    showReset: false,
    small: false,
  };

  render() {
    const {
      cancelText,
      continueText,
      danger,
      disabled,
      hideCancel,
      onCancel,
      onContinue,
      processing,
      processingText,
      resetText,
      showReset,
      small,
    } = this.props;
    const Button = danger ? DangerButton : NormalButton;

    return (
      <ButtonGroup>
        <Button
          type="submit"
          onClick={onContinue}
          disabled={disabled}
          loading={processing}
          small={small}
        >
          {processing
            ? processingText || (
                <T phrase="Saving" context="Button label when a form is submitting" />
              )
            : continueText || <T phrase="Save" context="Button label to submit a form" />}
        </Button>

        {!hideCancel && (
          <MutedButton inverted onClick={onCancel} small={small} disabled={processing}>
            {cancelText || <T phrase="Cancel" context="Button label to cancel a form action" />}
          </MutedButton>
        )}

        {showReset && (
          <MutedButton type="reset" inverted small={small} disabled={processing}>
            {resetText || <T phrase="Reset" context="Button label to reset a form" />}
          </MutedButton>
        )}
      </ButtonGroup>
    );
  }
}
