Display fractions as diagonal or stacked.

```jsx
import Text from '../Text';

<Text>
  <Glyph diagonal>1/3</Glyph>
  <br />
  <Glyph stacked>1/3</Glyph>
</Text>;
```

Display zeros with a slash.

```jsx
import Text from '../Text';

<Text>
  <Glyph slashed>1000</Glyph>
</Text>;
```

Display fixed width numbers for tabular rendering.

```jsx
import Text from '../Text';

<Text>
  <Glyph tabular>123.45</Glyph>
  <br />
  <Glyph tabular>456.70</Glyph>
</Text>;
```

Display numbers with ordinal suffixes.

```jsx
import Text from '../Text';

<Text>
  <Glyph ordinal>1st</Glyph> <Glyph ordinal>2nd</Glyph> <Glyph ordinal>3rd</Glyph>
</Text>;
```
