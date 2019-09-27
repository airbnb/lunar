import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from '../Form';
import Select from '../Form/Select';
import CheckBox from '../Form/CheckBox';
import FilterMenu, { Row } from '.';

export default {
  title: 'Forms/FilterMenu',
  decorators: [(story: Function) => <div style={{ margin: 'auto' }}>{story()}</div>],
  parameters: {
    inspectComponents: [FilterMenu],
  },
};

export function formInADropdown() {
  return (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
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
              validator={() => {}}
              onChange={action('onChange')}
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
              validator={() => {}}
              onChange={action('onChange')}
            />
          </Row>
        </FilterMenu>
      </div>
    </Form>
  );
}

formInADropdown.story = {
  name: 'Form in a dropdown.',
};

export function leftAlignedMenu() {
  return (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <FilterMenu dropdownProps={{ left: 0 }} accessibilityLabel="Filter menu">
        <Row>
          <Select
            label="Select"
            name="select"
            defaultValue="foo"
            validator={() => {}}
            onChange={action('onChange')}
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
            validator={() => {}}
            onChange={action('onChange')}
          />
        </Row>
      </FilterMenu>
    </Form>
  );
}

leftAlignedMenu.story = {
  name: 'Left-aligned menu.',
};

export function withOverflow() {
  return (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FilterMenu accessibilityLabel="Filter menu" menuProps={{ maxHeight: 200 }} zIndex={2}>
          <Row>
            <Select
              label="Select"
              name="select"
              defaultValue="foo"
              validator={() => {}}
              onChange={action('onChange')}
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
              validator={() => {}}
              onChange={action('onChange')}
            />
          </Row>

          <Row>
            <div style={{ height: 300 }} />
          </Row>
        </FilterMenu>
      </div>
    </Form>
  );
}

withOverflow.story = {
  name: 'With overflow.',
};
