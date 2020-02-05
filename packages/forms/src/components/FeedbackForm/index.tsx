import React from 'react';
import { FormState } from 'final-form';
import T from '@airbnb/lunar/lib/components/Translate';
import FormActions from '@airbnb/lunar/lib/components/FormActions';
import Form from '../Form';
import TextArea from '../Form/TextArea';
import Select from '../Form/Select';
import RadioButtonController from '../Form/RadioButtonController';

export type Data = {
  category: string;
  feedback: string;
  type: string;
};

export type Props = {
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
  onSubmit: (data: Data, props: Props) => Promise<unknown>;
  /** The team ID within JIRA. */
  teamID: number;
};

export type State = {
  data: Data;
  loading: boolean;
};

/** A form for providing feedback or reporting bugs. */
export default class FeedbackForm extends React.PureComponent<Props, State> {
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
      throw new Error(
        T.phrase(
          'This field is required.',
          {},
          {
            context: 'Generic error when a form field is required',
            key: 'lunar.form.fieldRequired',
          },
        ),
      );
    }
  }

  private handleSubmit = (data: Data) => {
    this.setState({
      loading: true,
    });

    return Promise.resolve(this.props.onSubmit(data, this.props)).finally(() => {
      this.setState({
        loading: false,
      });
    });
  };

  private handleStateUpdate = (state: FormState<Data>) => {
    this.setState({
      data: state.values as Data,
    });
  };

  render() {
    const { categories, disableBugReporting, onCancel, onContinue } = this.props;
    const { data, loading } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} onStateUpdate={this.handleStateUpdate}>
        {!disableBugReporting && (
          <RadioButtonController
            name="type"
            label={
              <T
                k="lunar.form.feedback.typeMessage"
                phrase="What kind of feedback are you giving?"
                context="Feedback form"
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
                  label={
                    <T
                      k="lunar.form.feedback.reportBug"
                      phrase="Report a bug"
                      context="Feedback form type option"
                    />
                  }
                />

                <RadioButton
                  noSpacing
                  value="feedback"
                  label={
                    <T
                      k="lunar.form.feedback.giveFeedback"
                      phrase="Give product feedback"
                      context="Feedback form type option"
                    />
                  }
                />
              </div>
            )}
          </RadioButtonController>
        )}

        <Select
          name="category"
          label={
            <T
              k="lunar.form.feedback.featureMessage"
              phrase="Which feature is this about?"
              context="Feedback form"
            />
          }
          placeholder={T.phrase(
            'Select a feature',
            {},
            {
              context: 'Selecting a feature within the feedback form',
              key: 'lunar.form.feedback.selectFeature',
            },
          )}
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
          label={
            <T
              k="lunar.form.feedback.moreMessage"
              phrase="Tell us a little bit more"
              context="Feedback form"
            />
          }
          placeholder={
            data.type === 'bug'
              ? T.phrase(
                  'What happened? Sharing steps to reproduce the problem you experienced can be helpful.',
                  {},
                  {
                    context:
                      'Default description in the feedback form when submitting a bug report',
                    key: 'lunar.form.feedback.moreBug',
                  },
                )
              : T.phrase(
                  'Share your experience with us. What went well? What could have gone better?',
                  {},
                  {
                    context:
                      'Default description in the feedback form when submitting general feedback',
                    key: 'lunar.form.feedback.moreFeedback',
                  },
                )
          }
          validator={this.validate}
        />

        <FormActions
          continueText={
            <T
              k="lunar.form.feedback.send"
              phrase="Send Feedback"
              context="Feedback form submit button label"
            />
          }
          processingText={
            <T
              k="lunar.form.feedback.sending"
              phrase="Sending…"
              context="Feedback form submit button label"
            />
          }
          processing={loading}
          onCancel={onCancel}
          onContinue={onContinue}
        />
      </Form>
    );
  }
}
