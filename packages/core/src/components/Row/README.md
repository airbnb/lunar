```jsx
import Text from '../Text';

<Row>
  <Text>This row only has primary content in it.</Text>
</Row>;
```

```jsx
import Text from '../Text';

<Row before={<img src="http://via.placeholder.com/50x50" />}>
  <Text>This row has a before component.</Text>
</Row>;
```

```jsx
import Text from '../Text';
import Button from '../Button';

<Row after={<Button>Take an action</Button>}>
  <Text>This row has an after component.</Text>
</Row>;
```

```jsx
import Text from '../Text';
import Button from '../Button';

<Row
  before={<img src="http://via.placeholder.com/50x50" />}
  after={<Button>Take an action</Button>}
  middleAlign
>
  <Text>This row has both before and after, and is aligned in the middle vertically.</Text>
</Row>;
```

```jsx
import Text from '../Text';
import Button from '../Button';

<Row
  before={<img src="http://via.placeholder.com/50x50" />}
  after={<Button>Take an action</Button>}
>
  <Text>
    This is some very long primary content.
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
</Row>;
```

```jsx
import Text from '../Text';
import Button from '../Button';

<Row after={<Button>Take an action</Button>} topline baseline spacious>
  <Text>A row where both topline and baseline are true.</Text>
</Row>;
```

```jsx
import Text from '../Text';
import Button from '../Button';

<div>
  <Row after={<Button>Take an action</Button>} topline spacious>
    <Text>A row where only topline is true.</Text>
  </Row>

  <Row after={<Button>Take an action</Button>} topline baseline spacious>
    <Text>A row with both topline and baseline.</Text>
  </Row>

  <Row after={<Button>Take an action</Button>} baseline spacious>
    <Text>A row where only baseline is true.</Text>
  </Row>
</div>;
```

```jsx
import Text from '../Text';
import Button from '../Button';

<div>
  <Row after={<Button>Take an action</Button>} topline spacious>
    <Text>A row with spacious padding.</Text>
  </Row>

  <Row after={<Button>Take an action</Button>} topline baseline compact>
    <Text>A row with compact padding.</Text>
  </Row>

  <Row after={<Button>Take an action</Button>} baseline>
    <Text>A row with no padding.</Text>
  </Row>
</div>;
```
