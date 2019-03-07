A vertical sidebar with menu items.

```jsx
import IconUser from ':icons/general/IconUser';
import IconSettings from ':icons/interface/IconSettings';
import IconChat from ':icons/interface/IconChat';
import SideBar, { Item } from '.';

<SideBar accessibilityLabel="Side menu">
  <Item icon={<IconUser accessibilityLabel="Profile" />} />
  <Item icon={<IconSettings accessibilityLabel="Settings" />} />
  <Item icon={<IconChat accessibilityLabel="Chat" />} />
</SideBar>;
```

With labels and an active state.

```jsx
import IconUser from ':icons/general/IconUser';
import IconSettings from ':icons/interface/IconSettings';
import IconChat from ':icons/interface/IconChat';
import SideBar, { Item } from '.';

<SideBar accessibilityLabel="Side menu">
  <Item icon={<IconUser accessibilityLabel="Profile" />} label="Stats" />
  <Item icon={<IconSettings accessibilityLabel="Settings" />} label="Config" active />
  <Item icon={<IconChat accessibilityLabel="Chat" />} label="Chat" />
</SideBar>;
```
