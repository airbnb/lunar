Display a table with no styles.

```jsx
import Table, { Cell, Row } from '.';
import Text from '../Text';

<Text>
  <Table>
    <thead>
      <tr>
        <th>One</th>
        <th>Two</th>
        <th>Three</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title 1</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 2</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 3</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
    </tbody>
  </Table>
</Text>;
```

Render with a border and vertical dividers.

```jsx
import Table, { Cell, Row } from '.';
import Text from '../Text';

<Text>
  <Table bordered vertical>
    <thead>
      <tr>
        <th>One</th>
        <th>Two</th>
        <th>Three</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title 1</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 2</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 3</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
    </tbody>
  </Table>
</Text>;
```

Render with striped rows and horizontal dividers.

```jsx
import Table, { Cell, Row } from '.';
import Text from '../Text';

<Text>
  <Table horizontal striped>
    <thead>
      <tr>
        <th>One</th>
        <th>Two</th>
        <th>Three</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title 1</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 2</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 3</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
    </tbody>
  </Table>
</Text>;
```

Render a compact view with multiple styles applied.

```jsx
import Table, { Cell, Row } from '.';
import Text from '../Text';

<Text>
  <Table compact bordered horizontal vertical striped>
    <thead>
      <tr>
        <th>One</th>
        <th>Two</th>
        <th>Three</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title 1</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 2</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
      <tr>
        <td>Title 3</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
    </tbody>
  </Table>
</Text>;
```

Render rows with different status colors.

```jsx
import Table, { Cell, Row } from '.';
import Text from '../Text';

<Text>
  <Table bordered horizontal vertical>
    <thead>
      <tr>
        <th>One</th>
        <th>Two</th>
        <th>Three</th>
      </tr>
    </thead>
    <tbody>
      <Row muted>
        <td>Title 1</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </Row>
      <Row danger>
        <td>Title 2</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </Row>
      <Row info>
        <td>Title 3</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </Row>
      <Row notice>
        <td>Title 4</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </Row>
      <Row success>
        <td>Title 5</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </Row>
      <Row warning>
        <td>Title 6</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </Row>
    </tbody>
  </Table>
</Text>;
```

Render cells with different alignments.

```jsx
import Table, { Cell, Row } from '.';
import Text from '../Text';

<Text>
  <Table bordered horizontal vertical>
    <thead>
      <tr>
        <Cell header startAlign>
          One
        </Cell>
        <Cell header centerAlign>
          Two
        </Cell>
        <Cell header endAlign>
          Three
        </Cell>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title 1</td>
        <td>Lorem ipsum dolor sit amet.</td>
        <td>Consectetur adipiscing elit.</td>
      </tr>
    </tbody>
  </Table>
</Text>;
```

Render cells with centered content.

```jsx
import Table, { Cell, Row } from '.';
import Text from '../Text';

<Text>
  <Table middleAlign>
    <thead>
      <tr>
        <th>One</th>
        <th>Two</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title 1</td>
        <td>
          <div>Lorem ipsum dolor sit amet. </div>
          <div>Consectetur adipiscing elit. </div>
          <div>Lorem ipsum dolor sit amet. </div>
          <div>Consectetur adipiscing elit. </div>
          <div>Lorem ipsum dolor sit amet. </div>
          <div>Consectetur adipiscing elit. </div>
        </td>
      </tr>
      <tr>
        <td>Title 2</td>
        <td>
          <div>Lorem ipsum dolor sit amet. </div>
          <div>Consectetur adipiscing elit. </div>
          <div>Lorem ipsum dolor sit amet. </div>
          <div>Consectetur adipiscing elit. </div>
          <div>Lorem ipsum dolor sit amet. </div>
          <div>Consectetur adipiscing elit. </div>
        </td>
      </tr>
    </tbody>
  </Table>
</Text>;
```
