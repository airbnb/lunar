import React from 'react';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import IconButton from '.';

export default {
  title: 'Core/IconButton',
  parameters: {
    inspectComponents: [IconButton],
  },
};

export function aStandardButtonWithDifferentSizes() {
  return (
    <>
      <IconButton onClick={() => console.log('onClick')}>
        <IconCheck decorative />
      </IconButton>
      <br />
      <br />
      <IconButton onClick={() => console.log('onClick')}>
        <IconCheck decorative size="2em" />
      </IconButton>
    </>
  );
}

aStandardButtonWithDifferentSizes.story = {
  name: 'A standard button, with different sizes.',
};

export function anAnchorLinkWhenPassingHref() {
  return (
    <IconButton
      openInNewWindow
      href="https://github.com/airbnb/lunar"
      onClick={() => console.log('onClick')}
    >
      <IconCheck decorative />
    </IconButton>
  );
}

anAnchorLinkWhenPassingHref.story = {
  name: 'An anchor link when passing `href`.',
};

export function wrappedInATooltip() {
  return (
    <IconButton tooltip="This does something cool." onClick={() => console.log('onClick')}>
      <IconCheck decorative />
    </IconButton>
  );
}

wrappedInATooltip.story = {
  name: 'Wrapped in a tooltip.',
};

export function withADisabledState() {
  return (
    <IconButton disabled onClick={() => console.log('onClick')}>
      <IconCheck decorative />
    </IconButton>
  );
}

withADisabledState.story = {
  name: 'With a disabled state.',
};
