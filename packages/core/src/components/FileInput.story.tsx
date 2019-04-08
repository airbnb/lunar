import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FileInput from './FileInput';

storiesOf('Core/FileInput', module)
  .add('A standard file upload field.', () => (
    <FileInput name="input-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('Supports multiple files, of image only, while hiding file preview columns.', () => (
    <FileInput
      name="input-multiple"
      label="Label"
      onChange={action('onChange')}
      onlyImages
      multiple
      hideFileType
      hideLastModified
    />
  ))
  .add('With a compact smaller view, only supporting audio and video.', () => (
    <>
      <FileInput
        name="input-compact"
        label="Compact"
        onChange={action('onChange')}
        onlyAudio
        compact
      />
      <FileInput name="input-regular" label="Regular" onChange={action('onChange')} onlyVideo />
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <FileInput
      name="input-error"
      label="Label"
      onChange={action('onChange')}
      errorMessage="This field is required."
      invalid
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <FileInput
      name="input-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      disabled
    />
  ))
  .add('Marked as optional.', () => (
    <FileInput name="input-optional" label="Label" onChange={action('onChange')} optional />
  ))
  .add('Display with inline label (does not display file table).', () => (
    <FileInput
      name="input-optional"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      optional
      inline
    />
  ));
