import React from 'react';
import { storiesOf } from '@storybook/react';
import lunar from ':image/lunar-logo.png';
import ProfilePhoto from './ProfilePhoto';
import ProfilePhotoGroup from './ProfilePhotoGroup';

storiesOf('Core/ProfilePhotoGroup', module)
  .add('Display a horizontal group of profile photos.', () => (
    <ProfilePhotoGroup>
      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />
    </ProfilePhotoGroup>
  ))
  .add('Show a remainder when the max is met.', () => (
    <ProfilePhotoGroup max={2}>
      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />
    </ProfilePhotoGroup>
  ))
  .add('Support different sizes.', () => (
    <>
      <div>
        <ProfilePhotoGroup size={3}>
          <ProfilePhoto imageSrc={lunar} title="Photo" />

          <ProfilePhoto imageSrc={lunar} title="Photo" />

          <ProfilePhoto imageSrc={lunar} title="Photo" />
        </ProfilePhotoGroup>
        <br />
        <ProfilePhotoGroup size={8}>
          <ProfilePhoto imageSrc={lunar} title="Photo" />

          <ProfilePhoto imageSrc={lunar} title="Photo" />

          <ProfilePhoto imageSrc={lunar} title="Photo" />
        </ProfilePhotoGroup>
      </div>
    </>
  ));
