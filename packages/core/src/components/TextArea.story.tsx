import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Prefix from './FormField/Prefix';
import TextArea from './TextArea';

function onCheckText() {
  return Promise.resolve({
    proofread: {
      matches: [
        {
          message: '',
          short_message: 'Uncapitalized',
          offset: 59,
          length: 2,
          replacements: ['Or'],
          rule_id: 'UPPERCASE_SENTENCE_START',
        },
        {
          message: '',
          short_message: 'Incorrect word',
          offset: 76,
          length: 3,
          replacements: ['to'],
          rule_id: 'TOO_TO',
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 84,
          length: 2,
          replacements: ['a'],
          rule_id: 'EN_A_VS_AN',
        },
        {
          message: '',
          short_message: 'Double words',
          offset: 91,
          length: 5,
          replacements: ['of'],
          rule_id: 'ENGLISH_WORD_REPEAT_RULE',
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 126,
          length: 6,
          replacements: ['detect'],
          rule_id: 'MORFOLOGIK_RULE_EN_US',
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 146,
          length: 6,
          replacements: ['think'],
          rule_id: 'NON3PRS_VERB',
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 181,
          length: 3,
          replacements: ['note'],
          rule_id: 'PLEASE_NOT_THAT',
        },
      ],
    },
  });
}

class ProofreaderDemo extends React.Component<{}, { value: string }> {
  state = {
    value:
      "Click the colored phrases for details on potential errors. or use this text too see an few of of the problems that Oxford can detecd. What do you thinks of grammar checkers? Please not that they are not perfect. Style issues get a blue marker: It's 5 P.M. in the afternoon.",
  };

  handleChange = (value: string) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <TextArea
        autoResize
        proofread
        name="textarea-proofread"
        label="Proofread"
        rows={5}
        maxLength={10000}
        value={this.state.value}
        onChange={this.handleChange}
        onCheckText={onCheckText}
      />
    );
  }
}

storiesOf('Core/TextArea', module)
  .addParameters({
    inspectComponents: [TextArea],
  })
  .add('A standard textarea field.', () => (
    <TextArea name="textarea-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('With a compact smaller view.', () => (
    <>
      <TextArea compact name="textarea-compact" label="Compact" onChange={action('onChange')} />
      <TextArea name="textarea-regular" label="Regular" onChange={action('onChange')} />
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <TextArea
      invalid
      name="textarea-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <TextArea
      disabled
      name="textarea-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('With a hidden label and different row height.', () => (
    <TextArea
      hideLabel
      name="textarea-custom"
      label="Label"
      rows={5}
      onChange={action('onChange')}
    />
  ))
  .add('Marked as optional with a placeholder.', () => (
    <TextArea
      optional
      name="textarea-optional"
      label="Label"
      placeholder="Tell us how you feel..."
      onChange={action('onChange')}
    />
  ))
  .add('Display with inline label and a prefix.', () => (
    <TextArea
      inline
      name="both-textarea"
      label="TextArea"
      prefix={<Prefix compact>Hello</Prefix>}
      onChange={action('onChange')}
    />
  ))
  .add(
    'A textarea with built-in grammar and spelling checks, as well as a max character limit.',
    () => <ProofreaderDemo />,
  );
