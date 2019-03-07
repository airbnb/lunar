Default profile photo; this component is inline by design.

```jsx
<ProfilePhoto imageSrc={window.images.lunar} title="Link" />
```

With different sizing: units-based size, small, regular (default), large, macro.

```jsx
<ProfilePhoto
  imageSrc={window.images.lunar}
  title="Link"
  size={2}
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  title="Link"
  small
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  title="Link"
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  title="Link"
  large
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  title="Link"
  macro
/>
```

Inline profile photos.

```jsx
<ProfilePhoto
  imageSrc={window.images.lunar}
  inline
  title="Link"
  size={2}
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  inline
  title="Link"
  small
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  inline
  title="Link"
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  inline
  title="Link"
  large
/>
<ProfilePhoto
  imageSrc={window.images.lunar}
  inline
  title="Link"
  macro
/>
```

Square profile photo.

```jsx
<ProfilePhoto imageSrc={window.images.lunar} inline title="Link" large square />
```

Broken image with overflowing alt text.

```jsx
<ProfilePhoto
  imageSrc="BROKEN_IMAGE"
  title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  large
/>
```
