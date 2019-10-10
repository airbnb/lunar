import React from 'react';
import FileInput from '.';

export default {
  title: 'Core/FileInput',
  parameters: {
    inspectComponents: [FileInput],
  },
};

export function aStandardFileUploadField() {
  return <FileInput name="input-basic" label="Label" onChange={action('onChange')} />;
}

aStandardFileUploadField.story = {
  name: 'A standard file upload field.',
};

export function supportsMultipleFilesOfImageOnlyWhileHidingFilePreviewColumns() {
  return (
    <FileInput
      onlyImages
      multiple
      hideFileType
      hideLastModified
      name="input-multiple"
      label="Label"
      onChange={action('onChange')}
    />
  );
}

supportsMultipleFilesOfImageOnlyWhileHidingFilePreviewColumns.story = {
  name: 'Supports multiple files, of image only, while hiding file preview columns.',
};

export function withACompactSmallerViewOnlySupportingAudioAndVideo() {
  return (
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
  );
}

withACompactSmallerViewOnlySupportingAudioAndVideo.story = {
  name: 'With a compact smaller view, only supporting audio and video.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <FileInput
      invalid
      name="input-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  );
}

withAnErrorMessageInAnInvalidState.story = {
  name: 'With an error message in an invalid state.',
};

export function withALabelDescriptionInADisabledState() {
  return (
    <FileInput
      disabled
      name="input-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  );
}

withALabelDescriptionInADisabledState.story = {
  name: 'With a label description in a disabled state.',
};

export function markedAsOptional() {
  return <FileInput optional name="input-optional" label="Label" onChange={action('onChange')} />;
}

markedAsOptional.story = {
  name: 'Marked as optional.',
};

export function displayWithInlineLabelDoesNotDisplayFileTable() {
  return (
    <FileInput
      optional
      inline
      name="input-optional"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  );
}

displayWithInlineLabelDoesNotDisplayFileTable.story = {
  name: 'Display with inline label (does not display file table).',
};
