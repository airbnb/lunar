Display a horizontal group of profile photos.

```jsx
import ProfilePhoto from '../ProfilePhoto';

<ProfilePhotoGroup>
  <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

  <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

  <ProfilePhoto imageSrc={window.images.lunar} title="Link" />
</ProfilePhotoGroup>;
```

Show a remainder when the max is met.

```jsx
import ProfilePhoto from '../ProfilePhoto';

<ProfilePhotoGroup max={2}>
  <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

  <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

  <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

  <ProfilePhoto imageSrc={window.images.lunar} title="Link" />
</ProfilePhotoGroup>;
```

Support different sizes.

```jsx
import ProfilePhoto from '../ProfilePhoto';

<div>
  <ProfilePhotoGroup size={3}>
    <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

    <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

    <ProfilePhoto imageSrc={window.images.lunar} title="Link" />
  </ProfilePhotoGroup>
  <br />
  <ProfilePhotoGroup size={8}>
    <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

    <ProfilePhoto imageSrc={window.images.lunar} title="Link" />

    <ProfilePhoto imageSrc={window.images.lunar} title="Link" />
  </ProfilePhotoGroup>
</div>;
```
