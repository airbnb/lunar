import React from 'react';
import { shallow } from 'enzyme';
import Cell from '../../../src/components/Table/Cell';

describe('<Cell />', () => {
  it('renders `td` by default', () => {
    const wrapper = shallow(<Cell>Content</Cell>);

    expect(wrapper.type()).toBe('td');
  });

  it('renders `th` with `header`', () => {
    const wrapper = shallow(<Cell header>Content</Cell>);

    expect(wrapper.type()).toBe('th');
  });

  it('renders left', () => {
    const wrapper = shallow(<Cell startAlign>Left</Cell>);

    expect(wrapper.prop('className')).toMatch('cell_left');
  });

  it('renders center', () => {
    const wrapper = shallow(<Cell centerAlign>Center</Cell>);

    expect(wrapper.prop('className')).toMatch('cell_center');
  });

  it('renders right', () => {
    const wrapper = shallow(<Cell endAlign>Right</Cell>);

    expect(wrapper.prop('className')).toMatch('cell_right');
  });

  it('renders truncate', () => {
    const wrapper = shallow(<Cell truncate>Truncate</Cell>);

    expect(wrapper.prop('className')).toMatch('cell_truncate');
  });

  it('supports col span', () => {
    const wrapper = shallow(<Cell colSpan={1}>Content</Cell>);

    expect(wrapper.prop('colSpan')).toBe(1);
  });
});
