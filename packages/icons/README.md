# Lunar Icons

Collection of Material design UI icons.

```bash static
yarn add @airbnb/lunar-icons
```

## Usage

Icons are grouped into the following categories: `general` (common objects and symbols), `interface`
(user interface elements), and `social` (companies and products). Icon names are prefixed with
"Icon" and can be imported from their category folder.

```js static
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
```

Icon components support the following props:

- `accessibilityLabel` (string) - Label to provide accessibility controls.
- `decorative` (bool) - Icon is decorative only and does not require accessibility controls.
- `size` (number | string) - Size of the icon (`em` is preferred). Default is "1em".
- `color` (string) - Custom CSS hexcode or name to color the icon SVG with.
- `inline` (bool) - Display the component inline instead of block.

> `accessibilityLabel` or `decorative` is required, but not both.
