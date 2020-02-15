import React from 'react';
import Text from '../Text';
import MenuToggle from '../MenuToggle';
import { Item as MenuItem } from '../Menu';
import Table, { Cell, Row } from '.';

export default {
  title: 'Core/Table',
  parameters: {
    inspectComponents: [Table, Cell, Row],
  },
};

export function displayATableWithNoStyles() {
  return (
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
    </Text>
  );
}

displayATableWithNoStyles.story = {
  name: 'Display a table with no styles.',
};

export function withABorderAndVerticalDividers() {
  return (
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
    </Text>
  );
}

withABorderAndVerticalDividers.story = {
  name: 'With a border and vertical dividers.',
};

export function withABorderAndHorizontalDividers() {
  return (
    <Text>
      <Table bordered horizontal>
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
    </Text>
  );
}

withABorderAndHorizontalDividers.story = {
  name: 'With a border and horizontal dividers.',
};

export function withStripedRowsAndHorizontalDividers() {
  return (
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
    </Text>
  );
}

withStripedRowsAndHorizontalDividers.story = {
  name: 'With striped rows and horizontal dividers.',
};

export function aCompactViewWithMultipleStylesApplied() {
  return (
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
    </Text>
  );
}

aCompactViewWithMultipleStylesApplied.story = {
  name: 'A compact view with multiple styles applied.',
};

export function withDifferentRowStatusColors() {
  return (
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
    </Text>
  );
}

withDifferentRowStatusColors.story = {
  name: 'With different row status colors.',
};

export function cellsWithDifferentAlignments() {
  return (
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
    </Text>
  );
}

cellsWithDifferentAlignments.story = {
  name: 'Cells with different alignments.',
};

export function cellsWithCenteredContent() {
  return (
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
    </Text>
  );
}

cellsWithCenteredContent.story = {
  name: 'Cells with centered content.',
};

export function withoutResponsiveWrapper() {
  return (
    <Text>
      <Table noWrap>
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
            <td>
              <MenuToggle closeOnClick accessibilityLabel="Menu" toggleLabel="Actions">
                <MenuItem>
                  <Text>Item</Text>
                </MenuItem>
              </MenuToggle>
            </td>
          </tr>
          <tr>
            <td>Title 2</td>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>
              <MenuToggle closeOnClick accessibilityLabel="Menu" toggleLabel="Actions">
                <MenuItem>
                  <Text>Item</Text>
                </MenuItem>
              </MenuToggle>
            </td>
          </tr>
          <tr>
            <td>Title 3</td>
            <td>Lorem ipsum dolor sit amet.</td>
            <td>
              <MenuToggle closeOnClick accessibilityLabel="Menu" toggleLabel="Actions">
                <MenuItem>
                  <Text>Item</Text>
                </MenuItem>
              </MenuToggle>
            </td>
          </tr>
        </tbody>
      </Table>
    </Text>
  );
}

withoutResponsiveWrapper.story = {
  name: 'Display a table without responsive wrapper (noWrap).',
};
