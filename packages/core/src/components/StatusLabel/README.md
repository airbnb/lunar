Default and status labels.

```jsx
<StatusLabel>Default</StatusLabel>
<StatusLabel notice>Notice</StatusLabel>
<StatusLabel info>Info</StatusLabel>
<StatusLabel success>Success</StatusLabel>
<StatusLabel warning>Warning</StatusLabel>
<StatusLabel danger>Danger</StatusLabel>
<StatusLabel muted>Muted</StatusLabel>
```

Branded status labels.

```jsx
<StatusLabel luxury>Luxury</StatusLabel>
<StatusLabel plus>Plus</StatusLabel>
```

Color inverted and uppercased labels.

```jsx
<StatusLabel inverted uppercased>
  Default
</StatusLabel>
<StatusLabel inverted uppercased notice>
  Notice
</StatusLabel>
<StatusLabel inverted uppercased info>
  Info
</StatusLabel>
<StatusLabel inverted uppercased success>
  Success
</StatusLabel>
<StatusLabel inverted uppercased warning>
  Warning
</StatusLabel>
<StatusLabel inverted uppercased danger>
  Danger
</StatusLabel>
<StatusLabel inverted uppercased muted>
  Muted
</StatusLabel>
<StatusLabel inverted uppercased luxury>
  Luxury
</StatusLabel>
<StatusLabel inverted uppercased plus>
  Plus
</StatusLabel>
```

With a border applied.

```jsx
<StatusLabel inverted bordered>
  Default
</StatusLabel>
```

With compact applied.

```jsx
<StatusLabel compact>Compact</StatusLabel>
<StatusLabel compact inverted bordered>Compact</StatusLabel>
```

Within a block of text.

```jsx
import Text from '../Text';

<Text>
  Lorem ipsum dolor sit amet. <StatusLabel>Default</StatusLabel> Consectetur adipiscing elit.
</Text>;
```

With before and or after icons.

```jsx
import IconAddAlt from ':icons/interface/IconAddAlt';

<div>
  <StatusLabel beforeIcon={<IconAddAlt decorative />} success>
    Before icon
  </StatusLabel>
  <StatusLabel afterIcon={<IconAddAlt decorative />} notice>
    After icon
  </StatusLabel>
</div>;
```
