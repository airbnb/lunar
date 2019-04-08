import React from 'react';
import { storiesOf } from '@storybook/react';
import lunar from ':storybook/images/lunar-logo.png';
import ProfilePhoto from './ProfilePhoto';

storiesOf('Core/ProfilePhoto', module)
  .add('Default profile photo.', () => <ProfilePhoto imageSrc={lunar} title="Photo" />)
  .add('With different sizing: units-based size, small, regular (default), large, macro.', () => (
    <>
      <ProfilePhoto imageSrc={lunar} title="Photo" size={2} />
      <ProfilePhoto imageSrc={lunar} title="Photo" small />
      <ProfilePhoto imageSrc={lunar} title="Photo" />
      <ProfilePhoto imageSrc={lunar} title="Photo" large />
      <ProfilePhoto imageSrc={lunar} title="Photo" macro />
    </>
  ))
  .add('Inline profile photos.', () => (
    <>
      <ProfilePhoto imageSrc={lunar} inline title="Photo" size={2} />
      <ProfilePhoto imageSrc={lunar} inline title="Photo" small />
      <ProfilePhoto imageSrc={lunar} inline title="Photo" />
      <ProfilePhoto imageSrc={lunar} inline title="Photo" large />
      <ProfilePhoto imageSrc={lunar} inline title="Photo" macro />
    </>
  ))
  .add('Square profile photo.', () => (
    <ProfilePhoto imageSrc={lunar} inline title="Photo" large square />
  ))
  .add('Broken image with overflowing alt text.', () => (
    <ProfilePhoto imageSrc="BROKEN_IMAGE" title="Alt title text." large />
  ));
