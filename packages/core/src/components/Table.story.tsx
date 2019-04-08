import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Table, { Cell, Row } from './Table';

storiesOf('Core/Table', module)
  .add('Display a table with no styles.', () => (
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
  ))
  .add('With a border and vertical dividers.', () => (
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
  ))
  .add('With striped rows and horizontal dividers.', () => (
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
  ))
  .add('A compact view with multiple styles applied.', () => (
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
  ))
  .add('With different row status colors.', () => (
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
  ))
  .add('Cells with different alignments.', () => (
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
  ))
  .add('Cells with centered content.', () => (
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
  ));
