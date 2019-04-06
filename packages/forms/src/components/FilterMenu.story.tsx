import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import Select from './Form/Select';
import CheckBox from './Form/CheckBox';
import FilterMenu, { Row } from './FilterMenu';

storiesOf('Forms/FilterMenu', module)
  .add('Form in a dropdown.', () => (
    <Form onSubmit={action('onSubmit')}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FilterMenu
          accessibilityLabel="Filter menu"
          zIndex={2}
          onShow={action('onShow')}
          onHide={action('onHide')}
        >
          <Row>
            <Select
              label="Select"
              name="select"
              defaultValue="foo"
              onChange={action('onChange')}
              validator={() => {}}
            >
              <option value="foo">Foo</option>
              <option value="bar">Bar</option>
              <option value="baz">Baz</option>
            </Select>
          </Row>

          <Row>
            <CheckBox
              label="CheckBox"
              name="checkbox"
              onChange={action('onChange')}
              validator={() => {}}
            />
          </Row>
        </FilterMenu>
      </div>
    </Form>
  ))
  .add('Left-aligned menu.', () => (
    <Form onSubmit={action('onSubmit')}>
      <FilterMenu dropdownProps={{ left: 0 }} accessibilityLabel="Filter menu">
        <Row>
          <Select
            label="Select"
            name="select"
            defaultValue="foo"
            onChange={action('onChange')}
            validator={() => {}}
          >
            <option value="foo">Foo</option>
            <option value="bar">Bar</option>
            <option value="baz">Baz</option>
          </Select>
        </Row>

        <Row>
          <CheckBox
            label="CheckBox"
            name="checkbox"
            onChange={action('onChange')}
            validator={() => {}}
          />
        </Row>
      </FilterMenu>
    </Form>
  ))
  .add('With overflow.', () => (
    <Form onSubmit={action('onSubmit')}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FilterMenu accessibilityLabel="Filter menu" menuProps={{ maxHeight: 200 }} zIndex={2}>
          <Row>
            <Select
              label="Select"
              name="select"
              defaultValue="foo"
              onChange={action('onChange')}
              validator={() => {}}
            >
              <option value="foo">Foo</option>
              <option value="bar">Bar</option>
              <option value="baz">Baz</option>
            </Select>
          </Row>

          <Row>
            <CheckBox
              label="CheckBox"
              name="checkbox"
              onChange={action('onChange')}
              validator={() => {}}
            />
          </Row>

          <Row>
            <div style={{ height: 300 }} />
          </Row>
        </FilterMenu>
      </div>
    </Form>
  ));
