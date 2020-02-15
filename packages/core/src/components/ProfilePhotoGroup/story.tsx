import React from 'react';
import lunar from ':storybook/images/lunar-logo.png';
import ProfilePhoto from '../ProfilePhoto';
import ProfilePhotoGroup from '.';

export default {
  title: 'Core/ProfilePhotoGroup',
  parameters: {
    inspectComponents: [ProfilePhotoGroup],
  },
};

export function displayAHorizontalGroupOfProfilePhotos() {
  return (
    <ProfilePhotoGroup>
      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />
    </ProfilePhotoGroup>
  );
}

displayAHorizontalGroupOfProfilePhotos.story = {
  name: 'Display a horizontal group of profile photos.',
};

export function showARemainderWhenTheMaxIsMet() {
  return (
    <ProfilePhotoGroup max={2}>
      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />

      <ProfilePhoto imageSrc={lunar} title="Photo" />
    </ProfilePhotoGroup>
  );
}

showARemainderWhenTheMaxIsMet.story = {
  name: 'Show a remainder when the max is met.',
};

export function supportDifferentSizes() {
  return (
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
  );
}

supportDifferentSizes.story = {
  name: 'Support different sizes.',
};
