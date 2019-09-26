import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FileInput from './FileInput';

storiesOf('Core/FileInput', module)
  .addParameters({
    inspectComponents: [FileInput],
  })
  .add('A standard file upload field.', () => (
    <FileInput name="input-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('Supports multiple files, of image only, while hiding file preview columns.', () => (
    <FileInput
      onlyImages
      multiple
      hideFileType
      hideLastModified
      name="input-multiple"
      label="Label"
      onChange={action('onChange')}
    />
  ))
  .add('With a compact smaller view, only supporting audio and video.', () => (
    <>
      <FileInput
        onlyAudio
        compact
        name="input-compact"
        label="Compact"
        onChange={action('onChange')}
      />
      <FileInput onlyVideo name="input-regular" label="Regular" onChange={action('onChange')} />
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <FileInput
      invalid
      name="input-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <FileInput
      disabled
      name="input-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('Marked as optional.', () => (
    <FileInput optional name="input-optional" label="Label" onChange={action('onChange')} />
  ))
  .add('Display with inline label (does not display file table).', () => (
    <FileInput
      optional
      inline
      name="input-optional"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ));
