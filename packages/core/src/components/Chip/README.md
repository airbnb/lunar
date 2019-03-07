Render a simple chip.

```jsx
<Chip>Chip</Chip>
```

Render a chip with an icon.

```jsx
import IconCloseAlt from ':icons/interface/IconCloseAlt';

<Chip icon={<IconCloseAlt size="2em" />}>Chip</Chip>;
```

Render a chip with an icon button.

```jsx
import IconCloseAlt from ':icons/interface/IconCloseAlt';
import Spacing from '../Spacing';

<div>
  <Spacing right={1} inline>
    <Chip icon={<IconCloseAlt size="2em" />} onIconClick={debug('onIconClick')}>
      Close
    </Chip>
  </Spacing>

  <Spacing right={0} inline>
    <Chip disabled icon={<IconCloseAlt size="2em" />} onIconClick={debug('onIconClick')}>
      Close
    </Chip>
  </Spacing>
</div>;
```

Render a chip with a profile photo.

```jsx
<Chip profileImageSrc={window.images.lunar}>User</Chip>
```

Render a chip with both a profile photo and an icon.

```jsx
import IconSettings from ':icons/interface/IconSettings';

<Chip icon={<IconSettings size="2em" />} profileImageSrc={window.images.lunar}>
  Settings
</Chip>;
```

Render disabled chips.

```jsx
import IconSettings from ':icons/interface/IconSettings';
import Spacing from '../Spacing';

<div>
  <Spacing right={1} inline>
    <Chip disabled>Chip</Chip>
  </Spacing>

  <Spacing right={1} inline>
    <Chip disabled icon={<IconSettings size="2em" />} profileImageSrc={window.images.lunar}>
      User
    </Chip>
  </Spacing>

  <Spacing right={0} inline>
    <Chip disabled icon={<IconSettings size="2em" />}>
      Settings
    </Chip>
  </Spacing>
</div>;
```

Render chip buttons.

```jsx
import IconSettings from ':icons/interface/IconSettings';
import Spacing from '../Spacing';

<div>
  <Spacing right={1} inline>
    <Chip onClick={debug('onClick')}>Chip</Chip>
  </Spacing>

  <Spacing right={1} inline>
    <Chip
      icon={<IconSettings size="2em" />}
      profileImageSrc={window.images.lunar}
      onClick={debug('onClick')}
    >
      User
    </Chip>
  </Spacing>

  <Spacing right={0} inline>
    <Chip icon={<IconSettings size="2em" />} onClick={debug('onClick')}>
      Settings
    </Chip>
  </Spacing>
</div>;
```
