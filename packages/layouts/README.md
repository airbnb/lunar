# Lunar Layouts

Provides pre-defined page layouts that support top and side navigation bars.

```bash static
yarn add @airbnb/lunar-layouts
```

## Usage

This packages provides a handful of components for common page layout scenarios, for example, three
column layouts, two columns layouts, split layouts, so on and so forth.

To use, import the `LayoutShell` and render near the root of the application. Column based layouts
may then be rendered as children of the shell.

```jsx static
import LayoutShell from '@airbnb/lunar-layouts';
import ThreeColumnLayout from '@airbnb/lunar-layouts/lib/components/ThreeColumnLayout';

<LayoutShell sideBar={<SideBar />}>
  <ThreeColumnLayout fluid before={<LeftColumn />} after={<RightColumn />}>
    <Content />
  </ThreeColumnLayout>
</LayoutShell>;
```
