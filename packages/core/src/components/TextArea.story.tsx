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
        },
        {
          message: '',
          short_message: 'Incorrect word',
          offset: 76,
          length: 3,
          replacements: ['to'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 84,
          length: 2,
          replacements: ['a'],
        },
        {
          message: '',
          short_message: 'Double words',
          offset: 91,
          length: 5,
          replacements: ['of'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 126,
          length: 6,
          replacements: ['detect'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 146,
          length: 6,
          replacements: ['think'],
        },
        {
          message: '',
          short_message: 'Typo',
          offset: 181,
          length: 3,
          replacements: ['note'],
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
        onChange={this.handleChange}
        onCheckText={onCheckText}
        rows={5}
        maxLength={10000}
        value={this.state.value}
      />
    );
  }
}

storiesOf('Core/TextArea', module)
  .add('A standard textarea field.', () => (
    <TextArea name="textarea-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('With a compact smaller view.', () => (
    <>
      <TextArea name="textarea-compact" label="Compact" onChange={action('onChange')} compact />
      <TextArea name="textarea-regular" label="Regular" onChange={action('onChange')} />
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <TextArea
      name="textarea-error"
      label="Label"
      onChange={action('onChange')}
      errorMessage="This field is required."
      invalid
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <TextArea
      name="textarea-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      disabled
    />
  ))
  .add('With a hidden label and different row height.', () => (
    <TextArea
      name="textarea-custom"
      label="Label"
      onChange={action('onChange')}
      rows={5}
      hideLabel
    />
  ))
  .add('Marked as optional with a placeholder.', () => (
    <TextArea
      name="textarea-optional"
      label="Label"
      onChange={action('onChange')}
      placeholder="Tell us how you feel..."
      optional
    />
  ))
  .add('Display with inline label and a prefix.', () => (
    <TextArea
      name="both-textarea"
      label="TextArea"
      prefix={<Prefix compact>Hello</Prefix>}
      onChange={action('onChange')}
      inline
    />
  ))
  .add(
    'A textarea with built-in grammar and spelling checks, as well as a max character limit.',
    () => <ProofreaderDemo />,
  );
