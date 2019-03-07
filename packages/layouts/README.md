# Lunar Layouts

Provides pre-defined page layouts that support top and side navigation bars.

```bash static
npm install @airbnb/lunar-layouts --save
```

## Usage

This packages provides a handful of components for common page layout scenarios, for example, three
column layouts, two columns layouts, split layouts, so on and so forth. To use, import the desired
layout and render near the root of the application.

```jsx static
import ThreeColumnLayout from '@airbnb/lunar-layouts/lib/components/ThreeColumnLayout';

<ThreeColumnLayout fluid before={<LeftSideBar />} after={<RightSideBar />}>
  <App />
</ThreeColumnLayout>;
```
