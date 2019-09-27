import React from 'react';
import lunar from ':storybook/images/lunar-logo.png';
import ProfilePhoto from '.';

export default {
  title: 'Core/ProfilePhoto',
  parameters: {
    inspectComponents: [ProfilePhoto],
  },
};

export function defaultProfilePhoto() {
  return <ProfilePhoto imageSrc={lunar} title="Photo" />;
}

defaultProfilePhoto.story = {
  name: 'Default profile photo.',
};

export function withDifferentSizingUnitsBasedSizeSmallRegularDefaultLargeMacro() {
  return (
    <>
      <ProfilePhoto imageSrc={lunar} title="Photo" size={2} />
      <ProfilePhoto small imageSrc={lunar} title="Photo" />
      <ProfilePhoto imageSrc={lunar} title="Photo" />
      <ProfilePhoto large imageSrc={lunar} title="Photo" />
      <ProfilePhoto macro imageSrc={lunar} title="Photo" />
    </>
  );
}

withDifferentSizingUnitsBasedSizeSmallRegularDefaultLargeMacro.story = {
  name: 'With different sizing: units-based size, small, regular (default), large, macro.',
};

export function inlineProfilePhotos() {
  return (
    <>
      <ProfilePhoto inline imageSrc={lunar} title="Photo" size={2} />
      <ProfilePhoto inline small imageSrc={lunar} title="Photo" />
      <ProfilePhoto inline imageSrc={lunar} title="Photo" />
      <ProfilePhoto inline large imageSrc={lunar} title="Photo" />
      <ProfilePhoto inline macro imageSrc={lunar} title="Photo" />
    </>
  );
}

inlineProfilePhotos.story = {
  name: 'Inline profile photos.',
};

export function squareProfilePhoto() {
  return <ProfilePhoto inline large square imageSrc={lunar} title="Photo" />;
}

squareProfilePhoto.story = {
  name: 'Square profile photo.',
};

export function brokenImageWithOverflowingAltText() {
  return <ProfilePhoto large imageSrc="BROKEN_IMAGE" title="Alt title text." />;
}

brokenImageWithOverflowingAltText.story = {
  name: 'Broken image with overflowing alt text.',
};

export function fallbackImageSrcWhenImageIsBroken() {
  return (
    <ProfilePhoto large fallbackImageSrc={lunar} imageSrc="BROKEN_IMAGE" title="Alt title text." />
  );
}

fallbackImageSrcWhenImageIsBroken.story = {
  name: 'Fallback image src when image is broken.',
};
