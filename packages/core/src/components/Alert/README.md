Default and status classified alerts.

```jsx
<Alert title="Alert title" />
<br />
<Alert notice title="Notice alert title" />
<br />
<Alert info title="Info alert title" />
<br />
<Alert success title="Success alert title" />
<br />
<Alert warning title="Warning alert title" />
<br />
<Alert danger title="Danger alert title" />
```

With no icons, if applicable.

```jsx
<Alert hideStatusIcon title="Alert title" />
<br />
<Alert notice hideStatusIcon title="Notice alert title" />
<br />
<Alert info hideStatusIcon title="Info alert title" />
<br />
<Alert success hideStatusIcon title="Success alert title" />
<br />
<Alert warning hideStatusIcon title="Warning alert title" />
<br />
<Alert danger hideStatusIcon title="Danger alert title" />
```

With a close button.

```jsx
import Text from '../Text';

<div>
  <Alert title="Alert title" onClose={() => console.log('onClose')} />

  <br />

  <Alert title="Alert title" onClose={() => console.log('onClose')}>
    <Text>Supporting content that is descriptive and helpful would go here</Text>
  </Alert>

  <br />

  <Alert danger title="Danger alert title" onClose={() => console.log('onClose')}>
    <Text>Supporting content that is descriptive and helpful would go here</Text>
  </Alert>
</div>;
```

Inline.

```jsx
import Text from '../Text';

<Alert inline notice title="Inline notice alert title">
  <Text>Supporting content that is descriptive and helpful would go here</Text>
</Alert>;
```

With supporting content.

```jsx
import MutedButton from '../MutedButton';

<Alert danger title="Something failed horribly" onClose={() => console.log('onClose')}>
  <MutedButton inverted onClick={() => console.log('Retry the thing')}>
    Retry the thing
  </MutedButton>
</Alert>;
```

With wrapping content.

```jsx
import MutedButton from '../MutedButton';
import Spacing from '../Spacing';
import Text from '../Text';

<Alert info title="Something failed horribly" onClose={() => console.log('onClose')}>
  <Text>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
      sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
      blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi,
      a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
      Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat.
      Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum.
      Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
    </div>
  </Text>

  <Spacing top={1}>
    <MutedButton inverted onClick={() => console.log('Retry the thing')}>
      Retry the thing
    </MutedButton>
  </Spacing>
</Alert>;
```
