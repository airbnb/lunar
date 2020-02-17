import React from 'react';
import { FormState } from 'final-form';
import T from '@airbnb/lunar/lib/components/Translate';
import FormActions from '@airbnb/lunar/lib/components/FormActions';
import Form from '../Form';
import TextArea from '../Form/TextArea';
import Select from '../Form/Select';
import RadioButtonController from '../Form/RadioButtonController';

export type FeedbackFormData = {
  category: string;
  feedback: string;
  type: string;
};

export type FeedbackFormProps = {
  /** Mapping of unique keys to localized category/feature names. */
  categories: { [key: string]: string };
  /** The name of the feedback channel. */
  channel: string;
  /** The channel ID created through the feedback form. */
  channelID: number;
  /** Optionally disable bug reporting, and only allow product feedback to be given. */
  disableBugReporting?: boolean;
  /** Callback fired when the cancel button is clicked. */
  onCancel?: () => void;
  /** Callback fired when the continue button is clicked. */
  onContinue?: () => void;
  /** Callback fired when the form has been submitted. */
  onSubmit: (data: FeedbackFormData, props: FeedbackFormProps) => Promise<unknown>;
  /** The team ID within JIRA. */
  teamID: number;
};

export type FeedbackFormState = {
  data: FeedbackFormData;
  loading: boolean;
};

/** A form for providing feedback or reporting bugs. */
export default class FeedbackForm extends React.PureComponent<
  FeedbackFormProps,
  FeedbackFormState
> {
  state = {
    data: {
      category: '',
      feedback: '',
      type: 'feedback',
    },
    loading: false,
  };

  validate(value: string) {
    if (!value) {
      throw new Error(T.phrase('lunar.form.fieldRequired', 'This field is required.'));
    }
  }

  private handleSubmit = (data: FeedbackFormData) => {
    this.setState({
      loading: true,
    });

    return Promise.resolve(this.props.onSubmit(data, this.props)).finally(() => {
      this.setState({
        loading: false,
      });
    });
  };

  private handleStateUpdate = (state: FormState<FeedbackFormData>) => {
    this.setState({
      data: state.values as FeedbackFormData,
    });
  };

  render() {
    const { categories, disableBugReporting, onCancel, onContinue } = this.props;
    const { data, loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} onStateUpdate={this.handleStateUpdate}>
        {!disableBugReporting && (
          <RadioButtonController<'bug' | 'feedback'>
            name="type"
            label={
              <T
                k="lunar.form.feedback.typeMessage"
                phrase="What kind of feedback are you giving?"
              />
            }
            defaultValue="bug"
            validator={this.validate}
          >
            {RadioButton => (
              <div>
                <RadioButton
                  noSpacing
                  value="bug"
                  label={<T k="lunar.form.feedback.reportBug" phrase="Report a bug" />}
                />

                <RadioButton
                  noSpacing
                  value="feedback"
                  label={<T k="lunar.form.feedback.giveFeedback" phrase="Give product feedback" />}
                />
              </div>
            )}
          </RadioButtonController>
        )}

        <Select
          name="category"
          label={<T k="lunar.form.feedback.featureMessage" phrase="Which feature is this about?" />}
          placeholder={T.phrase('lunar.form.feedback.selectFeature', 'Select a feature')}
          validator={this.validate}
        >
          {Object.entries(categories).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>

        <TextArea
          name="feedback"
          label={<T k="lunar.form.feedback.moreMessage" phrase="Tell us a little bit more" />}
          placeholder={
            data.type === 'bug'
              ? T.phrase(
                  'lunar.form.feedback.moreBug',
                  'What happened? Sharing steps to reproduce the problem you experienced can be helpful.',
                )
              : T.phrase(
                  'lunar.form.feedback.moreFeedback',
                  'Share your experience with us. What went well? What could have gone better?',
                )
          }
          validator={this.validate}
        />

        <FormActions
          continueText={<T k="lunar.form.feedback.send" phrase="Send Feedback" />}
          processingText={<T k="lunar.form.feedback.sending" phrase="Sending…" />}
          processing={loading}
          onCancel={onCancel}
          onContinue={onContinue}
        />
      </Form>
    );
  }
}
