An image that is constrained proportionally in one or both dimensions.

```jsx
import Shimmer from '../Shimmer';

<ResponsiveImage
  src={window.images.lunar}
  alt="Link"
  maxWidth={150}
  maxHeight={150}
  borderRadius={6}
  shimmer={<Shimmer height={150} width={150} block />}
/>;
```

With `cover`, an image will rescale to cover its dimensions, cropping and centering the image.

Useful when the image's aspect ratio is unknown and not guaranteed to be the same ratio as the
provided max dimensions.

```jsx
import Shimmer from '../Shimmer';

<ResponsiveImage
  cover
  src={window.images.lunar}
  alt="Link"
  maxWidth={150}
  maxHeight={100}
  shimmer={<Shimmer height={100} width={150} block />}
/>;
```

With `noShadow`, the box-shadow will be suppressed.

```jsx
import Shimmer from '../Shimmer';

<ResponsiveImage
  noShadow
  src={window.images.lunar}
  alt="Link"
  maxWidth={150}
  shimmer={<Shimmer height={150} width={150} block />}
/>;
```
