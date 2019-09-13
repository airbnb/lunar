import React from 'react';
import { storiesOf } from '@storybook/react';
import lunar from ':storybook/images/lunar-logo.png';
import ProfilePhoto from './ProfilePhoto';

storiesOf('Core/ProfilePhoto', module)
  .addParameters({
    inspectComponents: [ProfilePhoto],
  })
  .add('Default profile photo.', () => <ProfilePhoto imageSrc={lunar} title="Photo" />)
  .add('With different sizing: units-based size, small, regular (default), large, macro.', () => (
    <>
      <ProfilePhoto imageSrc={lunar} title="Photo" size={2} />
      <ProfilePhoto small imageSrc={lunar} title="Photo" />
      <ProfilePhoto imageSrc={lunar} title="Photo" />
      <ProfilePhoto large imageSrc={lunar} title="Photo" />
      <ProfilePhoto macro imageSrc={lunar} title="Photo" />
    </>
  ))
  .add('Inline profile photos.', () => (
    <>
      <ProfilePhoto inline imageSrc={lunar} title="Photo" size={2} />
      <ProfilePhoto inline small imageSrc={lunar} title="Photo" />
      <ProfilePhoto inline imageSrc={lunar} title="Photo" />
      <ProfilePhoto inline large imageSrc={lunar} title="Photo" />
      <ProfilePhoto inline macro imageSrc={lunar} title="Photo" />
    </>
  ))
  .add('Square profile photo.', () => (
    <ProfilePhoto inline large square imageSrc={lunar} title="Photo" />
  ))
  .add('Broken image with overflowing alt text.', () => (
    <ProfilePhoto large imageSrc="BROKEN_IMAGE" title="Alt title text." />
  ))
  .add('Fallback image src when image is broken.', () => (
    <ProfilePhoto large fallbackImageSrc={lunar} imageSrc="BROKEN_IMAGE" title="Alt title text." />
  ));
