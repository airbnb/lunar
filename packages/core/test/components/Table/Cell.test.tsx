import React from 'react';
import { shallow } from 'enzyme';
import Cell from '../../../src/components/Table/Cell';

describe('<Cell />', () => {
  it('renders `td` by default', () => {
    const wrapper = shallow(<Cell>Content</Cell>).dive();

    expect(wrapper.type()).toBe('td');
  });

  it('renders `th` with `header`', () => {
    const wrapper = shallow(<Cell header>Content</Cell>).dive();

    expect(wrapper.type()).toBe('th');
  });

  it('renders left', () => {
    const wrapper = shallow(<Cell startAlign>Left</Cell>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders center', () => {
    const wrapper = shallow(<Cell centerAlign>Center</Cell>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders right', () => {
    const wrapper = shallow(<Cell endAlign>Right</Cell>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders truncate', () => {
    const wrapper = shallow(<Cell truncate>Truncate</Cell>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('supports col span', () => {
    const wrapper = shallow(<Cell colSpan={1}>Content</Cell>).dive();

    expect(wrapper.prop('colSpan')).toBe(1);
  });
});
